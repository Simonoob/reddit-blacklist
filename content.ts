import type { PlasmoCSConfig } from "plasmo"

import { blacklistRegexes, createInputElement } from "~inputElement"

export const config: PlasmoCSConfig = {
  matches: ["https://www.reddit.com/*", "https://sh.reddit.com/*"],
  all_frames: true
}

window.addEventListener("load", main)

function main() {
  createInputElement(filterPosts)
  filterPosts()

  observePostFetching(() => filterPosts())
}

function filterPosts() {
  const posts = document.querySelectorAll("shreddit-post")
  if (posts.length === 0) return
  console.log(blacklistRegexes)
  for (const post of posts) {
    const title = post.querySelector("[slot=title]")?.textContent

    // check if any words in the title match the regex of the filter
    const match =
      blacklistRegexes.some((regex) => {
        //if a simple word, add word boundaries
        if (regex.source?.match(/^\w+$/)) {
          return title
            ?.toLocaleLowerCase()
            .match(new RegExp(`\\b${regex.source}\\b`))
        }
        return title?.toLocaleLowerCase().match(regex)
      }) ?? false

    // if there is a match, hide the post
    if (match) post.style.display = "none"
    else post.style.display = "block"
  }

  //   if (document.querySelectorAll("shreddit-post").length < 3) {
  //     console.log("loading more posts")
  //     //scoll by 100vh to load more posts
  //     window.scrollBy(0, window.innerHeight)
  //   }
}

function observePostFetching(callback: () => void) {
  //update the post list every time a call to the api is made to fetch more posts (https://www.reddit.com/svc/shreddit/community-more-posts/)
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (
        entry.initiatorType === "fetch" &&
        entry.name.includes("community-more-posts")
      ) {
        callback()
      }
    }
  })

  observer.observe({
    entryTypes: ["resource"]
  })
}
