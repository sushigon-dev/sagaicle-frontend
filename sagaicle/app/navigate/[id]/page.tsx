import { notFound } from "next/navigation";

import { backendAPI } from "@/lib/api";
import NavigateMap from "@/components/navigate/NavigateMap";
import type { Coordinate } from "@/components/navigate/NavigateMap";

// チェックポイントの定義（例: 複数のチェックポイント）
const checkpoints: Coordinate[] = [
  { lat: 35.6895, lng: 137.7 },
  { lat: 35.685, lng: 139.692 },
];

// 例: Google Maps の URL から取得した経路情報（実際には URL を解析して座標配列を得るか、バックエンドなどで用意）
const routePath: Coordinate[] = [
  { lat: 35.6895, lng: 139.6917 },
  { lat: 35.688, lng: 139.695 },
  { lat: 35.6865, lng: 139.698 },
  { lat: 3.685, lng: 139.692 },
];

type ResponseData = {
  error?: string;
  route_path: Coordinate[];
  check_points: Coordinate[];
};

async function fetchRoute(id: string): Promise<ResponseData> {
  return {
    route_path: routePath,
    check_points: checkpoints,
  };

  const response = await fetch(backendAPI(`/api/route/${id}`), {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: ResponseData = await response.json();

  if (!response.ok) {
    console.error(response.status, data.error);
  }
  if (response.status === 404) {
    notFound();
  }
  return data;
}

export default async function Page({ params }: { params: { id: string } }) {
  const route = await fetchRoute(params.id);

  return (
    <>
      <NavigateMap
        routeId={params.id}
        checkpoints={route.check_points}
        routePath={route.route_path}
      />
    </>
  );
}
