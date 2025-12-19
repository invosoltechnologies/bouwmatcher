import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function ContactMethods() {
  const contactMethods = [
    {
      id: 'form',
      title: 'Formulier',
      description: 'Neem eenvoudig contact op!',
      icon: (
        <div className='w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-primary rounded-xl md:rounded-2xl flex items-center justify-center'>
          <Image
            src='/icons/form.svg'
            width={24}
            height={24}
            alt='Form'
            className='w-5 h-5 md:w-6 md:h-6'
          />
        </div>
      ),
    },
    {
      id: 'phone',
      title: 'Telefoon',
      description: 'Ma-Vr 09:00-17:00 (CET)',
      subDescription: '+32 491 11 59 49',
      icon: (
        <div className='w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-accent rounded-xl md:rounded-2xl flex items-center justify-center'>
          <Phone className='w-5 h-5 md:w-6 md:h-6 text-white' />
        </div>
      ),
    },
    {
      id: 'email',
      title: 'E-mail',
      description: 'Antwoord binnen <24u',
      subDescription: 'info@bouwmatcher.com',
      icon: (
        <div className='w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-primary rounded-xl md:rounded-2xl flex items-center justify-center'>
          <Mail className='w-5 h-5 md:w-6 md:h-6 text-white' />
        </div>
      ),
    },
    {
      id: 'chat',
      title: 'Live chat',
      description: 'Direct beschikbaar',
      icon: (
        <div className='w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-accent rounded-xl md:rounded-2xl flex items-center justify-center'>
          <Image
            src='/icons/chat.svg'
            width={24}
            height={24}
            alt='Form'
            className='w-5 h-5 md:w-6 md:h-6'
            style={{ filter: 'brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%)' }}
          />
        </div>
      ),
    },
  ];

  return (
    <section className="py-12 md:py-20 lg:py-24 bg-white">
      <div className="custom-container">
        <div className="text-center mb-8 md:mb-12 lg:mb-16 px-4">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-normal text-foreground mb-2 md:mb-4 lg:mb-5">
            Kies je contactmethode
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg lg:text-2xl">
            Kies jouw contact methode
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mb-6 md:mb-8 lg:mb-10">
          {contactMethods.map((method) => (
            <Card
              key={method.id}
              className="text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer border-gray-200"
              style={{
                boxShadow: '0 10px 30px 0 rgba(2, 58, 162, 0.12)'}}
            >
              <CardContent className="p-5 md:p-6 lg:p-8 pb-3 md:pb-4">
                <div className="flex justify-center mb-3 md:mb-4">{method.icon}</div>
                <CardTitle className="text-foreground text-base md:text-lg mb-2 md:mb-3 lg:mb-4">
                  {method.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-xs md:text-sm mb-0.5 md:mb-1">
                  {method.description}
                </CardDescription>
                {method.subDescription && (
                  <CardDescription className="text-muted-foreground text-xs md:text-sm">
                    {method.subDescription}
                  </CardDescription>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust indicator */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-3.5 h-3.5 md:w-4 md:h-4 bg-accent rounded-full flex items-center justify-center">
            <Image
              src="/icons/shield.svg"
              width={12}
              height={12}
              alt="Shield"
              className="w-2.5 h-2.5 md:w-3 md:h-3"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
          <span className="text-xs md:text-sm text-muted-foreground">
            Gratis & vrijblijvend
          </span>
        </div>
      </div>
    </section>
  );
}