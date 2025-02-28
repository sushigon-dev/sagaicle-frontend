"use client";

import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { backendAPI } from "@/lib/api";

// マップの初期中心座標(とうきょう)
const defaultCenter = {
  lat: 35.6895,
  lng: 139.6917,
};

// 座標の型
type Coordinate = {
  lat: number;
  lng: number;
};

interface NavigateMapProps {
  routeId: string;
  checkpoints: Coordinate[];
  routePath: Coordinate[];
}

// 半径 (メートル)
const radius = 20;

function NavigateMap({ routeId, checkpoints, routePath }: NavigateMapProps) {
  const [scaledSize, setScaledSize] = useState<google.maps.Size | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Coordinate | null>(
    null
  );

  // 現在地の取得（watchPosition でリアルタイム更新）
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting position", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 5000,
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (typeof window !== "undefined" && google.maps) {
        setScaledSize(new google.maps.Size(30, 30));
      }
    }, 1000);
  }, []);

  // 現在地が更新されたときに、チェックポイントとの距離を計算
  useEffect(() => {
    if (currentLocation) {
      checkpoints.forEach((checkpoint, index) => {
        const distance = getDistanceInMeters(
          currentLocation.lat,
          currentLocation.lng,
          checkpoint.lat,
          checkpoint.lng
        );
        if (distance <= radius) {
          checkpointHandler(index);
        }
      });
    }
  }, [currentLocation]);

  // チェックポイント到達時の処理
  const checkpointHandler = async (checkpointIndex: number) => {
    const response = await fetch(backendAPI("/api/checkpoints"), {
      method: "POST",
      body: JSON.stringify({
        routeId,
        checkpointIndex,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("Error:", response);
    }
    const checkpoint = checkpoints[checkpointIndex];
    console.log(`Checkpoint ${checkpointIndex} reached!`);
  };

  // Haversine で2点間の距離（メートル）を計算
  const getDistanceInMeters = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371000; // 地球の半径 (m)
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
    >
      <GoogleMap
        mapContainerStyle={{
          width: "100vw",
          height: "100vh",
        }}
        center={currentLocation || defaultCenter}
        zoom={14}
      >
        {/* 現在地のマーカー */}
        {currentLocation && <Marker position={currentLocation} />}

        {/* チェックポイントのマーカー */}
        {checkpoints.map((cp, index) => (
          <Marker
            key={index}
            position={{ lat: cp.lat, lng: cp.lng }}
            icon={{
              url: "/navigate_marker/checkpoint.svg", // 任意のカスタムアイコン（public フォルダに配置）
              scaledSize: scaledSize ?? undefined,
            }}
          />
        ))}

        {/* ゴールのマーカー */}
        <Marker
          position={routePath[routePath.length - 1]}
          icon={{
            url: "/navigate_marker/goal.svg",
            scaledSize: scaledSize ?? undefined,
          }}
        />

        {/* 経路（Polyline）の描画 */}
        {routePath && (
          <Polyline
            path={routePath}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 1.0,
              strokeWeight: 3,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default NavigateMap;
export type { Coordinate };
