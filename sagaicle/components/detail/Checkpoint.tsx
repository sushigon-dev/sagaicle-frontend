"use client";

import React from "react";
import { useState, useEffect } from "react";
import { SlLocationPin, SlArrowDown } from "react-icons/sl";
import { twMerge } from "tailwind-merge";

interface CheckpointProps {
  id: string;
  className?: string;
}

type Checkpoint = Record<string, boolean>;

function Checkpoint({ id, className }: CheckpointProps) {
  const [checkpoints, setCheckpoints] = useState<Checkpoint | null>(null);

  useEffect(() => {
    setCheckpoints(() => ({ 呼子朝市: false, 波戸岬: true, 虹の松原: false }));
    return;
    const fetchCheckpoints = async () => {
      const response = await fetch(`/api/checkpoints/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("Error:", data.display_error_message);
        return;
      }
      setCheckpoints(() => data.checkpoints);
    };
    fetchCheckpoints();
  }, []);

  return checkpoints === null ? (
    <div className="text-theme-gray">
      チェックポイントが取得できませんでした
    </div>
  ) : (
    <div className={twMerge("flex flex-col items-start gap-2", className)}>
      {Object.entries(checkpoints).map(
        ([checkpoint, visited], index, array) => (
          <React.Fragment key={index}>
            <div className="flex gap-2 items-center px-3 py-1 border-theme-green border rounded-3xl bg-white">
              <SlLocationPin className="text-theme-green" />
              <span className="text-theme-gray">{checkpoint}</span>
            </div>
            {index < array.length - 1 && (
              <SlArrowDown className="text-theme-green ml-10" />
            )}
          </React.Fragment>
        )
      )}
    </div>
  );
}

export default Checkpoint;
