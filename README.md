## Demo ⚡
[https://markmaksi74.github.io/infinite-scroll/](url)

## Features 🥁
- Infinite Scrolling
- Unsplash API [https://unsplash.com/documentation](url)
- Loader for initial load created by [https://loading.io/](url)

## Techniques 🛠

- Center the loader in the middle of the page using `position: fixed;`
- Check to see if `scroll` event reached near the bottom of the page to load more photos from the API

## Lessons Learned 📚
- `window` is the parent of the `documnet` and the grandparent of the `body`

- `window.innerHeight` is the total height of the browser's window

- `window.scrollY` is the distance from top of page user has scrolled

- `document.body.offsetHeight` is the height of everything in the body, including what is not within the user's view

- The user reaches near the bottom of the page at `document.body.offsetHeight` $-1000px$

- The illusion of infinite scroll is created when `fetch('API_URL')` is called when `window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000` $-1000px$

- Make the loader in the center of the page regardless of scrolling:
```
.child {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

- Target Large Smartphone screens: `@media screen and (max-width: 600px) {}`