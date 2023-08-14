# A simple extension to hide Reddit posts

## Features
The flow is quite simple: the extension reads your blacklist, matches it to the post title, and it hides the post if there's a match.

- You can blacklist words by adding them to the input field, separated by commas (`ai,gpt`)
- You can also add custom regex patterns (`ai,gpt,artificial*`)
- The blacklist is saved on local storage for each subreddit, so you don't need to re-type it every visit

## Install
1. Go to releases, download the latest build `chrome-mv3-prod.zip`
2. Unzip the file
3. Open Chrome, got to **Extensions** -> **Manage Extensions**
4. Enable developer mode on the top right
5. Click on the **Load Unpacked** button that appeared on the top left and select the unpacked build folder
6. Get back to Reddit, you should have a new input next to the search bar


---

This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).
