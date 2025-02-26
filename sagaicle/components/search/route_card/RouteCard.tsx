import Link from "next/link";
import Image from "next/image";

import { twMerge } from "tailwind-merge";
import { SlClock } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";
import shortenText from "@/lib/shorten_text";
import timeFormat from "@/lib/time_format";
import Tag from "@/components/common/Tag";

const maxTags = 5;

interface RouteCardProps {
  id: string; // ID (内部的な処理に利用)
  title: string; // タイトル
  description: string; // 一言
  distance: number; // 距離
  time: number; // 目安時間
  tags: string[]; // タグ
  likes: number; // いいね数
  image: string; // 画像のURL
  update: string; // 更新日時
  className?: string; // クラス名
}

function RouteCard({
  id,
  title,
  description,
  distance,
  time,
  tags,
  likes,
  image,
  update,
  className,
}: RouteCardProps) {
  return (
    <Link
      href={`/detail/${id}`}
      className={twMerge(
        "block overflow-hidden rounded-lg shadow-lg transform transition duration-3s00 hover:scale-105 w-72 md:w-80 bg-theme-yellow",
        className
      )}
    >
      <div className="px-4 py-3 bg-theme-green font-bold text-theme-yellow text-lg md:text-xl">
        {shortenText(title, 20)}
      </div>
      <Image
        src={image}
        alt={title}
        width={640}
        height={360}
        className="w-full h-40 object-cover"
      />
      <div className="flex flex-col justify-center gap-3 p-4 text-sm">
        <div className="flex justify-start items-center gap-5 text-theme-gray">
          <div className="flex items-center gap-1">
            <MdDirectionsBike className="w-5 h-5" />
            <span>{distance} km</span>
          </div>
          <div className="flex items-center gap-1">
            <SlClock className="w-4 h-4" />
            <span>{timeFormat(time)}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaHeart className="w-4 h-4" />
            <span> {likes}</span>
          </div>
        </div>
        {/* <hr className="flex-grow border-t border-theme-gray" /> */}
        <div className="text-theme-gray">{shortenText(description, 44)}</div>
        <div className="flex flex-wrap gap-1 justify-start items-end">
          {tags.slice(0, maxTags).map((tag, index) => {
            return <Tag key={index} tagName={tag} className="text-xs" />;
          })}
          {tags.length > maxTags && (
            <div className="text-theme-gray text-xl">...</div>
          )}
        </div>
        <div className="flex justify-end px-4 text-theme-gray">{update}</div>
      </div>
    </Link>
  );
}

export default RouteCard;
export type { RouteCardProps };
