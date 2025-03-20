import {OfferForm} from "@/features/SearchPropertyForm/components/OfferForm"
import {MultistepFormLayout} from "@/components/MultistepFormLayout";

export default function propertyDataPage() {
  return (<MultistepFormLayout currentStep={3} applyType={"Znajdź nieruchomość"}>
    <OfferForm/>
  </MultistepFormLayout>)
}