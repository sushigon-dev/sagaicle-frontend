import React from "react";
import Link from "next/link";
import { SlClock } from "react-icons/sl";
import { MdDirectionsBike } from "react-icons/md";
import { FiNavigation } from "react-icons/fi";

import timeFormat from "@/lib/time_format";
import IconButton from "@/components/common/IconButton";
import Tag from "@/components/common/Tag";
import ImageSlider from "./image_slider/ImageSlider";
import Checkpoint from "./Checkpoint";
import LikeButton from "./LikeButton";

interface DetailProps {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  distance: number;
  time: number;
  tags: string[];
  images: string[];
  map: string;
  checkpoints: {
    name: string;
    lat: number;
    lng: number;
  }[];
  update: string;
}

function Detail({
  id,
  title,
  description,
  fullDescription,
  distance,
  time,
  tags,
  images,
  map,
  checkpoints,
  update,
}: DetailProps) {
  return (
    <div className="min-h-screen m-5">
      <ImageSlider images={images} />

      <section className="flex flex-col justify-center gap-4 px-4 py-12 text-center text-theme-green">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold drop-shadow-lg">
          {title}
        </h1>
        <div className="flex justify-center items-center gap-4 lg:gap-6 text-md lg:text-2xl">
          <div className="flex items-center gap-2">
            <MdDirectionsBike className="w-6 h-6" />
            <span>{distance.toFixed(1)} km</span>
          </div>
          <div className="flex items-center gap-2">
            <SlClock className="w-6 h-6" />
            <span>{timeFormat(time)}</span>
          </div>
        </div>
        <p className="text-theme-gray">{description}</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {tags.map((tag, index) => {
            return <Tag key={index} tagName={tag} />;
          })}
        </div>
      </section>

      <section className="flex flex-wrap justify-center gap-20 px-5 py-10 bg-theme-yellow">
        <div className="w-full h-96 md:h-[40vw] md:w-[40vw]">
          <iframe
            src={map}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="コースマップ"
            className="w-full h-full border-0 rounded-lg"
          ></iframe>
        </div>
        <div className="flex flex-col gap-6 md:gap-8 md:w-[40vw]">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl text-theme-green font-bold">
              コースの説明
            </h2>
            <p className="text-theme-gray">{fullDescription}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl text-theme-green font-bold">
              チェックポイント
            </h2>
            <Checkpoint checkpoints={checkpoints} className="p-4" />
          </div>
          <div className="flex flex-wrap items-center justify-start gap-4">
            <LikeButton id={id} />
            {/* <BookMarkButton id={id} /> */}
            <Link href={`/navigate/${id}`}>
              <IconButton
                icon={FiNavigation}
                text="ナビゲーション"
                className="bg-theme-green"
              />
            </Link>
          </div>
          <div className="flex justify-end text-theme-gray">
            最終更新日: {update}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Detail;
export type { DetailProps };
