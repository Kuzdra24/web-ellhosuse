import {LocationForm} from "@/features/SellPropertyForm/components/LocationForm"
import {MultistepFormLayout} from "@/components/MultistepFormLayout";

export default function propertyDataPage() {
  return (<MultistepFormLayout currentStep={2} applyType={"Sprzedaj nieruchomość"}>
    <LocationForm/>
  </MultistepFormLayout>)
}