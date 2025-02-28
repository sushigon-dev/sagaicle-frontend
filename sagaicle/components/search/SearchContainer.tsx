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

function shuffleArray(arr: any[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    // 0以上i以下のランダムなインデックスを生成
    const j = Math.floor(Math.random() * (i + 1));

    // 要素を交換
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function SearchContainer() {
  // 検索可能なタグ名
  const [initialTag, setInitialTag] = useState<string | null>(null);

  // useEffect(() => {
  //   const searchParams = useSearchParams();
  //   setInitialTag(() => searchParams.get("tag"));
  // }, []);

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
      setTagNames(() => [
        "歴史探索",
        "温泉巡り",
        "家族向け",
        "グルメ体験",
        "市街地探索",
        "アマチュア向け",
        "絶景ルート",
        "海沿い",
        "アドベンチャー",
        "ヒルクライム",
        "リラクゼーション",
        "ファミリー向け",
        "長距離",
        "チャレンジ",
        "短距離",
        "ロマンチック",
        "山岳風景",
        "自然満喫",
        "文化体験",
        "初心者向け",
      ]);
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
    const test: SearchResponseData["routes"] = [
      {
        id: "1234",
        title: "歴史と温泉巡りコース",
        description: "歴史的なスポットと温泉を巡る贅沢なサイクリングルート",
        distance: 40,
        time: 180,
        tags: ["歴史探索", "温泉巡り", "家族向け"],
        likes: 37,
        image:
          "https://green.xgoo.jp/cdn/column/upload/img/thumbnail/walkerplus/walkerplus_1005949.jpg",
        update: "2023/04/15",
      },
      {
        id: "5678",
        title: "朝市と神社、温泉の贅沢サイクリングコース",
        description: "新鮮な朝市と歴史ある神社、温泉で一息つける充実ルート",
        distance: 35,
        time: 150,
        tags: ["グルメ体験", "市街地探索", "アマチュア向け"],
        likes: 82,
        image:
          "https://hatako-trip.com/wp-content/uploads/2022/01/DSC05201.jpg",
        update: "2022/11/23",
      },
      {
        id: "9101",
        title: "海と橋、絶景と温泉を巡るサイクリングコース",
        description: "絶景の海岸線と歴史ある橋、自然の美に浸る贅沢ルート",
        distance: 45,
        time: 180,
        tags: ["絶景ルート", "海沿い", "アドベンチャー", "ヒルクライム"],
        likes: 56,
        image: "https://at.very7.net/files/100-13.jpg",
        update: "2023/01/10",
      },
      {
        id: "1121",
        title: "歴史とグルメを楽しむ唐津サイクリングコース",
        description:
          "歴史的な唐津城と美しい虹の松原、名物グルメも楽しめるルート",
        distance: 30,
        time: 120,
        tags: ["歴史探索", "グルメ体験", "リラクゼーション", "ファミリー向け"],
        likes: 74,
        image:
          "https://svcstrg.cld.navitime.jp/travelguide/p41030003/p41030003_01.jpg",
        update: "2023/03/05",
      },
      {
        id: "3141",
        title: "温泉と絶景を巡る贅沢サイクリングツアー",
        description:
          "嬉野から武雄へ、歴史ある街道と絶景の展望台を経由する至福のサイクリング",
        distance: 50,
        time: 210,
        tags: ["温泉巡り", "絶景ルート", "長距離", "チャレンジ"],
        likes: 65,
        image:
          "https://dg24ae6szr1rz.cloudfront.net/photo/0dbe16d6d22a6710af449ef2a3f94c69.jpg/w1100/tr/file",
        update: "2022/12/11",
      },
      {
        id: "5161",
        title: "神社と干潟、商店街散策を楽しむサイクリングコース",
        description:
          "歴史ある神社と豊かな干潟、地元の商店街を巡る魅力的なルート",
        distance: 35,
        time: 150,
        tags: ["家族向け", "市街地探索", "文化体験", "リラクゼーション"],
        likes: 49,
        image:
          "https://saga-kashima-kankou.com/wp/wp-content/uploads/2019/04/PSDSC00316_2.jpg",
        update: "2023/02/17",
      },
      {
        id: "7181",
        title: "温泉と空の旅へ！佐賀エアーコース",
        description:
          "温泉で癒され、佐賀空港とサガエアーの風景を楽しむ軽快ルート",
        distance: 25,
        time: 90,
        tags: ["温泉巡り", "短距離", "アマチュア向け", "ロマンチック"],
        likes: 88,
        image:
          "https://saga.ismcdn.jp/mwimgs/f/2/1200wm/img_f2265f3f12deb2c29e0b71c5baeb9ec3376935.jpg",
        update: "2022/10/30",
      },
      {
        id: "9202",
        title: "海と山のコントラスト！絶景サイクリングコース",
        description: "海中鳥居とオレンジ街道、山岳風景が織りなす魅惑のルート",
        distance: 40,
        time: 180,
        tags: ["絶景ルート", "山岳風景", "アドベンチャー", "ヒルクライム"],
        likes: 53,
        image:
          "https://saga-kashima-kankou.com/wp/wp-content/uploads/2019/03/PSDSC07930.jpg",
        update: "2023/05/06",
      },
      {
        id: "1023",
        title: "温泉と自然が織りなす癒しのサイクリングコース",
        description:
          "温泉地を巡りながら、ダムや展望台から雄大な自然を堪能する充実ルート",
        distance: 55,
        time: 240,
        tags: ["自然満喫", "アドベンチャー", "長距離", "チャレンジ"],
        likes: 77,
        image: "https://www.fuji-spa.com/.assets/img_gallery_kumanokawa_13.jpg",
        update: "2023/06/18",
      },
      {
        id: "1123",
        title: "歴史と温泉、自然美を堪能するサイクリング大冒険",
        description:
          "吉野ヶ里から温泉、壁画、干潟まで、歴史と自然・文化が融合する充実ルート",
        distance: 60,
        time: 270,
        tags: ["歴史探索", "温泉巡り", "文化体験", "海沿い", "アドベンチャー"],
        likes: 91,
        image:
          "https://saga.ismcdn.jp/mwimgs/6/c/1200/img_6c36bf9d8bac02fe8af2f4731360ce9f850343.jpg",
        update: "2023/07/22",
      },
    ];

    setResult(() => shuffleArray(test));
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
