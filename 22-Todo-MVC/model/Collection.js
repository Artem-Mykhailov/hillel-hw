class Collection {
  #list = [];

  fetch() {
    return TodoApi.getList().then((list) => {
      this.setList(list);
    });
  }

  update(id, todo) {
    const oldContact = contactListFind(id);

    Object.keys(todo).forEach((key) => (oldContact[key] = todo[key]));
  }

  setList(list) {
    this.#list = list;
  }

  getList() {
    return this.#list;
  }

  add(todo) {
    this.#list.push(todo);
  }

  find(id) {
    return this.#list.find((c) => c.id === id);
  }

  delete(id) {
    this.#list = this.#list.filter((item) => item.id !== id);

    TodoApi.delete(id);

    return Promise.resolve();
  }

  updateStatus(id, changes) {
    TodoApi.update(id, changes).then(() => {
      const todo = this.#list.find((item) => item.id === id);

      Object.keys(changes).forEach((key) => (todo[key] = changes[key]));
    });
  }
}
