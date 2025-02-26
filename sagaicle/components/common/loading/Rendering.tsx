import { twMerge } from "tailwind-merge";
import style from "./rendering.module.css";

interface RenderingProps {
  className?: string;
}

function Rendering({ className }: RenderingProps) {
  return (
    <div className={twMerge(className)}>
      <div className={style.loader} />
    </div>
  );
}

export default Rendering;
