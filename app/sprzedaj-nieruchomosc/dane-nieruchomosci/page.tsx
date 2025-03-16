import {PropertyDataForm} from "@/features/SellPropertyForm/components/PropertyDataForm"

export default function propertyDataPage() {
  return (
    <section className="max-w-[1200px] mx-auto relative">
      <div className={"blur-shadow-bg w-[200px] h-[200px] top-0 left-[20%]"}></div>
      <div className={"blur-shadow-bg w-[220px] h-[200px] top-[70%] right-[25%]"}></div>
      <div className={"bg-white/60 backdrop-blur-2xl max-w-[400px] mx-auto flex flex-col items-center justify-center my-[100px] py-8 shadow-md rounded-md"}>
      <h1 className={"font-lora text-[#525252] text-3xl "}>Sprzedaj nieruchomość</h1>
      <span className={"text-gray-500 text-md text-center font-montserrat"}>~W kilku krokach</span>
      <PropertyDataForm/>
    </div>
  </section>)
}