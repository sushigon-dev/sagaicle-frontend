import React from "react";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <footer className="relative h-40 p-4 w-full bg-theme-yellow text-theme-gray">
      <div className="absolute top-4 flex flex-col gap-3 left-1/2 -translate-x-1/2 ">
        <p className="text-sm font-sm text-center  ">Developed by sushigon</p>

        {/* 高専情報 */}
        <div className="flex flex-col items-center gap-3 text-sm opacity-75">
          <p>〒836-0097</p>
          <p>福岡県大牟田市東萩尾町150</p>
        </div>

        {/* コピーライト */}
        <p className="flex flex-col items-center text-sm opacity-75">
          &copy; 2025 sushigon. All Rights Reserved.
        </p>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-30 w-full">
        <Image
          src="/logo/header_image.svg"
          alt="SAGAICLE Logo"
          width={100}
          height={100}
          className="w-full"
        />
      </div>
    </footer>
  );
}

export default Footer;
