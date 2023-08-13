import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://www.reddit.com/*", "https://sh.reddit.com/*"],
  all_frames: true
}

// wait for the content to load
window.addEventListener("load", main)

let blacklistRegexes: RegExp[] = []

// insert a new text field next to the search bar
const searchbar = document.querySelector("reddit-search-large")
const blacklistInput = document.createElement("input")
blacklistInput.type = "text"
blacklistInput.placeholder = "Blacklist"
blacklistInput.style.marginLeft = "10px"

// add the input to the dom
searchbar?.parentElement?.style.display = "flex"
searchbar?.insertAdjacentElement("afterend", blacklistInput)

// add a listener to the input
blacklistInput.addEventListener("input", (e) => {
    const blacklist = (e.target as HTMLInputElement).value
    blacklistRegexes = blacklist.split(",").map((word) => word!=="" && new RegExp(word))
    filterPosts()
})


function main() {
  filterPosts()

  //update the post list every time a call to the api is made to fetch more posts (https://www.reddit.com/svc/shreddit/community-more-posts/)
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (
        entry.initiatorType === "fetch" &&
        entry.name.includes("community-more-posts")
      ) {
        filterPosts()
      }
    }
  })

  observer.observe({
    entryTypes: ["resource"]
  })
}

function filterPosts() {
  const posts = document.querySelectorAll("shreddit-post")
  if (posts.length === 0) return
  for (const post of posts) {
    const title = post.querySelector("[slot=title]")?.textContent

    // check if any words in the title match the regex of the filter
    const match = 
        blacklistRegexes.some((regex) => title?.toLocaleLowerCase().match(regex)) ?? false

    // if there is a match, hide the post
    if (match)
        post.style.display = "none"
    else
        post.style.display = "block"
  }

  //   if (document.querySelectorAll("shreddit-post").length < 3) {
  //     console.log("loading more posts")
  //     //scoll by 100vh to load more posts
  //     window.scrollBy(0, window.innerHeight)
  //   }
}
