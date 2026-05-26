import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const PasteInput = () => {
  return (
    <div className="space-y-2">
      <Textarea className="w-full h-72 resize-none p-4 border border-scootopia-gray-80 bg-scootopia-bg-gray-100 rounded-md focus-visible:border-scootopia-gray-80 focus-visible:ring-0 text-lg font-normal tracking-wide"></Textarea>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          0 URLs detected
        </span>
        <Button
          className="cursor-pointer uppercase tracking-wide rounded-md"
          variant="default"
        >
          Run
        </Button>
      </div>
    </div>
  );
};

export default PasteInput;
