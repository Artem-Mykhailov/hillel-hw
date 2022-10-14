export default class AlbumApi {
  static URL = "https://jsonplaceholder.typicode.com/albums/";

  static request(url = "", method = "GET", body) {
    return fetch(AlbumApi.URL + url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-type": "application/json",
      },
    }).catch((e) => {
      throw new Error(`AlbumApi can not execure request: ${e.message}`);
    });
  }

  static getList(filter) {
    return AlbumApi.request(filter).then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error("Can not retrive Album list");
    });
  }
}
