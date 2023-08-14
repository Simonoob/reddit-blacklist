
export let blacklistRegexes = []


export const createInputElement = ( filterPosts) => {
  // insert a new text field next to the search bar
  const searchbar = document.querySelector("reddit-search-large")
  const blacklistInput = document.createElement("input")
  blacklistInput.type = "text"
  blacklistInput.placeholder = "Blacklist"
  blacklistInput.style.marginLeft = "10px"

    // get the blacklist from local storage 
    chrome.storage.local.get(
        `blacklist-${[window.location.pathname]}`,
        (result) => {
        const blacklistFromStorage = result[
        `blacklist-${[window.location.pathname]}`
]
        if (blacklistFromStorage) {
            blacklistInput.value = blacklistFromStorage
            updateBlacklistAndFilter(blacklistInput.value, filterPosts)
        }
        }
        )


  // add the input to the dom
  searchbar?.parentElement?.style.display = "flex"
  searchbar?.insertAdjacentElement("afterend", blacklistInput)

  // add a listener to the input
  blacklistInput.addEventListener("input", (e) => {
     const blacklist = (e.target as HTMLInputElement).value
     updateBlacklistAndFilter(blacklist, filterPosts)
  })
}

function updateBlacklistAndFilter(blacklist,filterPosts) {
    blacklistRegexes = blacklist !=="" ?  blacklist
      .split(",")
      .map((word) => word !== "" && new RegExp(word.toLocaleLowerCase())) : []

    // store the blacklist in local storage with the current subreddit as the key
    chrome.storage.local.set({ [ `blacklist-${[window.location.pathname]}`]: blacklist })


    filterPosts()
}