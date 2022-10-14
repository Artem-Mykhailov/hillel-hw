export default class PhotoApi {
  static URL = "https://jsonplaceholder.typicode.com/photos/";

  static request(url = "", method = "GET", body) {
    return fetch(PhotoApi.URL + url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-type": "application/json",
      },
    }).catch((e) => {
      throw new Error(`PhotoApi can not execure request: ${e.message}`);
    });
  }

  static getList(filter) {
    return PhotoApi.request(filter).then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error("Can not retrive Photo list");
    });
  }
}
