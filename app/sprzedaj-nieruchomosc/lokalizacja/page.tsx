import {LocationForm} from "@/features/SellPropertyForm/components/LocationForm"
import {MultistepFormLayout} from "@/components/MultistepFormLayout";

export default function propertyDataPage() {
  return (<MultistepFormLayout>
    <LocationForm/>
  </MultistepFormLayout>)
}