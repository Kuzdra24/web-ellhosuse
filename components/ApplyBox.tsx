import { FC } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type ApplyBoxPropTypes = {
  imgSrc: string | StaticImageData;
  title: string;
  url: string;
};

const ApplyBox: FC<ApplyBoxPropTypes> = ({ imgSrc, title, url }) => {
  return (
    <Link
      href={url}
      className="relative group block w-[400px] h-[400px] sm:m-14 m-8 rounded-lg shadow-lg overflow-hidden"
    >
      {/* Obraz z efektem przybliżenia */}
      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
        <Image
          src={imgSrc}
          alt={`${title} image`}
          fill
          objectFit="cover"
          className="transition-opacity group-hover:opacity-90"
        />
      </div>
      {/* Ciemniejsza nakładka */}
      <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-70 transition-colors duration-500" />
      {/* Tekst */}
      <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4">
        <h2 className="sm:text-[32px] font-montserrat text-[26px]">{title}</h2>
      </div>
    </Link>
  );
};

export default ApplyBox;
