import { type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ReactNode } from "react";

interface HeroTypes {
  icon: LucideIcon;
  badge: string;
  title: ReactNode;
  text: string;
}

export default function Hero({ icon: Icon, badge, title, text }: HeroTypes) {
  return (
    <div className="flex mt-12 items-center justify-center px-6">
      <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-transparent -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(800px,100vw)] h-64 bg-primary/10 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="max-w-3xl text-center">
        <Badge asChild className="rounded-full border-border p-3" variant="outline">
          <span>
            <Icon className="text-green-600" /> {badge}
          </span>
        </Badge>
        <h1 className="mt-6 font-satoshi font-semibold text-4xl tracking-tight sm:text-5xl md:text-6xl md:leading-[1.2] lg:text-7xl">
          {title}
        </h1>
        <p className="mt-6 text-foreground/60 md:text-lg font-light">{text}</p>
      </div>
    </div>
  );
}
