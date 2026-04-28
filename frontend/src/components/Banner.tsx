import type { LucideIcon } from "lucide-react";

interface BannerProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const Banner = ({ icon: Icon, title, description }: BannerProps) => {
  return (
    <>
      <div className="flex flex-col rounded-xl border px-5 py-6">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100/10">
          <Icon className="size-6 text-green-600" />
        </div>
        <span className="font-medium text-lg">{title}</span>
        <p className="mt-1 text-[15px] text-foreground/60">{description}</p>
      </div>
    </>
  );
};

export default Banner;
