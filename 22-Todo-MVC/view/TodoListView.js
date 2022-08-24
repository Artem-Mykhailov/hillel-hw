class TodoListView {
  static TODO_ITEM_SELECTOR = ".todo-item";
  static DELETE_BTN_SELECTOR = ".delete-btn";
  static STATUS_CLASS = "done";

  #$listEl;
  #options;

  constructor(options) {
    this.#$listEl = $("<ul></ul>")
      .on("click", TodoListView.DELETE_BTN_SELECTOR, (e) =>
        this.onDeleteBtnClick(e)
      )
      .on("click", TodoListView.TODO_ITEM_SELECTOR, (e) =>
        this.onTodoItemClick(e)
      );

    this.#options = options;
  }

  onDeleteBtnClick(e) {
    e.stopPropagation();

    const id = this.getTodoItemId(e.target);

    this.#options.onDelete(id);
  }

  onTodoItemClick(e) {
    e.stopPropagation();
    const $todo = this.getTodoItem($(e.target));
    $todo.toggleClass(TodoListView.STATUS_CLASS);

    const id = this.getTodoItemId(e.target);
    const status = this.getTodoItemStatus($(e.target));

    this.#options.onUpdate(id, { status: status });
  }

  getTodoItem($el) {
    return $el.closest(TodoListView.TODO_ITEM_SELECTOR);
  }
  getTodoItemId(el) {
    return el.closest(TodoListView.TODO_ITEM_SELECTOR)?.dataset.id;
  }

  getTodoItemStatus($el) {
    return $el.hasClass(TodoListView.STATUS_CLASS);
  }

  appendTo($el) {
    $el.append(this.#$listEl);
  }

  renderList(list) {
    const html = list.map((todo) => this.generateTodoHTML(todo)).join("");

    this.#$listEl.html(html);
  }

  generateTodoHTML(todo) {
    const statusClass = todo.status ? "done" : "";

    return `
        <li class="todo-item ${statusClass}" data-id="${todo.id}">
          ${todo.title}
          <span class="delete-btn">[Delete]</span>
        </li>
      `;
  }
}
