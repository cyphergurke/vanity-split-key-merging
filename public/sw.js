if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>n(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-c06b064f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/5WC2fm7Eq8kz5bnySJwBk/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/_next/static/5WC2fm7Eq8kz5bnySJwBk/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/2631e2f4-197877a757672737.js",revision:"5WC2fm7Eq8kz5bnySJwBk"},{url:"/_next/static/chunks/403-ccb136e6fcb4c823.js",revision:"5WC2fm7Eq8kz5bnySJwBk"},{url:"/_next/static/chunks/479ba886-b10e74bffa7abd10.js",revision:"5WC2fm7Eq8kz5bnySJwBk"},{url:"/_next/static/chunks/480-56726f28ff9e0040.js",revision:"5WC2fm7Eq8kz5bnySJwBk"},{url:"/_next/static/chunks/506-f083cc4b4bf7240b.js",revision:"5WC2fm7Eq8kz5bnySJwBk"},{url:"/_next/static/chunks/776-48e61aca59afc393.js",revision:"5WC2fm7Eq8kz5bnySJwBk"},{url:"/_next/static/chunks/app/%5B...slug%5D/page-cadd66e17bed2dd7.js",revision:"5WC2fm7Eq8kz5bnySJwBk"},{url:"/_next/static/chunks/app/_not-found/page-59bcb86c53255ecb.js",revision:"5WC2fm7Eq8kz5bnySJwBk"},{url:"/_next/static/chunks/app/layout-861272e89d116a8e.js",revision:"5WC2fm7Eq8kz5bnySJwBk"},{url:"/_next/static/chunks/app/page-1dd3efafa7cf0c1e.js",revision:"5WC2fm7Eq8kz5bnySJwBk"},{url:"/_next/static/chunks/e86427e3-bd493459e414434f.js",revision:"5WC2fm7Eq8kz5bnySJwBk"},{url:"/_next/static/chunks/fd9d1056-c4050f5b61ad0a3b.js",revision:"5WC2fm7Eq8kz5bnySJwBk"},{url:"/_next/static/chunks/framework-aec844d2ccbe7592.js",revision:"5WC2fm7Eq8kz5bnySJwBk"},{url:"/_next/static/chunks/main-9ea393aae4b7f236.js",revision:"5WC2fm7Eq8kz5bnySJwBk"},{url:"/_next/static/chunks/main-app-f8eadb886fbd2c46.js",revision:"5WC2fm7Eq8kz5bnySJwBk"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"5WC2fm7Eq8kz5bnySJwBk"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"5WC2fm7Eq8kz5bnySJwBk"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-2348899fa35a16ea.js",revision:"5WC2fm7Eq8kz5bnySJwBk"},{url:"/_next/static/css/47dd6a09c4e55691.css",revision:"47dd6a09c4e55691"},{url:"/favicon/android-chrome-192x192.png",revision:"7acf9cf75a3adf0ed957dbe873468a9b"},{url:"/favicon/android-chrome-512x512.png",revision:"3b2141d8f12406b4a26d20b8bab3d576"},{url:"/favicon/apple-touch-icon.png",revision:"54118334a2ec114dbe8bfe0f12bbed12"},{url:"/favicon/favicon-16x16.png",revision:"8d204aee2764d4bbb01a02d3ed007e19"},{url:"/favicon/favicon-32x32.png",revision:"6935a3fe723e49627523d8e812c434de"},{url:"/favicon/favicon.ico",revision:"f1bc3e6be42c57575f0db71168fd3ced"},{url:"/favicon/site.webmanifest",revision:"053100cb84a50d2ae7f5492f7dd7f25e"},{url:"/manifest.json",revision:"660d90d2fc637da28283bb7dea2eebbd"},{url:"/swe-worker-5c72df51bb1f6ee0.js",revision:"5a47d90db13bb1309b25bdf7b363570e"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
