"use client";
import React from "react";
import RouteCard from "@/components/search/route_card/RouteCard";
import { RouteCardProps } from "@/components/search/route_card/RouteCard";

interface RouteCardContainerProps {
  routes: RouteCardProps[]; // 複数のルートカードのプロパティを受け取る
}

function RouteCardContainer({ routes }: RouteCardContainerProps) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {routes.map((route) => (
        <RouteCard key={route.id} {...route} />
      ))}
    </div>
  );
}

export default RouteCardContainer;
