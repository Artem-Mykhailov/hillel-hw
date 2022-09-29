import {
  ACTION_CONTACT_DELETE,
  ACTION_CONTACT_CHANGE_STATUS,
  ACTION_CONTACT_CREATE,
  ACTION_CONTACT_FETCH_LIST,
  ACTION_CONTACT_UPDATE,
} from "../actions/Contact";

const INITIAL_STATE = {
  contactList: [],
};

export default function rootReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case ACTION_CONTACT_DELETE:
      return {
        ...state,
        contactList: state.contactList.filter(
          (contact) => contact.id !== payload
        ),
      };
    case ACTION_CONTACT_CREATE:
      return {
        ...state,
        contactList: [...state.contactList, payload],
      };
    case ACTION_CONTACT_CHANGE_STATUS:
      return {
        ...state,
        contactList: state.contactList.map(contact => {
          if (contact.id === payload) {
            return {
              ...contact,
              status: !contact.status,
            };
          }
  
          return contact;
        }),
      };
    case ACTION_CONTACT_FETCH_LIST:
      return {
        ...state,
        contactList: [...payload],
      };
    case ACTION_CONTACT_UPDATE:
      return {
        ...state,
        contactList: state.contactList.map((contact) =>
          contact.id === payload.id ? payload : contact
        ),
      };
    default:
      return state;
  }
}
