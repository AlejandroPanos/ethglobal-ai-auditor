import { FileLock, FileCheck, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Vulnerability Detection",
    description: "Identifies reentrancy, overflow, and other critical vulnerabilities.",
  },
  {
    icon: FileLock,
    title: "Immutable Reports",
    description: "Each audit generates a unique root hash for verification.",
  },
  {
    icon: FileCheck,
    title: "PDF Export",
    description: "Download professional audit reports for your records.",
  },
];

const Features = () => {
  return (
    <div className="flex items-center justify-center pt-4 pb-12">
      <div>
        {/* <h2 className="mx-auto max-w-3xl text-center font-satoshi font-semibold text-4xl tracking-tight sm:text-5xl/tight">
          Everything You Need to Build, Manage, and Grow Without Limits
        </h2> */}
        <div className="mx-auto mt-10 grid max-w-(--breakpoint-lg) gap-6 px-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div className="flex flex-col rounded-xl border px-5 py-6" key={feature.title}>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100/10">
                <feature.icon className="size-6 text-green-600" />
              </div>
              <span className="font-medium text-lg">{feature.title}</span>
              <p className="mt-1 text-[15px] text-foreground/60">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
