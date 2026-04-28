import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function InputWithButtonDemo() {
  return (
    <div className="flex w-full items-center gap-2">
      <Input placeholder="0x123..." type="text" />
      <Button className="shadow">Find Report</Button>
    </div>
  );
}
