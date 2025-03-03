import Link from "next/link";

interface ListProps {
  items: { id: string; title: string }[];
}

function List({ items }: ListProps) {
  return (
    <div className="flex flex-col gap-2 items-center">
      {items.map((item, index) => (
        <Link
          key={index}
          href={`/route/${item.id}`}
          className="flex justify-start items-center w-80 md:w-[40vw] border-b border-theme-gray p-2 text-theme-green font-bold"
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}

export default List;
