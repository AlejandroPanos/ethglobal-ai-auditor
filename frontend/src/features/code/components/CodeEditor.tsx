import Banner from "@/components/Banner";
import { Button } from "@/components/ui/button";
import Editor from "@monaco-editor/react";
import { FileBracesCorner, Sparkles } from "lucide-react";

const CodeEditor = () => {
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
            <Button>Load Example</Button>
          </div>

          <div className="w-full flex flex-col items-center justify-center gap-6">
            <div className="w-full rounded-xl overflow-hidden border border-white/20 mt-4">
              <Editor
                height="80vh"
                language="sol"
                theme="vs-dark"
                defaultValue="// Paste your Solidity code here..."
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
