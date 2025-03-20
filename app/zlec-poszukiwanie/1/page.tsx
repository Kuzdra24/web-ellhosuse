import {PropertyDataForm} from "@/features/SearchPropertyForm/components/PropertyDataForm"
import {MultistepFormLayout} from "@/components/MultistepFormLayout"

export default function propertyDataPage() {
  return (
    <MultistepFormLayout currentStep={1}>
      <PropertyDataForm/>
    </MultistepFormLayout>
  )
}