import React from "react";
import { twMerge } from "tailwind-merge";

import RouteCard from "./RouteCard";
import { RouteCardProps } from "./RouteCard";

interface RouteCardContainerProps {
  routes: RouteCardProps[];
  className?: string;
}

function RouteCardContainer({ routes, className }: RouteCardContainerProps) {
  return (
    <div
      className={twMerge("flex flex-wrap justify-start gap-6 p-4", className)}
    >
      {routes.map((route, index) => (
        <RouteCard key={index} {...route} />
      ))}
    </div>
  );
}

export default RouteCardContainer;
export type { RouteCardContainerProps };
