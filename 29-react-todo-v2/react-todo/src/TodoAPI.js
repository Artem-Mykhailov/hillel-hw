export default class TodoApi {
  static URL = "https://62e664e269bd03090f6fd3ad.mockapi.io/todo/";

  static request(url = "", method = "GET", body) {
    return fetch(TodoApi.URL + url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-type": "application/json",
      },
    }).catch((e) => {
      throw new Error(`TodoApi can not execure request: ${e.message}`);
    });
  }

  static getList() {
    return TodoApi.request().then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error("Can not retrive todo list");
    });
  }

  static create(todo) {
    return TodoApi.request("", "POST", todo).then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error("Can not create new todo");
    });
  }

  static update(id, changes) {
    return TodoApi.request(id, "PUT", changes).then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(`Can not update todo with id "${id}"`);
    });
  }

  static delete(id) {
    return TodoApi.request(id, "DELETE").then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(`Can not delete todo with id "${id}"`);
    });
  }
}
