import React, { useEffect, useState } from "react";
import "./Contact.css";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import { useSelector, useDispatch } from "react-redux";
import { fetchList } from "../store/actions/Contact";

export default function Contact() {
  const dispatch = useDispatch();
  const contactList = useSelector((state) => state.contactList);
  const [editContact, setEditContact] = useState();

  useEffect(() => {
    dispatch(fetchList());
  }, []);

  return (
    <div className="container">
      <div id="contacts">
        <header className="contacts-header">
          <h2 className="contacts-title">Your Contacts Book!</h2>
        </header>

        <div className="contacts-content">
          <ContactForm key={editContact?.id} editContact={editContact} />

          <div className="labels">
            <p className="label-name">First Name</p>
            <p className="label-name">Surname</p>
            <p className="label-name">Phone Number</p>
          </div>
          <ContactList contacts={contactList} onEdit={setEditContact} />
        </div>
      </div>
    </div>
  );
}
