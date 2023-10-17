// components
import ContactForm from "../_forms/contact-form/contact-form.component";
import Header from "../_components/header/header.component";

const Contact = () => {
  return (
    <main className="contact-page">
      <Header imageUrl={ '/contact-banner-1.png' } text='Contact Us'/>
      <ContactForm />
    </main>
  )
};

export default Contact;