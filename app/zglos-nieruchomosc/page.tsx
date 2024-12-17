import { ApplyForm } from "@/components/ApplyForm";
import { Toaster } from "@/components/UI/toaster";

const Sell = () => (
  <div className="flex items-center justify-center w-full h-[90vh]">
    <ApplyForm />
    <Toaster />
  </div>
);

export default Sell;
