import {PropertyDataForm} from "@/features/SellPropertyForm/components/PropertyDataForm"
import {MultistepFormLayout} from "@/components/MultistepFormLayout"

export default function propertyDataPage() {
  return (
    <MultistepFormLayout>
      <PropertyDataForm/>
    </MultistepFormLayout>
  )
}