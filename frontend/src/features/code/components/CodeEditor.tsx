import Banner from "@/components/Banner";
import { FileBracesCorner } from "lucide-react";

const CodeEditor = () => {
  return (
    <>
      <div className="flex items-center justify-center my-8 px-6 ">
        <div className="max-w-4xl">
          <Banner
            icon={FileBracesCorner}
            title="Smart Contract Code"
            description="Paste your Solidity code below."
          />
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
