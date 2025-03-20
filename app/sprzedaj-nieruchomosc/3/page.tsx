import {OfferForm} from "@/features/SellPropertyForm/components/OfferForm"
import {MultistepFormLayout} from "@/components/MultistepFormLayout";

export default function propertyDataPage() {
  return (<MultistepFormLayout currentStep={3} applyType={"Sprzedaj nieruchomość"}>
    <OfferForm/>
  </MultistepFormLayout>)
}