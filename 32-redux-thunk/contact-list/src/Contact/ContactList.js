import React from "react";
import { useDispatch } from "react-redux";
import { remove, changeStatus } from "../store/actions/Contact";

export default function ContactList({ contacts, onEdit }) {
  const dispatch = useDispatch();

  function onDeleteClick(e, contact) {
    e.stopPropagation();

    dispatch(remove(contact.id));
  }

  function onLiClick(e, contact) {
    e.stopPropagation();

    const newContact = {
      ...contact,
      status: !contact.status
    }

    dispatch(changeStatus(newContact));
  }

  function onEditClick(e, contact) {
    e.stopPropagation();

    onEdit(contact);
  }

  return (
    <ul className="contact-list">
      {contacts.map((contactsItem, i) => (
        <li
          className={`contactsItem ${contactsItem.status ? "selectLi" : ""}`}
          key={contactsItem.id}
          onClick={(e) => onLiClick(e, contactsItem)}
        >
          <p className="item-general">{contactsItem.firstName}</p>
          <p className="item-general">{contactsItem.lastName}</p>
          <p className="item-general">{contactsItem.phoneNumber}</p>

          <button
            type="button"
            className="editBtn btn-general"
            onClick={(e) => onEditClick(e, contactsItem)}
          >
            Edit
          </button>

          <button
            type="button"
            className="deleteBtn btn-general"
            onClick={(e) => onDeleteClick(e, contactsItem)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
