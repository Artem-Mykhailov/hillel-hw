"use strict";

const URL_ALBUMS = "https://jsonplaceholder.typicode.com/albums";
const URL_IMAGES = "https://jsonplaceholder.typicode.com/photos?albumId=";
const BTN_CLASS = "btn-general";
const ALBUM_SELECTOR = ".album";

const gallery = document.querySelector(".gallery");
const galleryImages = document.querySelector(".gallery-images");
const galleryAlbumsList = document.querySelector(".gallery-albums");

gallery.addEventListener("click", onGalleryClick);

getAlbumsList()
  .then((album) => renderAlbumList(album))
  .catch(showError);

showDefaultImages()
  .then((img) => renderImages(img))
  .catch(showError);

function onGalleryClick(e) {
  const classList = e.target.classList;
  const id = getAlbumId(e.target);

  if (classList.contains(BTN_CLASS)) {
    deleteImages();
    getImages(id)
      .then((img) => renderImages(img))
      .catch(showError);
  }
}

function getAlbumsList() {
  return fetch(URL_ALBUMS).then((res) => {
    if (res.ok) {
      return res.json();
    }

    throw new Error("Can not retrive albums list");
  });
}

function renderAlbumList(album) {
  const html = album.map(generateAlbumsHTML).join("");

  galleryAlbumsList.insertAdjacentHTML("beforeend", html);
}

function getImages(id) {
  return fetch(URL_IMAGES + id).then((res) => {
    if (res.ok) {
      return res.json();
    }

    throw new Error("Can not retrive images from album");
  });
}

function renderImages(img) {
  const html = img.map(generateImagesHTML).join("");

  galleryImages.insertAdjacentHTML("beforeend", html);
}

function deleteImages() {
  const images = document.querySelectorAll(".images");

  images.forEach((img) => {
    img.remove();
  });
}

function generateAlbumsHTML(album) {
  return `
    <li 
    class='album'
    data-id="${album.id}"
    >
      <button type='button' class='btn-general'>${album.title}</button>
    </li>
  `;
}

function generateImagesHTML(image) {
  return `
    <div class="images">
    <p class="image-id">${image.id}</p>
    </div>
  `;
}

function getAlbumId(el) {
  return el.closest(ALBUM_SELECTOR).dataset.id;
}

function showDefaultImages() {
  return fetch(URL_IMAGES + "1").then((res) => {
    if (res.ok) {
      return res.json();
    }

    throw new Error("Can not retrive images from album");
  });
}

function showError(e) {
  alert(e.message);
}
