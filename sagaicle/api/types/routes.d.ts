import * as schemas from "../schemas";

// GET /api/search
interface SearchRoutes {
  distanceMin: schemas.RangeFloat["min"];
  distanceMax: schemas.RangeFloat["max"];
  timeMin: schemas.RangeInt["min"];
  timeMax: schemas.RangeInt["max"];
  tags: schemas.TagArray;
  searchOption: schemas.SearchOption;
  sortByKey: schemas.Sort["key"];
  sortByOrder: schemas.Sort["order"];
  limit: schemas.Limit;
}

type SearchRoutesRequest = {
  distance: schemas.RangeFloat;
  time: schemas.RangeInt;
  tags: schemas.TagArray;
  search_option: schemas.SearchOption;
  sort: schemas.Sort;
  limit: schemas.Limit;
};

type SearchRoutesResponse = {
  hit_count: number;
  routes: schemas.RouteSummary[];
  distance: schemas.RangeFloat;
  time: schemas.RangeInt;
  tags: schemas.TagArray;
  search_option: schemas.SearchOption;
  sort: schemas.Sort;
  limit: schemas.Limit;
  error?: string;
};

// POST /api/routes
interface PostRoute {
  title: string;
  description: string;
  fullDescription: string;
  distance: number;
  time: number;
  tags: schemas.TagArray;
  totalCheckpoints: number;
  images: string[];
  map: string;
  checkpoints: schemas.Checkpoint[];
}

type PostRouteRequest = {
  title: string;
  description: string;
  full_description: string;
  distance: number;
  time: number;
  tags: schemas.TagArray;
  total_checkpoints: number;
  images: string[];
  map: string;
  checkpoints: schemas.Checkpoint[];
};

type PostRouteResponse = {
  route_id: schemas.UUID;
  update_at: string;
  title: string;
  description: string;
  full_description: string;
  distance: number;
  time: number;
  tags: schemas.TagArray;
  total_checkpoints: number;
  images: string[];
  map: string;
  checkpoints: schemas.Checkpoint[];
  error?: string;
};

// GET /api/routes/{route_id}
interface GetRoute {
  routeId: schemas.UUID;
}

type GetRouteResponse = {
  route_id: schemas.UUID;
  title: string;
  description: string;
  full_description: string;
  distance: number;
  time: number;
  tags: schemas.TagArray;
  likes: number;
  images: string[];
  map: string;
  checkpoints: schemas.Checkpoint[];
  update_at: string;
  error?: string;
};

export type {
  SearchRoutes,
  SearchRoutesRequest,
  SearchRoutesResponse,
  PostRoute,
  PostRouteRequest,
  PostRouteResponse,
  GetRoute,
  GetRouteResponse,
};
