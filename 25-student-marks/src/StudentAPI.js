class StudentApi {
  static URL = "https://62e664e269bd03090f6fd3ad.mockapi.io/student/";

  static request(url = "", method = "GET", body) {
    return fetch(StudentApi.URL + url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-type": "application/json",
      },
    }).catch((e) => {
      throw new Error(`StudentApi can not execure request: ${e.message}`);
    });
  }

  static getStudent(id) {
    return StudentApi.request(id).then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error("Can not retrive this student");
    });
  }

  static getList() {
    return StudentApi.request().then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error("Can not retrive student list");
    });
  }

  static create(student) {
    return StudentApi.request("", "POST", student).then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error("Can not create new student");
    });
  }

  static update(id, changes) {
    return StudentApi.request(id, "PUT", changes).then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(`Can not update student with id "${id}"`);
    });
  }

  static delete(id) {
    return StudentApi.request(id, "DELETE").then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(`Can not delete student with id "${id}"`);
    });
  }
}
