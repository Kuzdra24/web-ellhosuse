import {UserDataForm} from "@/features/SearchPropertyForm/components/UserDataForm"
import {MultistepFormLayout} from "@/components/MultistepFormLayout";

export default function propertyDataPage() {
  return (<MultistepFormLayout currentStep={4} applyType={"Znajdź nieruchomość"}>
    <UserDataForm/>
  </MultistepFormLayout>)
}