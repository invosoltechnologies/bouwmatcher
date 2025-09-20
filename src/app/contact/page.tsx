
import HeroContact from "@/components/Contact/HeroContact";
import ContactForm from "@/components/Contact/ContactForm";
import ContactMethods from "@/components/Contact/ContactMethods";

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
