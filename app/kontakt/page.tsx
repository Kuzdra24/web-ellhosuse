import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row justify-center items-center space-y-8 lg:space-y-0 lg:space-x-8">
      <div className="flex flex-col justify-center items-start max-w-[400px] w-full p-6 bg-primary text-white rounded-md h-[300px] lg:mr-[-50px]">
        <h1 className="text-3xl font-lora text-center mb-4 lg:mb-10">Skontaktuj się z nami</h1>
        <div className="mt-4 space-y-2">
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>elakuzdrowska@gmail.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-5 h-5" />
            <span>+48 575 481 500</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>ul. Elsnera 5a/4, 49-130 Tułowice</span>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[500px]">
        <ContactForm />
      </div>
    </div>
  );
}