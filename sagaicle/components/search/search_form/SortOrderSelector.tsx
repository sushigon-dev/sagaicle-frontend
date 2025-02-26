import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortOrderSelectorProps {
  sortByOrder: "asc" | "desc";
  setSortByOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
}

function SortOrderSelector({
  sortByOrder,
  setSortByOrder,
}: SortOrderSelectorProps) {
  const sortOrderDisplay = {
    asc: "小さい順",
    desc: "大きい順",
  };

  return (
    <Select
      onValueChange={(value: "asc" | "desc") => setSortByOrder(value)}
      defaultValue={sortByOrder}
    >
      <SelectTrigger className="bg-white max-w-36">
        <SelectValue>{sortOrderDisplay[sortByOrder]}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="asc">小さい順</SelectItem>
          <SelectItem value="desc">大きい順</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SortOrderSelector;
