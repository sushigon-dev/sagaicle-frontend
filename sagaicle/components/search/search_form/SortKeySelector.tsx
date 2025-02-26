import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortKeySelectorProps {
  sortByKey: "distance" | "time" | "likes" | "update_at";
  setSortByKey: React.Dispatch<
    React.SetStateAction<"distance" | "time" | "likes" | "update_at">
  >;
}

function SortKeySelector({ sortByKey, setSortByKey }: SortKeySelectorProps) {
  const sortKeyDisplay = {
    distance: "距離",
    time: "所要時間",
    likes: "いいね数",
    update_at: "更新日時",
  };

  return (
    <Select
      onValueChange={(value: "distance" | "time" | "likes" | "update_at") =>
        setSortByKey(value)
      }
      defaultValue={sortByKey}
    >
      <SelectTrigger className="bg-white max-w-36">
        <SelectValue>{sortKeyDisplay[sortByKey]}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="distance">距離</SelectItem>
          <SelectItem value="time">所要時間</SelectItem>
          <SelectItem value="likes">いいね数</SelectItem>
          <SelectItem value="updated_at">更新日時</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SortKeySelector;
