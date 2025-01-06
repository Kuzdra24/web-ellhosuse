import { MultiStepApplyForm } from "@/components/ApplyForm/MultiStepApplyForm";
import { Toaster } from "@/components/UI/toaster";

const Sell = () => (
  <div className="flex items-center justify-center w-full h-[90vh]">
    <MultiStepApplyForm />
    <Toaster />
  </div>
);

export default Sell;
