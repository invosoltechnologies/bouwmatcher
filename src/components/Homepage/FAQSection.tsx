import { FAQAccordion } from "@/components/ui/faq-accordion"
import { faqData } from "@/data/faq"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function FAQSection() {
  return (
    <section className='py-14 md:py-20 bg-white'>
      <div className='custom-container'>
        <div className='text-center mb-8 md:mb-[60px]'>
          <h2 className='text-[32px] md:text-5xl font-normal text-foreground mb-2 md:mb-5 px-4'>
            Veelgestelde vragen
          </h2>
          <p className='text-muted-foreground text-base md:text-2xl px-4'>
            Alles wat je moet weten om jouw perfecte specialist te vinden
          </p>
        </div>

        <div className='max-w-full px-0  md:max-w-4xl mx-auto md:px-0'>
          <FAQAccordion items={faqData} />

          <div className='flex justify-center mt-8 md:mt-12'>
            <Button
              className='group bg-accent hover:bg-accent/90 text-white px-6 md:px-10 py-3 md:py-4 rounded-2xl text-sm md:text-base font-montserrat'
              size="lg"
            >
              <span className='hidden md:inline'>Heb je nog vragen? Bekijk onze FAQ-pagina</span>
              <span className='md:hidden'>Bekijk onze FAQ-pagina</span>
              <ArrowRight className='w-3.5 h-6 transition-transform duration-200 group-hover:translate-x-1 font-bold' />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}