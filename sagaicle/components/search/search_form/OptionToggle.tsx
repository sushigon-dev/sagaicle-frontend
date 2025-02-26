import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { twMerge } from "tailwind-merge";

interface OptionToggleProps {
  searchOption: "AND" | "OR";
  setSearchOption: React.Dispatch<React.SetStateAction<"AND" | "OR">>;
  className?: string;
}

function OptionToggle({
  searchOption,
  setSearchOption,
  className,
}: OptionToggleProps) {
  return (
    <div className={twMerge("flex items-center gap-1", className)}>
      <Switch
        id="option"
        checked={searchOption === "AND"}
        onCheckedChange={() => {
          setSearchOption(searchOption === "AND" ? "OR" : "AND");
        }}
      />
      <Label htmlFor="option" className="text-theme-gray text-xs">
        タグ検索をAND条件にする
      </Label>
    </div>
  );
}

export default OptionToggle;
