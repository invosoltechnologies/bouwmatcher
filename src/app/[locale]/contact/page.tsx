import HeroContact from "@/components/Contact/HeroContact";
import ContactForm from "@/components/Contact/ContactForm";
import ContactMethods from "@/components/Contact/ContactMethods";
import DefaultLayout from "@/components/DefaultLayout";

export default function Contact() {
  return (
    <DefaultLayout>
      <HeroContact />
      <section className='pt-0 pb-16 bg-white'>
        <div className='custom-container'>
          <ContactForm />
        </div>
      </section>
      <ContactMethods />
    </DefaultLayout>
  );
}
