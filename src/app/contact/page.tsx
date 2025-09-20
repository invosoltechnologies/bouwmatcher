
import HeroContact from "@/components/Contact1/HeroContact";
import ContactForm from "@/components/Contact1/ContactForm";
import ContactMethods from "@/components/Contact1/ContactMethods";

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
