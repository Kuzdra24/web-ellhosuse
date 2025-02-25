'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/UI/Button";
import { Card, CardContent } from "@/components/UI/card";
import { X, Cookie } from "lucide-react";

export default function CookiePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (!cookiesAccepted) {
      setVisible(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    setVisible(false);
  };

  const handleClosePopup = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex justify-center">
      <Card className="max-w-md text-text shadow-lg">
        <CardContent className="flex flex-col items-center gap-4 p-6">
          <div className="flex justify-between w-full">
            <p className="font-[20px]">Używamy plików cookies</p> 
            <Cookie />
          </div>

          <p className="text-sm">
            Ta strona używa niezbędnych plików cookies do prawidłowego działania. 
            <br />Przejdź do naszej
            <a href="/polityka-prywatnosci" className="text-gray-500 underline">
              {" "}Polityki Prywatności
            </a>
            , aby dowiedzieć się więcej.
          </p>
          <div className="flex justify-between w-full gap-2 mt-2 md:mt-0">
            <Button onClick={handleAcceptCookies}>
              Rozumiem
            </Button>
            <Button variant="ghost" onClick={handleClosePopup}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
