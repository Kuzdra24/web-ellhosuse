import {PropertyDataForm} from "@/features/SellPropertyForm/components/PropertyDataForm"
import {MultistepFormLayout} from "@/components/MultistepFormLayout"

export default function propertyDataPage() {
  return (
    <MultistepFormLayout currentStep={1} applyType={"Sprzedaj nieruchomość"}>
      <PropertyDataForm/>
    </MultistepFormLayout>
  )
}