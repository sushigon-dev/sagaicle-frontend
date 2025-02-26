import React from "react";
import { twMerge } from "tailwind-merge";

import RouteCard from "./RouteCard";
import { RouteCardProps } from "./RouteCard";

interface RouteCardContainerProps {
  hitCount: number;
  routes: RouteCardProps[];
  className?: string;
}

function RouteCardContainer({
  hitCount,
  routes,
  className,
}: RouteCardContainerProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm text-theme-gray">
        {hitCount} 件のルートが見つかりました
      </div>
      <div
        className={twMerge(
          "flex flex-wrap justify-center md:justify-start gap-6 p-4",
          className
        )}
      >
        {routes.map((route, index) => (
          <RouteCard key={index} {...route} />
        ))}
      </div>
    </div>
  );
}

export default RouteCardContainer;
