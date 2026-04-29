import { useState } from "react";
import Banner from "@/components/Banner";
import { FileSearchCorner } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { retrieveAudit } from "@/helpers/helpers";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RetrieveForm = () => {
  const [rootHash, setRootHash] = useState("");

  const downloadMutation = useMutation({
    mutationFn: (rootHash: string) => retrieveAudit(rootHash),
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "audit-report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
    onError: () => {
      toast.error("Failed to retrieve report. Check your root hash and try again.");
    },
  });

  const handleDownload = () => {
    if (!rootHash.trim()) return;
    downloadMutation.mutate(rootHash);
  };

  return (
    <>
      <div className="w-full mx-auto max-w-3xl flex flex-col items-start gap-4 p-6 border border-border rounded-xl mt-12">
        <Banner
          icon={FileSearchCorner}
          title="Lookup Audit Report"
          description="Enter your transaction root hash to retrieve your audit report"
        />

        <form action="" className="w-full">
          <div className="flex w-full items-center gap-2">
            <Input
              onChange={(e) => setRootHash(e.target.value)}
              value={rootHash}
              placeholder="0x123..."
              type="text"
            />
            <Button onClick={handleDownload} className="shadow">
              Find Report
            </Button>
          </div>
        </form>

        <span className="text-xs font-light text-foreground/60 -mt-2">
          Example: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
        </span>
      </div>
    </>
  );
};

export default RetrieveForm;
