"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaBicycle, FaThumbsUp } from "react-icons/fa";
import { GiCycling } from "react-icons/gi"; // GiCyclingアイコンをインポート
import { TiStopwatch } from "react-icons/ti";
import format from "@/components/search/route_card/format"; // format関数をインポート

interface RouteCardProps {
  id: string; // ID (内部的な処理に利用)
  title: string; // タイトル
  description: string; //一言
  distance_km: number; //距離
  estimated_time: number; //目安時間
  tags: string[]; //タグ
  likes: number; //いいね数
  image_url: string; //画像のURL
}

function RouteCard({
  id,
  title,
  description,
  distance_km,
  estimated_time,
  tags,
  likes,
  image_url,
}: RouteCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto my-8 shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 bg-gradient-to-b from-[#f1e2be] to-[#d5c18b] rounded-lg flex flex-col h-full border border-gray-200">
      {/* ヘッダーセクション */}
      <CardHeader className="p-4 bg-[#47763c] text-[#f1e2be] flex-shrink-0">
        <CardTitle className="text-3xl font-bold flex items-center">
          <span className="mr-2">
            <FaBicycle size={32} />
          </span>
          {format(title, 10)}
        </CardTitle>
      </CardHeader>
      {/* 画像セクション */}
      <div className="relative flex-shrink-0">
        <img src={image_url} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
      </div>
      {/* コンテンツセクション */}
      <CardContent className="p-6 bg-[#f1e2be] flex-grow">
        <CardDescription className="text-[#47763c] mb-4">
          {description}
        </CardDescription>
        <div className="flex justify-between items-center text-[#47763c] mb-4">
          <p className="flex items-center">
            <GiCycling className="mr-2" size={24} />
            距離 {distance_km} km
          </p>
          <p className="flex items-center">
            <TiStopwatch className="mr-2" size={23} />
            目安時間 {estimated_time} 分
          </p>
          <span className="flex items-center">
            <FaThumbsUp className="text-[#47763c] mr-1" size={24} />
            {likes}
          </span>
        </div>
        <div className="flex flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#94c674] text-[#f1e2be] mr-2 mb-2 px-3 py-1 rounded-full text-sm"
            >
              #{format(tag, 10)}
            </span>
          ))}
        </div>
      </CardContent>
      {/* フッターセクション */}
      <CardFooter className="bg-[#c1994d] text-white p-4 flex-shrink-0">
        <p className="font-semibold"></p>
      </CardFooter>
    </Card>
  );
}

export default RouteCard;
export type { RouteCardProps };
