import type { IsLikedResponse, LikeResponse, DislikeResponse } from "@/api";

const isLikedResponse: IsLikedResponse = {
  route_id: "12345678-1234-1234-1234-1234567890ab",
  is_liked: true,
  likes: 1,
};

const likeResponse: LikeResponse = {
  route_id: "12345678-1234-1234-1234-1234567890ab",
  likes: 2,
};

const dislikeResponse: DislikeResponse = {
  route_id: "12345678-1234-1234-1234-1234567890ab",
  likes: 1,
};

export { isLikedResponse, likeResponse, dislikeResponse };
