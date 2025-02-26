import React from "react";
import { twMerge } from "tailwind-merge";
import { IconType } from "react-icons";

interface IconButtonProps {
  icon: IconType;
  text: string;
  onClick?: () => void;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  text,
  onClick,
  className,
}) => {
  return (
    <button
      {...(onClick && { onClick })}
      className={twMerge(
        "flex items-center gap-2 w-fit px-2 py-1 rounded-md text-white bg-slate-800",
        className
      )}
    >
      <Icon />
      <span>{text}</span>
    </button>
  );
};

export default IconButton;
