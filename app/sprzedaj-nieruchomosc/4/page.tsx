import {UserDataForm} from "@/features/SellPropertyForm/components/UserDataForm"
import {MultistepFormLayout} from "@/components/MultistepFormLayout";

export default function propertyDataPage() {
  return (<MultistepFormLayout currentStep={4} applyType={"Sprzedaj nieruchomość"}>
    <UserDataForm/>
  </MultistepFormLayout>)
}