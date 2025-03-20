import {LocationForm} from "@/features/SearchPropertyForm/components/LocationForm"
import {MultistepFormLayout} from "@/components/MultistepFormLayout";

export default function propertyDataPage() {
  return (<MultistepFormLayout currentStep={2}>
    <LocationForm/>
  </MultistepFormLayout>)
}