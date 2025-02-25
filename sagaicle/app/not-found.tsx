import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 p-16 mx-4 md:mx-6 my-10 bg-theme-yellow rounded-lg">
      <div className="flex flex-col gap-12 justify-center items-center text-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-theme-gray">
            404 <br className="block md:hidden" />
            Not Found
          </h1>
          <p className="text-lg text-theme-gray">
            お探しのページが見つかりませんでした
          </p>
        </div>
        <Link
          href="/"
          className="px-4 py-2 text-md text-white rounded-md bg-theme-brown"
        >
          トップページへ戻る
        </Link>
      </div>
      <Image
        src="/not_found/not_found.svg"
        alt="404 Not Found"
        width={400}
        height={400}
        className="w-72 opacity-50"
      />
    </div>
  );
}
