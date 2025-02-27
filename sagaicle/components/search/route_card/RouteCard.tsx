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
  id: string;
  title: string;
  description: string;
  distance: number;
  time: number;
  tags: string[];
  likes: number;
  image: string;
  update: string;
  className?: string;
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
      href={`/route/${id}`}
      className={twMerge(
        "block overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105 w-80 md:w-64 bg-theme-yellow",
        className
      )}
    >
      <div className="px-4 py-3 bg-theme-green font-bold text-theme-yellow text-lg">
        {shortenText(title, 20)}
      </div>
      <img
        src={image}
        alt={title}
        width={640}
        height={360}
        className="w-full h-44 md:h-36 object-cover"
      />
      <div className="flex flex-col justify-center gap-3 p-4 text-xs">
        <div className="flex justify-start items-center gap-5 text-theme-gray">
          <div className="flex items-center gap-1">
            <MdDirectionsBike className="w-4 h-4 md:w-5 md:h-5" />
            <span>{distance} km</span>
          </div>
          <div className="flex items-center gap-1">
            <SlClock className="w-3 h-3 md:w-4 md:h-4" />
            <span>{timeFormat(time)}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaHeart className="w-3 h-3 md:w-4 md:h-4" />
            <span>{likes}</span>
          </div>
        </div>
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
