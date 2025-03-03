import type { IsLikedResponse, LikeResponse, DislikeResponse } from "../types";

const isLikedResponse: IsLikedResponse = {
  route_id: "12345678-1234-1234-1234-1234567890ab",
  is_liked: true,
  likes: 130,
};

const likeResponse: LikeResponse = {
  route_id: "12345678-1234-1234-1234-1234567890ab",
  likes: 130,
};

const dislikeResponse: DislikeResponse = {
  route_id: "12345678-1234-1234-1234-1234567890ab",
  likes: 129,
};

export { isLikedResponse, likeResponse, dislikeResponse };
