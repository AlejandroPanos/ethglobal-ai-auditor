import Hero from "@/components/hero";
import { Zap } from "lucide-react";

const DownloadPage = () => {
  const title = (
    <>
      Retrieve Your <span className="text-green-600">Audit Reports</span> Instantly
    </>
  );

  return (
    <>
      <Hero
        icon={Zap}
        badge="Report Retrieval"
        title={title}
        text="Enter your transaction root hash to access and download your smart contract audit report. Reports are permanently stored and can be retrieved at any time."
      />
    </>
  );
};

export default DownloadPage;
