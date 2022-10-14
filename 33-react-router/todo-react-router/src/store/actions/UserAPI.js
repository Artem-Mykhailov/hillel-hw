export default class UserApi {
  static URL = "https://jsonplaceholder.typicode.com/users/";

  static request(url = "", method = "GET", body) {
    return fetch(UserApi.URL + url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-type": "application/json",
      },
    }).catch((e) => {
      throw new Error(`UserApi can not execure request: ${e.message}`);
    });
  }

  static getList() {
    return UserApi.request().then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error("Can not retrive User list");
    });
  }
}
