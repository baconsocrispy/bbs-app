'use client'
//library
import { useState } from "react";

const ContactForm = () => {
  // state
  const [ loading, setLoading ] = useState(false);
  const salesForceURL = "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00DHp000001tGYa";

  // handler
  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    
    const response = await fetch(salesForceURL, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      console.log(response);
      setLoading(false);
    } else {
      console.log(response);
      setLoading(false);
    }
  };

  if (loading) return <p>Submitting form...</p>;
  
  return (
    <form 
      action={ formData => handleSubmit(formData) }
      className="contact-form"
    >
      <input type='hidden' name='oid' value="00DHp000001tGYa" />
      <input type='hidden' name="retURL" value="" />

      <label htmlFor="first_name" className="contact-form__label">First Name</label>
      <input id="first_name" className="contact-form__input" type="text" maxLength={ 40 } name='first_name' size={ 20 } />

      <label htmlFor="last_name" className="contact-form__label">Last Name</label>
      <input id="last_name" className="contact-form__input" type="text" maxLength={ 80 } name='last_name' size={ 20 } />

      <label htmlFor="company" className="contact-form__label">Company</label>
      <input id="company" className="contact-form__input" type="text" maxLength={ 40 } name='company' size={ 20 } />

      <label htmlFor="phone" className="contact-form__label">Phone</label>
      <input id="phone" className="contact-form__input" type="text" maxLength={ 40 } name='phone' size={ 20 } />

      <label htmlFor="email" className="contact-form__label">Email</label>
      <input id="email" className="contact-form__input" type="text" maxLength={ 80 } name='email' size={ 20 } />

      <label htmlFor="company" className="contact-form__label">Sector</label>
      <select id="00NHp00000bSGQo" title="Sector" name="00NHp00000bSGQo">
        <option value="">--None--</option>
        <option value="Architecture">Architecture</option>
        <option value="Production">Production</option>
        <option value="Studio">Studio</option>
      </select>

      <label htmlFor="description" className="contact-form__label">Description</label>
      <textarea id="description" className="contact-form__textarea" name='description' />

      <button className="contact-form__button" type='submit' name='submit'>Submit</button>
    </form>
  )
};

export default ContactForm;