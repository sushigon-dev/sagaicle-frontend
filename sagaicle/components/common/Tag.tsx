"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface TagProps {
  tagName: string;
  className?: string;
}

function Tag({ tagName, className }: TagProps) {
  const router = useRouter();
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        router.push(`/search?tag=${tagName}`);
      }}
      className={twMerge(
        "px-3 py-1 bg-theme-brown text-white text-sm rounded-full hover:underline cursor-pointer",
        className
      )}
    >
      # {tagName}
    </div>
  );
}

export default Tag;
