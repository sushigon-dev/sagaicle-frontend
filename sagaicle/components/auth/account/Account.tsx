import Link from "next/link";
import { twMerge } from "tailwind-merge";

import getDefaultAvatar from "./get_default_avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AccountProps {
  username: string;
  avatarSrc: string;
  className?: string;
}

const omittedNumber = 12;

export function Account({ username, avatarSrc, className }: AccountProps) {
  const omittedName =
    username.length > omittedNumber
      ? `${username.slice(0, omittedNumber)}...`
      : username;

  return (
    <div className={twMerge("flex items-center gap-4", className)}>
      <Link
        href="/profile"
        className="flex items-center gap-2 w-auto py-0 px-4 border border-border rounded-full"
      >
        <Avatar>
          <AvatarImage src={avatarSrc} className="w-7 h-7 m-auto" />
          <AvatarFallback>{username[0] || "U"}</AvatarFallback>
        </Avatar>
        <span className="text-xs text-accent-foreground hidden sm:block">
          {omittedName}
        </span>
      </Link>
    </div>
  );
}

export default Account;
