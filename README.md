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

### Images
In order to display external images using the next/Image component, the image domains need to be set in `next.config.js`:
```
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'bbs-api-v1-044032d0438d.herokuapp.com'
    ]
  }
}

module.exports = nextConfig
```

## Troubleshooting

### Mobile Browser Viewport Sizing Issue
I was getting weird behavior from elements on mobile Chrome and Safari. The UI toolabars(navigation, address bar, etc.) were overlapping the bottom of the page rather than the page adjusting the viewport to be between the UI elements. Google explains why that happens here:

https://developer.chrome.com/blog/url-bar-resizing/

To fix, I changed the $height-main variable calculation from 100vh to 100%, and set the Grid component to position: fixed 

## 500 Internal Server Error
I started getting a 500 Internal Server Error when refreshing the `/categories` page in production. There was a message indicating a client-side error in the console, but no message about where it could be originating from. In the functions logs in Netlify I saw th is error:

```
Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './server.edge' is not defined by "exports" in /var/task/node_modules/react-dom/package.jsonSep 11, 12:50:55 PM: 9362194b ERROR      at new NodeError (node:internal/errors:405:5)Sep 11, 12:50:55 PM: 9362194b ERROR      at exportsNotFound (node:internal/modules/esm/resolve:364:10)Sep 
```

This appears to be a Nextjs bug and required downgrading to next version 13.4.9 from 13.4.12 and adding a `prebuild.js` file per below and `"prebuild": "node prebuild.js",` to the `package.json` scripts:

```
console.log("********* PREBUILDING");

const path = require("node:path");
const fs = require("fs");
const baseDir = process.cwd();

const prebuildScripts = async () => {
  const file = path.join(
    baseDir,
    "/node_modules",
    "next/dist/server/require-hook.js"
  );

  const content = await fs.promises.readFile(file, "utf-8");

  await fs.promises.writeFile(
    file,
    content.replace(
      "if (process.env.__NEXT_PRIVATE_PREBUNDLED_REACT) {",
      "if (true) {"
    )
  );
};

prebuildScripts();
```

* help from: https://answers.netlify.com/t/server-edge-not-defined-error-on-nextjs-ssr-functions-cause-site-to-return-500-errors/91793/31

## To DO
* Try catch blocks in API using response.ok logic
* handle auth form error situations
* Logo taking too long to load
* Loading states for all pages
* Sign up for admin
* Mobile cookie handling (not setting cross origin cookies) Try setting cookie-samesite=lax
* protect update/new/delete routes with authentication on frontend

## Image Size Recommendations
Images should be on darker side allowing white font to read clearly and showcase lights.

* Hero Slideshow Images: 1920 x 1280px | <600kb | Patterned 
* Category/Group Default: 690x690px | <100kb | Vertical 
* Categeory/Group Banner: 1600 x 690 | 
