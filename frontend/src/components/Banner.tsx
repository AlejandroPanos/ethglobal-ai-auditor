import type { LucideIcon } from "lucide-react";

interface BannerProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const Banner = ({ icon: Icon, title, description }: BannerProps) => {
  return (
    <>
      <div className="flex flex-col items-center text-center gap-3 sm:flex-row sm:items-center sm:text-left sm:gap-4">
        <div className="flex shrink-0 h-10 w-10 items-center justify-center rounded-xl bg-green-100/10">
          <Icon className="size-6 text-green-600" />
        </div>
        <div className="flex flex-col items-center sm:items-start justify-center">
          <span className="font-medium text-lg">{title}</span>
          <p className="text-sm font-light text-foreground/60">{description}</p>
        </div>
      </div>
    </>
  );
};

export default Banner;
