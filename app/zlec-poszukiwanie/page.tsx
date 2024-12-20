import { MultiStepSearchForm } from "@/components/SearchForm/MultiStepSearchForm"
import { Toaster } from "@/components/UI/toaster"

export default function SerchFormPage() {
    return <div className='w-[100vw] h-[90vh] flex items-center justify-center'>
        <MultiStepSearchForm />
        <Toaster />
    </div>
}