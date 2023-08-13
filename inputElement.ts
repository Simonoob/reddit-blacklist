
export const createInputElement = (blacklistRegexes, filterPosts) => {
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
}