import Banner from "@/components/Banner";
import { FileSearchCorner } from "lucide-react";
import InputWithButtonDemo from "@/components/customized/input/input-06";

const RetrieveForm = () => {
  return (
    <>
      <div className="w-full mx-auto max-w-3xl flex flex-col items-start gap-4 p-6 border border-border rounded-xl mt-12">
        <Banner
          icon={FileSearchCorner}
          title="Lookup Audit Report"
          description="Enter your transaction root hash to retrieve your audit report"
        />

        <form action="" className="w-full">
          <InputWithButtonDemo />
        </form>
      </div>
    </>
  );
};

export default RetrieveForm;
