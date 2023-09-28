'use client'

// api
import { submitContactForm } from "@/app/api/contact-api";

const ContactForm = () => {
  // handler
  const handleSubmit = async (formData: FormData) => {
    await submitContactForm(formData);
  };

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
        name="first-name"
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
        name="last-name"
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
        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
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