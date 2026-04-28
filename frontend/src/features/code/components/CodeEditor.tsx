import Banner from "@/components/Banner";
import { Button } from "@/components/ui/button";
import { FileBracesCorner } from "lucide-react";

const CodeEditor = () => {
  return (
    <>
      <div className="flex items-center justify-center my-8 px-6 ">
        <div className="w-full max-w-3xl">
          <div className="flex items-center justify-between w-full gap-4">
            <Banner
              icon={FileBracesCorner}
              title="Smart Contract Code"
              description="Paste your Solidity code below."
            />
            <Button>Load Example</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
