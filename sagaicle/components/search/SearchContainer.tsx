import React, { useEffect, useState } from "react";
import { backendAPI } from "@/lib/api";

import Search from "./Search";

const LIMIT = 10;

type RouteInfo = {
  id: number;
  title: string;
  description: string;
  distance_km: number;
  estimated_time_m: number;
  tags: string[];
  likes: number;
  image_url: string;
};

type ResponseData = {
  hit_num: number;
  routes: RouteInfo[];
};

type PostData = {
  distance: {
    min: number;
    max: number;
  };
  estimated_time: {
    min: number;
    max: number;
  };
  tags: string[];
  search_option: "AND" | "OR";
  sort_by: {
    key: "distance" | "time" | "likes" | "update_at";
    order: "asc" | "desc";
  };
  limit: number;
};

function SearchContainer() {
  // 検索可能なタグ名
  // TODO: SSR で取得する？
  const [tagNames, setTagNames] = useState<string[]>([]);

  // 検索条件
  const [distanceMin, setDistanceMin] = useState<number>(0);
  const [distanceMax, setDistanceMax] = useState<number>(0);
  const [estimatedTimeMin, setEstimatedTimeMin] = useState<number>(0);
  const [estimatedTimeMax, setEstimatedTimeMax] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);
  const [searchOption, setSearchOption] = useState<"AND" | "OR">("OR");
  const [sortByKey, setSortByKey] = useState<
    "distance" | "time" | "likes" | "update_at"
  >("likes");
  const [sortByOrder, setSortByOrder] = useState<"asc" | "desc">("asc");

  // 検索結果
  const [hitNum, setHitNum] = useState<number | null>(null);
  const [result, setResult] = useState<RouteInfo[] | null>(null);

  useEffect(() => {
    const fetchTagNames = async () => {
      try {
        const res = await fetch(backendAPI("/tags"));

        if (res.ok) {
          const data = await res.json();
          setTagNames(data);
        } else {
          console.error("Failed to fetch tag names");
        }
      } catch (error) {
        console.error("Error fetching tag names:", error);
      }
    };
    fetchTagNames();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      const handleSearchCondition = async () => {
        const postData: PostData = {
          distance: {
            min: distanceMin,
            max: distanceMax,
          },
          estimated_time: {
            min: estimatedTimeMin,
            max: estimatedTimeMax,
          },
          tags: tags,
          search_option: searchOption,
          sort_by: {
            key: sortByKey,
            order: sortByOrder,
          },
          limit: LIMIT,
        };
        // TODO: 通信処理を書く
        try {
          const res = await fetch(backendAPI("/search"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          });
          const data: ResponseData = await res.json();
          setHitNum(data.hit_num);
          setResult(data.routes);
        } catch (error) {
        } finally {
          clearTimeout(handler);
        }
      };
      handleSearchCondition();
    }, 2000); // Wait for 2 seconds before sending the request

    return () => clearTimeout(handler);
  }, [
    distanceMin,
    distanceMax,
    estimatedTimeMin,
    estimatedTimeMax,
    tags,
    searchOption,
    sortByKey,
    sortByOrder,
  ]);

  return (
    <Search
      tagNames={tagNames}
      distanceMin={distanceMin}
      distanceMax={distanceMax}
      estimatedTimeMin={estimatedTimeMin}
      estimatedTimeMax={estimatedTimeMax}
      tags={tags}
      searchOption={searchOption}
      sortByKey={sortByKey}
      sortByOrder={sortByOrder}
      setDistanceMin={setDistanceMin}
      setDistanceMax={setDistanceMax}
      setEstimatedTimeMin={setEstimatedTimeMin}
      setEstimatedTimeMax={setEstimatedTimeMax}
      setTags={setTags}
      setSearchOption={setSearchOption}
      setSortByKey={setSortByKey}
      setSortByOrder={setSortByOrder}
    />
  );
}

export default SearchContainer;
