'use client'
// library
import { useState } from "react";

const ContactForm = () => {
  // state
  const [ loading, setLoading ] = useState(false);

  // handler
  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  if (loading) return <p>Sending message...</p>;

  return (
    <form
      className="contact-form"
      action={ formData => handleSubmit(formData) }
    >
      {/* first name */}
      <label
        className="contact-form__label"
        htmlFor="contact-form-first-name"
      >
        First Name
      </label>
      <input 
        id="contact-form-first-name"
        className="contact-form__input"
        type="text"
        name="first_name"
      />

      {/* last name */}
      <label
        className="contact-form__label"
        htmlFor="contact-form-last-name"
      >
        Last Name
      </label>
      <input 
        id="contact-form-last-name"
        className="contact-form__input"
        type="text"
        name="last_name"
      />

      {/* email */}
      <label
        className="contact-form__label"
        htmlFor="contact-form-email"
      >
        Email
      </label>
      <input 
        id="contact-form-email"
        className="contact-form__input"
        type="email"
        name="email"
      />

      {/* phone */}
      <label
        className="contact-form__label"
        htmlFor="contact-form-phone"
      >
        Phone
      </label>
      <input 
        id="contact-form-phone"
        className="contact-form__input"
        type="tel"
        name="phone"
      />

      {/* message */}
      <label
        className="contact-form__label"
        htmlFor="contact-form-message"
      >
        Message
      </label>
      <textarea 
        id="contact-form-message"
        className="contact-form__textarea"
        name="message"
      />

      <button
        className="contact-form__button"
        type="submit"
      >
        Submit
      </button>
    </form>
  )
};

export default ContactForm;