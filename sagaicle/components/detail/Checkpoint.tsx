"use client";

import React from "react";
import { SlLocationPin, SlArrowDown } from "react-icons/sl";
import { twMerge } from "tailwind-merge";

interface CheckpointProps {
  checkpoints: {
    name: string;
    lat: number;
    lng: number;
  }[];
  className?: string;
}

function Checkpoint({ checkpoints, className }: CheckpointProps) {
  return (
    <div className={twMerge("flex flex-col items-start gap-2", className)}>
      {checkpoints.map((checkpoint, index, array) => (
        <React.Fragment key={index}>
          <div className="flex gap-2 items-center px-3 py-1 border-theme-green border rounded-3xl bg-white">
            <SlLocationPin className="text-theme-green" />
            <span className="text-theme-gray">{checkpoint.name}</span>
          </div>
          {index < array.length - 1 && (
            <SlArrowDown className="text-theme-green ml-10" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Checkpoint;
