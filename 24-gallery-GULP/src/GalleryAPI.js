class GalleryApi {
  static URL = "https://jsonplaceholder.typicode.com";

  static request(uri = "", method = "GET", data) {
    return fetch(`${GalleryApi.URL}${uri}`, {
      method,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: data ? JSON.stringify(data) : undefined,
    }).then((res) => res.json());
  }

  static getAlbums() {
    return this.request("/albums");
  }

  static getPhotos(albumId) {
    return this.request(`/photos?albumId=${albumId}`);
  }
}
