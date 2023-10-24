// components
import ContactForm from "@/app/_forms/contact-form-sf/contact-form-sf.component";
import Grid from "@/app/_components/grid/grid.component";
import Header from "../../_components/header/header.component";
import { NAV_TYPES } from "@/app/_components/nav/nav.types";

const Contact = () => {
  const navOptions = {
    background: NAV_TYPES.transparent,
    overlay: true,
    theme: NAV_TYPES.light
  }
  return (
    <Grid navOptions={ navOptions }>
      <main className="contact-page">
        <Header imageUrl={ '/contact-banner-1.png' } text='Contact Us'/>
        <ContactForm />
      </main>
    </Grid>
   
  )
};

export default Contact;