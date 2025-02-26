import Link from "next/link";
import { Button } from "@/components/UI/Button";
import { Home, Search } from "lucide-react";

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-purple-100 text-gray-900">
      <div className="text-center px-6">
        <h1 className="text-[6rem] font-bold text-primary drop-shadow-lg animate-float">404</h1>
        <h2 className="text-2xl font-semibold mt-2">Oops! Strona nie istnieje</h2>
        <p className="text-gray-700 mt-3 text-lg max-w-md mx-auto">
          Wygląda na to, że zgubiłeś się. Może spróbujesz wyszukać ponownie?
        </p>
      </div>

      <div className="flex gap-4 mt-6">
        <Link href="/">
          <Button variant="primary" className="flex items-center gap-2 hover:scale-105 transition-transform">
            <Home size={20} /> Wróć do strony głównej
          </Button>
        </Link>
      </div>
    </div>
  );
}
