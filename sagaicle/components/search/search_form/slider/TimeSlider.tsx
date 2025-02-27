import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./rc-slider.css";

const MAX_Time = 300;

interface TimeSliderProps {
  timeRange: [number, number];
  setTimeRange: React.Dispatch<React.SetStateAction<[number, number]>>;
}

function TimeSlider({ timeRange, setTimeRange }: TimeSliderProps) {
  return (
    <div className="flex flex-col items-center gap-10 w-80">
      <Slider
        range
        min={0}
        max={MAX_Time}
        step={10}
        value={timeRange}
        onChange={(newRange: any) => setTimeRange(newRange)}
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
          60: "60",
          120: "120",
          180: "180",
          240: "240",
          300: "300",
        }}
      />
      <div className="flex items-center gap-1 text-theme-gray text-sm">
        <span>{timeRange[0]} 分</span>
        <span>-</span>
        <span>
          {timeRange[1] == MAX_Time
            ? `${MAX_Time} 分 以上`
            : `${timeRange[1]} 分`}
        </span>
      </div>
    </div>
  );
}

export default TimeSlider;
