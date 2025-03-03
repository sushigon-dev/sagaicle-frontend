"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Searching } from "@/components/common/loading/";
import SearchForm from "./search_form/SearchForm";
import RouteCardContainer from "./route_card/RouteCardContainer";

import * as schema from "@/api/schemas";
import * as api from "@/api/services";

const LIMIT = 10;

function SearchContainer() {
  // タグ一覧
  const [tagNames, setTagNames] = useState<schema.TagArray | null>(null);

  // 検索条件
  const [distanceRange, setDistanceRange] = useState<[number, number]>([0, 5]);
  const [timeRange, setTimeRange] = useState<[number, number]>([60, 90]);
  const [tags, setTags] = useState<schema.TagArray>([]);
  const [searchOption, setSearchOption] = useState<schema.SearchOption>("OR");
  const [sortByKey, setSortByKey] = useState<schema.Sort["key"]>("likes");
  const [sortByOrder, setSortByOrder] = useState<schema.Sort["order"]>("desc");

  // 検索結果
  const [hitCount, setHitCount] = useState<number | null>(null);
  const [routes, setRoutes] = useState<schema.RouteSummary[] | null>(null);

  // ローディング中の表示
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // タグの取得
  const fetchTagNames = async () => {
    try {
      const result = await api.getTags();
      setTagNames(() => result.tags);
    } catch (error) {
      setTagNames(() => null);
    }
  };

  // 検索処理
  const handler = setTimeout(() => {
    const handleSearchCondition = async () => {
      try {
        const result = await api.searchRoutes({
          distanceMin: distanceRange[0],
          distanceMax: distanceRange[1],
          timeMin: timeRange[0],
          timeMax: timeRange[1],
          tags: tags,
          searchOption: searchOption,
          sortByKey: sortByKey,
          sortByOrder: sortByOrder,
          limit: LIMIT,
        });
        setHitCount(() => result.hit_count);
        setRoutes(() => result.routes);
      } catch (error) {
        setHitCount(() => null);
        setRoutes(() => null);
      } finally {
        setIsLoading(() => false);
      }
    };
    handleSearchCondition();
  }, 2000);

  useEffect(() => {
    // クエリパラメータの取得
    const searchParams = useSearchParams();
    const initialTag = searchParams.get("tag");
    if (initialTag) {
      setTags(() => [initialTag]);
    }

    fetchTagNames();
  }, []);

  useEffect(() => {
    setIsLoading(() => true);
    return () => clearTimeout(handler);
  }, [distanceRange, timeRange, tags, searchOption, sortByKey, sortByOrder]);

  return (
    <div className="flex flex-col md:flex-row p-4 gap-4">
      <SearchForm
        tagNames={tagNames ?? []}
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
      {hitCount !== null && routes !== null && !isLoading && (
        <RouteCardContainer
          hitCount={hitCount}
          routes={routes.map((routes) => {
            return {
              id: routes.id,
              title: routes.title,
              description: routes.description,
              distance: routes.distance,
              time: routes.time,
              tags: routes.tags,
              likes: routes.likes,
              image: routes.image,
              update: routes.update_at,
            };
          })}
        />
      )}
    </div>
  );
}

export default SearchContainer;
