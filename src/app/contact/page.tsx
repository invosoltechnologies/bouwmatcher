
import HeroContact from "@/components/contact/HeroContact";
import ContactForm from "@/components/contact/ContactForm";

export default function Contact() {
  return (
    <>
      <HeroContact />
      <section className="py-16 bg-gray-50">
        <div className="custom-container">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
