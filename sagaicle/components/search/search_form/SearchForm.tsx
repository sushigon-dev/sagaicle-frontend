import DistanceSlider from "./slider/DistanceSlider";
import TimeSlider from "./slider/TimeSlider";
import TagSelector from "./TagSelector";
import OptionToggle from "./OptionToggle";
import SortKeySelector from "./SortKeySelector";
import SortOrderSelector from "./SortOrderSelector";

interface SearchParams {
  tagNames: string[];
  distanceRange: [number, number];
  timeRange: [number, number];
  tags: string[];
  searchOption: "AND" | "OR" | "NOT";
  sortByKey: "distance" | "time" | "likes" | "update_at";
  sortByOrder: "asc" | "desc";
  setDistanceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  setTimeRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  setSearchOption: React.Dispatch<React.SetStateAction<"AND" | "OR" | "NOT">>;
  setSortByKey: React.Dispatch<
    React.SetStateAction<"distance" | "time" | "likes" | "update_at">
  >;
  setSortByOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
}

function SearchForm({
  tagNames,
  distanceRange,
  timeRange,
  tags,
  searchOption,
  sortByKey,
  sortByOrder,
  setDistanceRange,
  setTimeRange,
  setTags,
  setSearchOption,
  setSortByKey,
  setSortByOrder,
}: SearchParams) {
  return (
    <div className="flex flex-col gap-12 text-theme-gray p-4 bg-theme-yellow rounded-lg w-96">
      {/* <div className="flex flex-wrap gap-12"> */}
      <div className="flex flex-col gap-2">
        <span>走行距離</span>
        <DistanceSlider
          distanceRange={distanceRange}
          setDistanceRange={setDistanceRange}
        />
        {/* </div> */}

        <div className="flex flex-col gap-2">
          <span>時間</span>
          <TimeSlider timeRange={timeRange} setTimeRange={setTimeRange} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span>タグを選択</span>
        <TagSelector tagNames={tagNames ?? []} tags={tags} setTags={setTags} />
        <OptionToggle
          searchOption={searchOption}
          setSearchOption={setSearchOption}
          className="mt-4"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span>並び替え</span>
        <div className="flex flex-wrap gap-4">
          <SortKeySelector sortByKey={sortByKey} setSortByKey={setSortByKey} />
          <SortOrderSelector
            sortByOrder={sortByOrder}
            setSortByOrder={setSortByOrder}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
