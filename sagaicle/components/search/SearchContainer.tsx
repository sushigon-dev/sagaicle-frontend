"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Route } from "@/types";
import { backendAPI } from "@/lib/api";
import { Searching } from "@/components/common/loading/";
import SearchForm from "./search_form/SearchForm";
import RouteCardContainer from "./route_card/RouteCardContainer";

const LIMIT = 10;

type TagsResponseData = {
  display_error_message: string;
  tags: string[];
};

type SearchResponseData = {
  display_error_message: string;
  hit_count: number;
  routes: Route[];
};

type SearchRequestData = {
  distance: {
    min: number;
    max: number;
  };
  time: {
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
  const searchParams = useSearchParams();
  const initialTag = searchParams.get("tag");

  const [tagNames, setTagNames] = useState<string[] | null>(null);

  // 検索条件
  const [distanceRange, setDistanceRange] = useState<[number, number]>([0, 5]);
  const [timeRange, setTimeRange] = useState<[number, number]>([60, 90]);
  const [tags, setTags] = useState<string[]>([]);
  const [searchOption, setSearchOption] = useState<"AND" | "OR">("OR");
  const [sortByKey, setSortByKey] = useState<
    "distance" | "time" | "likes" | "update_at"
  >("likes");
  const [sortByOrder, setSortByOrder] = useState<"asc" | "desc">("desc");

  // 検索結果
  const [hitCount, setHitCount] = useState<number | null>(null);
  const [result, setResult] = useState<Route[] | null>(null);

  // ローディング中の表示
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (initialTag) {
      setTags(() => [initialTag]);
    }

    const fetchTagNames = async () => {
      setTagNames(() => ["おっぱい", "tag2", "tag3", "tag4", "tag5"]);
      return;
      const response = await fetch(backendAPI("/api/tags"), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: TagsResponseData = await response.json();
      if (!response.ok) {
        console.error("Error:", data.display_error_message);
        return;
      }
      setTagNames(() => data.tags);
    };
    fetchTagNames();
  }, []);

  useEffect(() => {
    const test = [
      {
        id: "1",
        title: "美しい山道のサイクリング",
        description:
          "新鮮な海鮮から、絶景の海原、自然の雄大さ、サイクリング旅行のいいところを詰め合わせたようなサイクリングコースです！",
        distance: 10,
        time: 30,
        tags: [
          "山道",
          "絶景",
          "チャレンジ",
          "おっぱい",
          "JK",
          "チャレンジ",
          "山道",
          "絶景",
          "チャレンジ",
        ],
        likes: 10,
        image: "/test/test_image_01.webp",
        update: "2021/10/01",
      },
      {
        id: "2",
        title: "タイトル2",
        description: "説明2",
        distance: 20.4,
        time: 60,
        tags: ["タグ3", "タグ4"],
        likes: 20,
        image: "/test/test_image_02.jpeg",
        update: "2021/10/02",
      },
      {
        id: "2",
        title: "タイトル2",
        description: "説明2",
        distance: 20.4,
        time: 60,
        tags: ["タグ3", "タグ4"],
        likes: 20,
        image: "/test/test_image_02.jpeg",
        update: "2021/10/02",
      },
      {
        id: "2",
        title: "タイトル2",
        description: "説明2",
        distance: 20.4,
        time: 60,
        tags: ["タグ3", "タグ4"],
        likes: 20,
        image: "/test/test_image_02.jpeg",
        update: "2021/10/02",
      },
      {
        id: "2",
        title: "タイトル2",
        description: "説明2",
        distance: 20.4,
        time: 60,
        tags: ["タグ3", "タグ4"],
        likes: 20,
        image: "/test/test_image_02.jpeg",
        update: "2021/10/02",
      },
    ];
    setResult(() => test);
    setHitCount(() => test.length);
    setIsLoading(() => true);
    setTimeout(() => {
      setIsLoading(() => false);
    }, 3000);
    return;

    const handler = setTimeout(() => {
      setIsLoading(() => true);
      const handleSearchCondition = async () => {
        const postData: SearchRequestData = {
          distance: {
            min: distanceRange[0],
            max: distanceRange[1],
          },
          time: {
            min: timeRange[0],
            max: timeRange[1],
          },
          tags: tags,
          search_option: searchOption,
          sort_by: {
            key: sortByKey,
            order: sortByOrder,
          },
          limit: LIMIT,
        };

        const response = await fetch(backendAPI("/api/search"), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });
        const data: SearchResponseData = await response.json();
        if (!response.ok) {
          console.error("Error:", data.display_error_message);
          clearTimeout(handler);
          return;
        }

        setHitCount(() => data.hit_count);
        setResult(() => data.routes);

        clearTimeout(handler);
      };
      handleSearchCondition();
      setIsLoading(() => false);
    }, 2000); // Wait for 2 seconds before sending the request

    return () => clearTimeout(handler);
  }, [distanceRange, timeRange, tags, searchOption, sortByKey, sortByOrder]);

  return (
    <div className="flex flex-col md:flex-row p-4 gap-4">
      <SearchForm
        tagNames={tagNames}
        distanceRange={distanceRange}
        timeRange={timeRange}
        tags={tags}
        searchOption={searchOption}
        sortByKey={sortByKey}
        sortByOrder={sortByOrder}
        setDistanceRange={setDistanceRange}
        setTimeRange={setTimeRange}
        setTags={setTags}
        setSearchOption={setSearchOption}
        setSortByKey={setSortByKey}
        setSortByOrder={setSortByOrder}
      />
      {isLoading && <Searching className="w-full h-full m-auto" />}
      {hitCount !== null && result !== null && !isLoading && (
        <RouteCardContainer hitCount={hitCount} routes={result} />
      )}
    </div>
  );
}

export default SearchContainer;
