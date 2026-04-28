import Hero from "@/components/hero";
import Features from "@/components/features";
import CodeEditor from "@/features/code/components/CodeEditor";
import { Zap } from "lucide-react";

const HomePage = () => {
  const title = (
    <>
      Secure Your <span className="text-green-600">Smart Contracts</span> With AI
    </>
  );

  return (
    <>
      <Hero
        icon={Zap}
        badge="AI-Powered Smart Contract Analysis"
        title={title}
        text="Get instant, comprehensive security audits for your Solidity smart contracts. Our AI
          analyzes your code for vulnerabilities, gas optimizations, and best practices."
      />
      <Features />
      <CodeEditor />
    </>
  );
};

export default HomePage;
