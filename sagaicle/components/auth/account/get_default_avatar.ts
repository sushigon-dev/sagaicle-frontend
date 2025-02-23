const defaultAvatarList: string[] = [
  "/default_avatar/blue.svg",
  "/default_avatar/green.svg",
  "/default_avatar/orange.svg",
  "/default_avatar/pink.svg",
  "/default_avatar/purple.svg",
];

function hashStringToBucket(str: string, n: number) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0; // 31は一般的なハッシュ係数らしい
  }
  return hash % n;
}

function getDefaultAvatar(name: string) {
  const bucket = hashStringToBucket(name, defaultAvatarList.length);
  return defaultAvatarList[bucket];
}

export default getDefaultAvatar;
