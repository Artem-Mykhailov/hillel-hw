import ContactApi from "../../Contact/ContactAPI";

export const ACTION_CONTACT_DELETE = "remove";
export const ACTION_CONTACT_CHANGE_STATUS = "changeStatus";
export const ACTION_CONTACT_CREATE = "create";
export const ACTION_CONTACT_FETCH_LIST = 'fetchList';
export const ACTION_CONTACT_UPDATE = 'update';

export function remove(id) {
  return dispatch => {
    ContactApi.delete(id)
      .then(() => {
        dispatch({ type: ACTION_CONTACT_DELETE, payload: id });
      });
  };
}

export function changeStatus(contact) {
  return dispatch => {
    ContactApi.update(contact.id, contact)
      .then(() => {
        dispatch({ type: ACTION_CONTACT_UPDATE, payload: contact });
      });
  };
}

export function fetchList() {
  return dispatch => {
    ContactApi.getList()
      .then((list) => {
        dispatch({ type: ACTION_CONTACT_FETCH_LIST, payload: list });
      });
  };
}

export function saveContact(contact) {
  return dispatch => {
    if (contact.id) {
      ContactApi.update(contact.id, contact)
        .then((newContact) => {
          dispatch({ type: ACTION_CONTACT_UPDATE, payload: newContact });
        });
    } else {
      ContactApi.create(contact)
        .then((newContact) => {
          dispatch({ type: ACTION_CONTACT_CREATE, payload: newContact });
        });
    }
  }
}
