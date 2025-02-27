import { twMerge } from "tailwind-merge";
import style from "./searching.module.css";

interface SearchingProps {
  className?: string;
}

function Searching({ className }: SearchingProps) {
  return (
    <div className={twMerge(className)}>
      <div className={style.loader} />
    </div>
  );
}

export default Searching;
