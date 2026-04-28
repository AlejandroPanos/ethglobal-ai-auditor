import { useState } from "react";
import Banner from "@/components/Banner";
import { Button } from "@/components/ui/button";
import Editor from "@monaco-editor/react";
import { useMutation } from "@tanstack/react-query";
import { generateAudit } from "@/helpers/helpers";
import { FileBracesCorner, Sparkles, Copy, Shield } from "lucide-react";
import { EXAMPLE_CONTRACT } from "@/constants/exampleContract";

const CodeEditor = () => {
  const [code, setCode] = useState("");

  const auditMutation = useMutation({
    mutationFn: () => generateAudit(code),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleMutation = () => {
    auditMutation.mutate();
  };

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
            <div className="w-full rounded-xl overflow-hidden border border-border mt-4">
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
            <Button onClick={handleMutation} size="lg">
              <Sparkles /> Start Audit
            </Button>
          </div>

          <div className="w-full flex flex-col items-start gap-8 my-8">
            <div className="w-full flex items-center justify-between">
              <h2 className="font-medium text-xl">Audit Report</h2>
              <Button>New Audit</Button>
            </div>

            <div className="w-full flex flex-col items-start gap-8 p-4 rounded-xl border border-border">
              <div className="w-full flex items-center justify-between gap-4">
                <div className="flex flex-col items-start">
                  <h3 className="font-medium text-lg">Contract Audit</h3>
                  <p className="text-sm font-light text-foreground/60">
                    Audited on 28th of April 2026
                  </p>
                </div>
                <div className="flex shrink-0 p-2 items-center justify-center rounded-xl bg-white/10">
                  <p className="text-white font-semibold text-xl">20</p>
                </div>
              </div>

              <hr className="w-full border-border" />

              <div className="w-full flex flex-col items-start">
                <h3 className="font-medium text-lg">Root Hash</h3>
                <p className="text-sm font-light text-foreground/60">
                  This is the root hash of yout transaction. Use it to retrieve your PDF audit.
                </p>
                <div className="w-full flex items-center gap-2 rounded-lg border border-border p-2 mt-4">
                  <span className="flex-1 text-xs font-light font-mono text-foreground/70 truncate">
                    0x12345
                  </span>
                  <button className="shrink-0 text-foreground/40 hover:text-foreground/70 transition-colors">
                    <Copy className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col items-start gap-4">
              <div className="flex items-center justify-center gap-2">
                <Shield className="size-6 text-green-600" />
                <h3 className="font-medium text-lg">Findings</h3>
              </div>

              <div className="w-full flex flex-col items-start gap-8 p-4 rounded-xl border border-border">
                <div className="flex flex-col items-start gap-2">
                  <h3 className="font-medium text-lg">Audit Rating</h3>
                  <span className="px-2 py-1 rounded-lg border border-red-600 bg-red-900/40 text-sm font-semibold text-red-600">
                    Critical Risk
                  </span>
                </div>

                <hr className="w-full border-border" />

                <div className="flex flex-col items-start gap-1">
                  <h3 className="font-medium text-lg">Audit Summary</h3>
                  <p className="text-sm font-light text-foreground/60">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim quidem nisi
                    recusandae odio quaerat dolor quam voluptate nulla perferendis nemo
                    reprehenderit natus, quae nihil corporis corrupti voluptatum fugit suscipit
                    iusto. Inventore veritatis quo aliquam natus, ex culpa perspiciatis nesciunt
                    illo odit praesentium voluptate laboriosam id quasi dolores totam atque, amet
                    quidem, architecto velit deserunt! Omnis perspiciatis fugiat neque sequi nisi!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
