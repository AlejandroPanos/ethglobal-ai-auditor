import { ArrowUpRight, CirclePlay, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="flex mt-20 items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <Badge asChild className="rounded-full border-border p-3" variant="secondary">
          <span>
            <Zap className="text-green-600" /> AI-Powered Smart Contract Analysis
          </span>
        </Badge>
        <h1 className="mt-6 font-satoshi font-semibold text-4xl tracking-tight sm:text-5xl md:text-6xl md:leading-[1.2] lg:text-7xl">
          Secure Your <span className="text-green-600">Smart Contracts</span> With AI
        </h1>
        <p className="mt-6 text-foreground/60 md:text-lg font-light">
          Get instant, comprehensive security audits for your Solidity smart contracts. Our AI
          analyzes your code for vulnerabilities, gas optimizations, and best practices.
        </p>
      </div>
    </div>
  );
}
