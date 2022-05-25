/**
 * let obj = {key: value}
 * obj ['key'] ===> value
 *
 * window is the parent of the documnet grandparent of the body
 * window > document > body
 *
 * window.innerHeight ===> total height of browser window
 * `window.scrollY` is the distance from top of page user has scrolled
 * `document.body.offsetHeight` is height of everything in the body, including what is not within view
 * `document.body.offsetHeight` - 1000px to trigger fetch() before bottom is reached
 *
 * onLoad event will be called when the image gets loaded
 */

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

// Unsplash API
const count = 5;
const apiKey = "xEBoVbbB_FVHULOEPxH5ijHXxGlBH1rS1LhrUtLs_xo";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    if (!initialLoad) {
      count = 30
    }
  }
}

function setDOMAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length; // 30
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    setDOMAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for photo
    const img = document.createElement("img");
    setDOMAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listnere, check when each img is finished loading
    img.addEventListener("load", imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    initialLoad = false
    getPhotos();
  }
});

// On Load
getPhotos();
