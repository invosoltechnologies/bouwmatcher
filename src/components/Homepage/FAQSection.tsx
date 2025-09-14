import { FAQAccordion } from "@/components/ui/faq-accordion"
import { faqData } from "@/data/faq"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function FAQSection() {
  return (
    <section className='pt-20 pb-10 bg-white'>
      <div className='custom-container'>
        <div className='text-center mb-[60px]'>
          <h2 className='text-5xl font-normal text-foreground mb-5'>
            Veelgestelde Vragen
          </h2>
          <p className='text-gray-600  text-2xl'>
            Alles wat je moet weten om jouw perfecte specialist te vinden.
          </p>
        </div>

        <div className='max-w-4xl mx-auto'>
          <FAQAccordion items={faqData} />

          <div className='flex justify-center mt-12'>
            <Button
              className='group bg-accent hover:bg-accent/90 text-white px-10 py-4 rounded-2xl text-base font-montserrat'
              size="lg"
            >
              Heb je nog vragen? Bekijk onze FAQ-pagina
              <ArrowRight className='w-3.5 h-6 transition-transform duration-200 group-hover:translate-x-1 font-bold' />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}