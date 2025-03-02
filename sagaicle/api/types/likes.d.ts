import * as schemas from "../schemas";

// GET /api/routes/{route_id}/like
interface IsLiked {
  routeId: schemas.UUID;
}

type IsLikedResponse = {
  route_id: schemas.UUID;
  is_liked: boolean;
  likes: number;
  error?: string;
};

// POST /api/routes/{route_id}/like
interface Like {
  routeId: schemas.UUID;
}

type LikeResponse = {
  route_id: schemas.UUID;
  likes: number;
  error?: string;
};

// DELETE /api/routes/{route_id}/like
interface Dislike {
  routeId: schemas.UUID;
}

type DislikeResponse = {
  route_id: schemas.UUID;
  likes: number;
  error?: string;
};

export {
  IsLiked,
  IsLikedResponse,
  Like,
  LikeResponse,
  Dislike,
  DislikeResponse,
};
