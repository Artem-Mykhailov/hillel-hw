import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveContact } from "../store/actions/Contact";

export default function ContactForm({ editContact }) {
  const dispatch = useDispatch();
  const [nameInput, setNameInput] = useState(editContact?.firstName ?? "");
  const [surnameInput, setSurnameInput] = useState(editContact?.lastName ?? "");
  const [telInput, setTelInput] = useState(editContact?.phoneNumber ?? "");

  function onFormSubmit(e) {
    e.preventDefault();

    const newContact = {
      status: false,
      ...editContact,
      firstName: nameInput,
      lastName: surnameInput,
      phoneNumber: telInput,
    };

    dispatch(saveContact(newContact));
    clearForm();
  }

  function clearForm() {
    return setNameInput(""), setSurnameInput(""), setTelInput("");
  }

  return (
    <form id="inputs" className="input-form" onSubmit={onFormSubmit}>
      <input
        type="text"
        name="userName"
        id="input-name"
        className="input-general"
        placeholder="Enter first name"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      />

      <input
        type="text"
        name="userSurname"
        id="input-surname"
        className="input-general"
        placeholder="Enter surname"
        value={surnameInput}
        onChange={(e) => setSurnameInput(e.target.value)}
      />

      <input
        type="tel"
        name="userTelNumber"
        id="input-tel"
        className="input-general"
        placeholder="Enter phone number"
        value={telInput}
        onChange={(e) => setTelInput(e.target.value)}
      />

      <button type="submit" id="btn" className="btn-general">
        Add Contact
      </button>
    </form>
  );
}
