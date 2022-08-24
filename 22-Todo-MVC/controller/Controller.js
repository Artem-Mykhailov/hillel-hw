class Controller {
  #$container;

  constructor($container) {
    this.#$container = $container;

    this.collection = new Collection();
    this.todoListView = new TodoListView({
      onDelete: (id) =>
        this.collection.delete(id).then(() => this.renderList()),
      onUpdate: (id, changes) => this.collection.updateStatus(id, changes),
    });

    this.todoListView.appendTo(this.#$container);
    this.collection.fetch().then(() => this.renderList());
  }

  renderList() {
    this.todoListView.renderList(this.collection.getList());
  }
}
