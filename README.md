## Next Installation
`npx create-next-app@latest bbs-app --typescript --eslint`
No to src, Yes to App Router

## Configuration

### Libraries
Sass for styling
`yarn add sass`
React Hook Form for form submission
`yarn add react-hook-form`
Dotenv for storing environment variables (next.js may support automatically)
if not: `yarn add dotenv`, create `.env` in root folder, ensure it's added to gitignore

###
Active Storage setup:
https://kim-jenny5.medium.com/how-to-active-storage-with-a-rails-api-and-javascript-frontend-with-amazon-s3-9d1e0045d3bc


## Troubleshooting

### Mobile Browser Viewport Sizing Issue
I was getting weird behavior from elements on mobile Chrome and Safari. The UI toolabars(navigation, address bar, etc.) were overlapping the bottom of the page rather than the page adjusting the viewport to be between the UI elements. Google explains why that happens here:

https://developer.chrome.com/blog/url-bar-resizing/

To fix, I changed the $height-main variable calculation from 100vh to 100%, and set the Grid component to position: fixed 


## To DO
* Try catch blocks in API using response.ok logic