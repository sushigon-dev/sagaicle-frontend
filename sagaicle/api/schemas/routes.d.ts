// UUID 型
type UUID = string;

// RangeFloat 型
type RangeFloat = {
  min: number;
  max: number;
};

// RangeInt 型
type RangeInt = {
  min: number;
  max: number;
};

// Sort 型
type Sort = {
  key: "distance" | "time" | "likes" | "update_at";
  order: "asc" | "desc";
};

// TagArray 型
type TagArray = string[];

// SearchOption 型
type SearchOption = "AND" | "OR" | "NOT";

// Limit 型
type Limit = number;

// RouteSummary 型
type RouteSummary = {
  id: UUID;
  title: string;
  description: string;
  distance: number;
  time: number;
  tags: TagArray;
  likes: number;
  image: string;
  update_at: string; // format: YYYY/MM/DD
};

// Checkpoint 型
type Checkpoint = {
  name: string;
  lat: number;
  lng: number;
};

// BadgedRoute 型
type BadgedRoute = {
  id: string;
  title: string;
};

// LikedRoute 型
type LikedRoute = {
  id: UUID;
  title: string;
};

export type {
  UUID,
  RangeFloat,
  RangeInt,
  Sort,
  TagArray,
  SearchOption,
  Limit,
  RouteSummary,
  Checkpoint,
  BadgedRoute,
  LikedRoute,
};
