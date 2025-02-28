import { notFound } from "next/navigation";

import { RouteDetail } from "@/types";
import { backendAPI } from "@/lib/api";
import Detail from "@/components/detail/Detail";

type ResponseData = {
  display_error_message: string;
  route_detail: RouteDetail;
};

type PageProps = {
  params: Promise<{ id: string }>;
};

const testData: RouteDetail = {
  title: "美しい山道のサイクリング",
  description: "自然豊かな山道を走る爽快なルートです。",
  full_description:
    "新鮮な海鮮から、絶景の海原、自然の雄大さ、サイクリング旅行のいいところを詰め合わせたようなサイクリングコースです！",
  distance: 42.5,
  time: 120,
  tags: ["山道", "絶景", "チャレンジ"],
  images: [
    // "https://media-assets.aumo.jp/uploads/spot/image/19668/medium_d78f757f-5255-4118-8ccd-6f42ab110fd8.jpeg",
    // "https://skywardplus.jal.co.jp/wp-content/uploads/2022/09/pic_sightseeing_saga_08.jpg",
    // "https://eats.jp/images/cuisine/photo/big_p20220707luudc3112048984740.jpg",
    "/test/test_image_01.webp",
    "/test/test_image_02.jpeg",
    "/test/test_image_03.jpg",
  ],
  map: "https://www.google.com/maps/embed?pb=!1m34!1m12!1m3!1d53232.399525649176!2d129.8789995119896!3d33.500727456251056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m19!3e2!4m5!1s0x356a70cc3232808d%3A0xd7a502b62a6d0a29!2z44CSODQ3LTAzMDMg5L2Q6LOA55yM5ZSQ5rSl5biC5ZG85a2Q55S65ZG85a2Q77yU77yR77yX77yXIOWRvOWtkOacneW4gg!3m2!1d33.5370608!2d129.8950614!4m5!1s0x356a7044e79d3495%3A0x882258dc0768a665!2z5rOi5oi45bKs44CB44CSODQ3LTA0MDQg5L2Q6LOA55yM5ZSQ5rSl5biC6Y6u6KW_55S65rOi5oi477yZ77yU77yX!3m2!1d33.5555046!2d129.8463836!4m5!1s0x3541d7c5afdabd47%3A0x5c7bb964cbf3f085!2z6Jm544Gu5p2-5Y6f44CB44CSODQ3LTAwMjIg5L2Q6LOA55yM5ZSQ5rSl5biC6Y-h!3m2!1d33.4460754!2d129.99401459999999!5e0!3m2!1sja!2sjp!4v1740241824233!5m2!1sja!2sjp",
  update: "2022/10/01",
};

async function fetchDetail(id: string) {
  return testData;
  const response = await fetch(backendAPI(`/api/route/${id}`), {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: ResponseData = await response.json();

  if (!response.ok) {
    console.error("Error:", data.display_error_message);
  }
  if (response.status === 404) {
    notFound();
  }

  return data.route_detail;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const detail = await fetchDetail(id);

  return (
    <>
      <Detail
        id={id}
        title={detail.title}
        description={detail.description}
        fullDisctiption={detail.full_description}
        distance={detail.distance}
        time={detail.time}
        tags={detail.tags}
        images={detail.images}
        map={detail.map}
        update={detail.update}
      />
    </>
  );
}
