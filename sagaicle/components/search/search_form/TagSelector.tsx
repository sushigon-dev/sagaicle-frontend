interface TagProps {
  tagName: string;
  tags: string[];
  settags: React.Dispatch<React.SetStateAction<string[]>>;
}

function Tag({ tagName, tags, settags }: TagProps) {
  return (
    <div
      className={`px-2 py-1 rounded-full text-sm hover:underline cursor-pointer ${
        tags.includes(tagName)
          ? "bg-theme-brown text-white border border-theme-brown"
          : "text-theme-gray border border-theme-gray"
      }`}
      onClick={() => {
        if (tags.includes(tagName)) {
          settags(tags.filter((tag) => tag !== tagName));
        } else {
          settags([...tags, tagName]);
        }
      }}
    >
      # {tagName}
    </div>
  );
}

interface TagSelectorProps {
  tagNames: string[];
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

function TagSelector({ tagNames, tags, setTags }: TagSelectorProps) {
  return (
    <div className="flex flex-wrap gap-1 justify-start items-end">
      {tagNames.map((tagName, index) => {
        return (
          <Tag key={index} tagName={tagName} tags={tags} settags={setTags} />
        );
      })}
    </div>
  );
}

export default TagSelector;
