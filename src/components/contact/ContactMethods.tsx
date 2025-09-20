import Image from "next/image";
import { Phone, Mail, MessageCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
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
        <div className='w-16 h-16 bg-primary rounded-2xl flex items-center justify-center'>
          <Image
            src='/icons/form.svg'
            width={24}
            height={24}
            alt='Form'
            className='w-6 h-6'
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
        <div className='w-16 h-16 bg-accent rounded-2xl  flex items-center justify-center'>
          <Phone className='w-6 h-6 text-white' />
        </div>
      ),
    },
    {
      id: 'email',
      title: 'E-mail',
      description: 'Antwoord binnen <24u',
      subDescription: 'info@bouwmatcher.com',
      icon: (
        <div className='w-16 h-16 bg-primary rounded-2xl  flex items-center justify-center'>
          <Mail className='w-6 h-6 text-white' />
        </div>
      ),
    },
    {
      id: 'chat',
      title: 'Live chat',
      description: 'Direct beschikbaar',
      icon: (
        <div className='w-16 h-16 bg-accent rounded-2xl  flex items-center justify-center'>
          <Image
            src='/icons/chat.svg'
            width={24}
            height={24}
            alt='Form'
            className='w-6 h-6'
            style={{ filter: 'brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%)' }}
          />
        </div>
      ),
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="custom-container">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-normal text-foreground mb-5">
            Kies je contactmethode
          </h2>
          <p className="text-muted-foreground text-2xl">
            Kies jouw contact methode
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {contactMethods.map((method) => (
            <Card
              key={method.id}
              className="text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer border-gray-200"
              style={{
                boxShadow: '0 10px 30px 0 rgba(2, 58, 162, 0.12)'}}
            >
              <CardContent className="p-8 pb-4">
                <div className="flex justify-center mb-4">{method.icon}</div>
                <CardTitle className="text-foreground text-lg mb-4">
                  {method.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm mb-1">
                  {method.description}
                </CardDescription>
                {method.subDescription && (
                  <CardDescription className="text-muted-foreground text-sm">
                    {method.subDescription}
                  </CardDescription>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust indicator */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 bg-accent rounded-full flex items-center justify-center">
            <Image
              src="/icons/shield.svg"
              width={12}
              height={12}
              alt="Shield"
              className="w-3 h-3"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
          <span className="text-sm text-muted-foreground">
            Gratis & vrijblijvend
          </span>
        </div>
      </div>
    </section>
  );
}