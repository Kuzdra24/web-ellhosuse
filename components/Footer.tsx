import { FC } from "react";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export const Footer: FC = () => {
  return (
    <footer className="w-full bg-primary text-white">
      <div className="container mx-auto py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Social Media Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Znajdź nas</h2>
          <div className="flex flex-col gap-3">
            <Link
              href="https://instagram.com"
              className="flex items-center gap-2"
            >
              <Instagram /> Instagram
            </Link>
            <Link
              href="https://facebook.com"
              className="flex items-center gap-2"
            >
              <Facebook /> Facebook
            </Link>
            <Link
              href="https://twitter.com"
              className="flex items-center gap-2"
            >
              <Twitter /> Twitter
            </Link>
          </div>
        </div>

        {/* Navigation Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Nawigacja</h2>
          <ul className="space-y-3">
            <li>
              <Link href="/uslugi" className="hover:underline">
                Usługi
              </Link>
            </li>
            <li>
              <Link href="/oferty" className="hover:underline">
                Nieruchomości
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="hover:underline">
                Kontakt
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Kontakt</h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <Phone /> +48 575 481 500
            </li>
            <li className="flex items-center gap-2">
              <Mail /> biuro@ellhouse.pl
            </li>
            <li className="flex items-center gap-2">
              <MapPin /> ul. Elsnera 5a/4, 49-130 Tułowice
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Nieruchomości. Wszelkie prawa
            zastrzeżone.
          </p>
          <p className="text-sm">
            <Link href="/privacy" className="hover:underline">
              Polityka prywatności
            </Link>{" "}
            |{" "}
            <Link href="/terms" className="hover:underline">
              Regulamin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
