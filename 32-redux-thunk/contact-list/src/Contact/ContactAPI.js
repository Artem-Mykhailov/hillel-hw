export default class ContactApi {
  static URL = "https://62e664e269bd03090f6fd3ad.mockapi.io/contacts/";

  static request(url = "", method = "GET", body) {
    return fetch(ContactApi.URL + url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-type": "application/json",
      },
    }).catch((e) => {
      throw new Error(`ContactApi can not execure request: ${e.message}`);
    });
  }

  static getList() {
    return ContactApi.request().then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error("Can not retrive contact list");
    });
  }

  static create(contact) {
    return ContactApi.request("", "POST", contact).then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error("Can not create new contact");
    });
  }

  static update(id, changes) {
    return ContactApi.request(id, "PUT", changes).then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(`Can not update contact with id "${id}"`);
    });
  }

  static delete(id) {
    return ContactApi.request(id, "DELETE").then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(`Can not delete contact with id "${id}"`);
    });
  }
}
