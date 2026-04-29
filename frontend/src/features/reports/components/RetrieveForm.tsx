import Banner from "@/components/Banner";
import { FileSearchCorner } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { retrieveAudit } from "@/helpers/helpers";
import InputWithButtonDemo from "@/components/customized/input/input-06";

const RetrieveForm = () => {
  const downloadMutation = useMutation({
    mutationFn: (rootHash: string) => retrieveAudit(rootHash),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

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

        <span className="text-xs font-light text-foreground/60 -mt-2">
          Example: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
        </span>
      </div>
    </>
  );
};

export default RetrieveForm;
