class StickerApi {
  static URL = "https://62e664e269bd03090f6fd3ad.mockapi.io/sticker/";

  static request(url = "", method = "GET", body) {
    return fetch(StickerApi.URL + url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-type": "application/json",
      },
    }).catch((e) => {
      throw new Error(`StickerApi can not execure request: ${e.message}`);
    });
  }

  static getList() {
    return StickerApi.request().then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error("Can not retrive contact list");
    });
  }

  static create(sticker) {
    return StickerApi.request("", "POST", sticker).then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error("Can not create new contact");
    });
  }

  static update(id, changes) {
    return StickerApi.request(id, "PUT", changes).then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(`Can not update contact with id "${id}"`);
    });
  }

  static delete(id) {
    return StickerApi.request(id, "DELETE").then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(`Can not delete contact with id "${id}"`);
    });
  }
}
