import React from "react";

interface SearchParams {
  // 全てのタグ名
  tagNames: string[];

  // 検索条件
  distanceMin: number;
  distanceMax: number;
  estimatedTimeMin: number;
  estimatedTimeMax: number;
  tags: string[];
  searchOption: "AND" | "OR";
  sortByKey: "distance" | "time" | "likes" | "update_at";
  sortByOrder: "asc" | "desc";

  // 検索条件の更新関数
  setDistanceMin: React.Dispatch<React.SetStateAction<number>>;
  setDistanceMax: React.Dispatch<React.SetStateAction<number>>;
  setEstimatedTimeMin: React.Dispatch<React.SetStateAction<number>>;
  setEstimatedTimeMax: React.Dispatch<React.SetStateAction<number>>;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  setSearchOption: React.Dispatch<React.SetStateAction<"AND" | "OR">>;
  setSortByKey: React.Dispatch<
    React.SetStateAction<"distance" | "time" | "likes" | "update_at">
  >;
  setSortByOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
}

function Search({
  tagNames,
  distanceMin,
  distanceMax,
  estimatedTimeMin,
  estimatedTimeMax,
  tags,
  searchOption,
  sortByKey,
  sortByOrder,
  setDistanceMin,
  setDistanceMax,
  setEstimatedTimeMin,
  setEstimatedTimeMax,
  setTags,
  setSearchOption,
  setSortByKey,
  setSortByOrder,
}: SearchParams) {
  return <></>;
}

export default Search;
