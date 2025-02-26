import { FC } from "react";
import Title from "./Title";
import ApplyBox from "./ApplyBox";
import sellSrc from "@/assets/images/sell.jpg";
import searchSrc from "@/assets/images/search.jpg";

const ApplyPropertySection: FC = () => {
  return (
    <section className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-[#FFFAFE]">
      <div className="absolute inset-0 bg-[#FFFAFE] opacity-50 "></div>

      <div className="absolute bottom-[100px] left-[-150px] w-[300px] h-[300px] bg-primary rounded-full blur-3xl opacity-50 "></div>
      <div className="absolute top-[200px] right-[-200px] w-[250px] h-[250px] bg-primary rounded-full blur-3xl opacity-50 "></div>

      <Title widthPercentage={45}>Zgłoś swoją nieruchomość</Title>

      <div className="w-full flex flex-wrap justify-center gap-8 z-1 bg-transparent">
        <ApplyBox
          imgSrc={sellSrc}
          title="Sprzedaj swoją nieruchomość z naszą pomocą"
          url="/zglos-nieruchomosc"
        />
        <ApplyBox
          imgSrc={searchSrc}
          title="Zleć poszukiwanie nieruchomości"
          url="/zlec-poszukiwanie"
        />
      </div>
    </section>
  );
};

export default ApplyPropertySection;
