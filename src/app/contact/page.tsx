
import HeroContact from "@/components/contact/HeroContact";
import ContactForm from "@/components/contact/ContactForm";

export default function Contact() {
  return (
    <>
      <HeroContact />
      <section className='pt-0 pb-16 bg-white'>
        <div className='custom-container'>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
