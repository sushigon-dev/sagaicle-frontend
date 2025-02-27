import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./rc-slider.css";

const MAX_DISTANCE = 30;

interface DistanceSliderProps {
  distanceRange: [number, number];
  setDistanceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
}

function DistanceSlider({
  distanceRange,
  setDistanceRange,
}: DistanceSliderProps) {
  return (
    <div className="flex flex-col items-center gap-10 w-80">
      <Slider
        range
        min={0}
        max={MAX_DISTANCE}
        step={1}
        value={distanceRange}
        onChange={(newRange: any) => setDistanceRange(newRange)}
        style={{ width: "90%" }}
        styles={{
          rail: { backgroundColor: "#d6d3d1" },
          // track: { backgroundColor: "#95c775" },
          // tracks: { backgroundColor: "#95c" },
          // handle: {
          //   backgroundColor: "#ffffff",
          //   borderColor: "#95c775",
          // },
        }}
        marks={{
          5: "5",
          10: "10",
          15: "15",
          20: "20",
          25: "25",
          30: "30",
        }}
      />
      <div className="flex items-center gap-1 text-theme-gray text-sm">
        <span>{distanceRange[0]} km</span>
        <span>-</span>
        <span>
          {distanceRange[1] == MAX_DISTANCE
            ? `${MAX_DISTANCE} km 以上`
            : `${distanceRange[1]} km`}
        </span>
      </div>
    </div>
  );
}

export default DistanceSlider;
