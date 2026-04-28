import { useState } from "react";
import Banner from "@/components/Banner";
import { Button } from "@/components/ui/button";
import Editor from "@monaco-editor/react";
import { FileBracesCorner, Sparkles } from "lucide-react";
import { EXAMPLE_CONTRACT } from "@/constants/exampleContract";

const CodeEditor = () => {
  const [code, setCode] = useState("");

  const handleLoadExample = () => {
    setCode(EXAMPLE_CONTRACT);
  };

  return (
    <>
      <div className="flex items-center justify-center my-12 px-6 ">
        <div className="w-full max-w-3xl">
          <div className="flex items-center justify-between w-full gap-4">
            <Banner
              icon={FileBracesCorner}
              title="Smart Contract Code"
              description="Paste your Solidity code below."
            />
            <Button onClick={() => handleLoadExample()}>Load Example</Button>
          </div>

          <div className="w-full flex flex-col items-center justify-center gap-6">
            <div className="w-full rounded-xl overflow-hidden border border-white/20 mt-4">
              <Editor
                height="60vh"
                language="sol"
                theme="vs-dark"
                defaultValue="// Paste your Solidity code here..."
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  fontSize: 12,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  padding: { top: 16 },
                }}
              />
            </div>
            <Button size="lg">
              <Sparkles /> Start Audit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
