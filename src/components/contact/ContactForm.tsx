"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, CloudUpload } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
    file: null as File | null,
    agreeToTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreeToTerms: checked }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl p-12 shadow-lg relative z-20 -top-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
          <Image
            src="/images/contact/contact-form-head.svg"
            width={48}
            height={48}
            alt="Contact"
            className="w-12 h-12"
          />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Stuur ons een bericht
          </h2>
          <p className="text-sm text-gray-500">
            Gratis, reactietijd &lt;24u
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="block text-gray-700 mb-2">
              Naam *
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Uw volledige naam"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="h-12"
            />
          </div>
          <div>
            <Label htmlFor="email" className="block text-gray-700 mb-2">
              E-mail *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="uw.email@voorbeeld.nl"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="h-12"
            />
          </div>
        </div>

        {/* Phone and Subject Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone" className="block text-gray-700 mb-2">
              Telefoon
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="06 12 34 56 78"
              value={formData.phone}
              onChange={handleInputChange}
              className="h-12"
            />
          </div>
          <div>
            <Label htmlFor="subject" className="block text-gray-700 mb-2">
              Onderwerp *
            </Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              placeholder="Waar gaat uw vraag over?"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="h-12"
            />
          </div>
        </div>

        {/* Category Select */}
        <div>
          <Label htmlFor="category" className="block text-gray-700 mb-2">
            Type vraag
          </Label>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full h-12">
              <SelectValue placeholder="Selecteer een categorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">Algemene vraag</SelectItem>
              <SelectItem value="quote">Offerte aanvraag</SelectItem>
              <SelectItem value="support">Ondersteuning</SelectItem>
              <SelectItem value="partnership">Samenwerking</SelectItem>
              <SelectItem value="complaint">Klacht</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="message" className="block text-gray-700 mb-2">
            Bericht *
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Beschrijf uw vraag of project zo gedetailleerd mogelijk..."
            value={formData.message}
            onChange={handleInputChange}
            required
            className="min-h-32 resize-none"
          />
        </div>

        {/* File Upload */}
        <div>
          <Label htmlFor="file" className="block text-gray-700 mb-2">
            Bestand toevoegen (optioneel)
          </Label>
          <div className="relative">
            <input
              id="file"
              name="file"
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
            />
            <label
              htmlFor="file"
              className="flex items-center justify-center w-full h-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
            >
              <div className="flex items-center gap-2 text-gray-500">
                <CloudUpload className="w-5 h-5" />
                <span className="text-sm">
                  {formData.file ? formData.file.name : "Klik om bestand te selecteren"}
                </span>
              </div>
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            JPG, PNG of PDF - max 10MB
          </p>
        </div>

        {/* Terms Agreement */}
        <div className="flex items-start gap-3">
          <Checkbox
            id="terms"
            checked={formData.agreeToTerms}
            onCheckedChange={handleCheckboxChange}
            required
            className="mt-1"
          />
          <Label htmlFor="terms" className="text-sm text-gray-600">
            Ik ga akkoord met de{" "}
            <a href="#" className="text-primary hover:underline">
              privacyverklaring
            </a>
          </Label>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            type="submit"
            className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl flex items-center justify-center gap-2"
            style={{
              boxShadow: "0px 10px 15px 0px #0000001A, 0px 4px 6px 0px #0000001A",
            }}
          >
            <span>Versturen</span>
            <Send className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            variant="outline"
            className="h-12 px-6 border-primary text-primary hover:bg-primary/5 font-semibold rounded-xl flex items-center justify-center gap-2"
          >
            <Image
              src="/icons/chat.svg"
              width={16}
              height={16}
              alt="Chat"
              className="w-4 h-4"
            />
            <span>Liever direct chatten?</span>
          </Button>
        </div>
      </form>
    </div>
  );
}