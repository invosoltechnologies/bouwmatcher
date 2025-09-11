import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="custom-container py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Logo and Description */}
          <div className="flex-1">
            <Link href="/" className="flex items-center mb-6">
              <Image 
                src="/images/logo.svg" 
                alt="Bouw Matcher" 
                width={160} 
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-300 leading-relaxed max-w-sm">
              Het vertrouwde platform voor het matchen van bouwers en projecten.
            </p>
          </div>

          {/* Help Section */}
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-6">Hulp</h3>
            <div className="space-y-4">
              <Link href="/nieuws" className="block text-gray-300 hover:text-white transition-colors">
                Nieuws
              </Link>
              <Link href="/veelgestelde-vragen" className="block text-gray-300 hover:text-white transition-colors">
                Veelgestelde vragen
              </Link>
              <Link href="/contacteren" className="block text-gray-300 hover:text-white transition-colors">
                Contacteren
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">+32 491 11 59 49</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">+32 491 11 59 49</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">info@bouwmatcher.be</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                <div className="text-gray-300">
                  <div>Praitenboothstraat 12, 3270</div>
                  <div>Scherpenheuvel</div>
                </div>
              </div>
            </div>
          </div>

          {/* Socials Section */}
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-6">Socials</h3>
            <div className="space-y-4">
              <Link href="#" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </Link>
              <Link href="#" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </Link>
              <Link href="#" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="custom-container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div>
              © 2025 Bouwmatcher | Alle rechten voorbehouden
            </div>
            <div className="flex items-center gap-6">
              <Link href="/algemene-voorwaarden" className="hover:text-white transition-colors">
                Algemene voorwaarden
              </Link>
              <Link href="/privacybeleid" className="hover:text-white transition-colors">
                Privacybeleid
              </Link>
              <Link href="/cookiebeleid" className="hover:text-white transition-colors">
                Cookiebeleid
              </Link>
              <span>Ondernemingsnummer - BE 1024.216.268</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}