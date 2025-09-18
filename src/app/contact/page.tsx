
import HeroContact from "@/components/contact/HeroContact";
import ContactForm from "@/components/contact/ContactForm";
import ContactMethods from "@/components/contact/ContactMethods";

export default function Contact() {
  return (
    <>
      <HeroContact />
      <section className='pt-0 pb-16 bg-white'>
        <div className='custom-container'>
          <ContactForm />
        </div>
      </section>
      <ContactMethods />
    </>
  );
}
