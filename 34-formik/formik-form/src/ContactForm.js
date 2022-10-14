import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SaveBtn from "./SaveBtn";
import "./ContactForm.css";

export default function ContactForm() {
  const INITIAL_MESSAGE = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    comment: "",
  };

  const uaPhoneRegExp = /^(?:\+38)?(0[679]3\d{7})$/;

  const FORM_VALIDATION_SCHEMA = {
    firstname: Yup.string()
      .required("Це поле повинно бути заповнено")
      .min(2, "Ім`я повинно складатися мінімум з 2 символів"),
    lastname: Yup.string()
      .required("Це поле повинно бути заповнено")
      .min(2, "Прізвище повинно складатися мінімум з 2 символів"),
    email: Yup.string()
      .required("Це поле повинно бути заповнено")
      .email("Некоректна пошта"),
    phone: Yup.string()
      .required("Це поле повинно бути заповнено")
      .matches(uaPhoneRegExp, "Некоректний номер телефону"),
    comment: Yup.string().required("Це поле повинно бути заповнено"),
  };

  return (
    <>
      <div className="container">
        <section className="section-form">
          <header className="header-form">
            <p className="header-title">Форма зворотнього зв'язку</p>
          </header>
          <Formik
            initialValues={INITIAL_MESSAGE}
            validationSchema={Yup.object(FORM_VALIDATION_SCHEMA)}
            // onSubmit={onSubmit}
          >
            <Form className="form-content">
              <div className="label-block">
                <label className="form-label" htmlFor="firstname">
                  Ім'я
                </label>
                <ErrorMessage
                  component="span"
                  className="label-error"
                  name="firstname"
                />
              </div>
              <Field
                className="form-field"
                id="firstname"
                type="text"
                name="firstname"
                placeholder="Уведіть своє ім'я"
              />

              <div className="label-block">
                <label className="form-label" htmlFor="lastname">
                  Прізвище
                </label>
                <ErrorMessage
                  component="span"
                  className="label-error"
                  name="lastname"
                />
              </div>
              <Field
                className="form-field"
                id="lastname"
                type="text"
                name="lastname"
                placeholder="Уведіть своє прізвище"
              />

              <div className="label-block">
                <label className="form-label" htmlFor="email">
                  Електронна пошта
                </label>
                <ErrorMessage
                  component="span"
                  className="label-error"
                  name="email"
                />
              </div>
              <Field
                className="form-field"
                id="email"
                type="email"
                name="email"
                placeholder="Уведіть свою електронну пошту"
              />

              <div className="label-block">
                <label className="form-label" htmlFor="phone">
                  Мобільний телефон
                </label>
                <ErrorMessage
                  component="span"
                  className="label-error"
                  name="phone"
                />
              </div>
              <Field
                className="form-field"
                id="phone"
                name="phone"
                placeholder="Уведіть свій номер телефону"
              />

              <div className="label-block">
                <label className="form-label" htmlFor="comment">
                  Коментарій
                </label>
                <ErrorMessage
                  component="span"
                  className="label-error"
                  name="comment"
                />
              </div>
              <Field
                className="form-field"
                id="comment"
                type="text"
                as="textarea"
                name="comment"
                placeholder="Уведіть ваш коментарій"
              />

              <SaveBtn />
            </Form>
          </Formik>
        </section>
      </div>
    </>
  );
}
