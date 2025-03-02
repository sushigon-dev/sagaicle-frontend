import { backendAPI } from "@/lib/api";
import {
  IsLiked,
  IsLikedResponse,
  Like,
  LikeResponse,
  Dislike,
  DislikeResponse,
} from "../types";

// GET /api/routes/{route_id}/like
async function isLiked({ routeId }: IsLiked): Promise<IsLikedResponse> {
  try {
    const response = await fetch(backendAPI(`/api/routes/${routeId}/like`), {
      method: "GET",
      credentials: "include",
    });

    const data: IsLikedResponse = await response.json();
    if (!response.ok) {
      const errorMessage = data.error ?? "Unknown error";
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}. ${errorMessage}`
      );
    }
    return data;
  } catch (error) {
    console.error("Failed to check if route is liked:", error);
    throw error;
  }
}

// POST /api/routes/{route_id}/like
async function like({ routeId }: Like): Promise<LikeResponse> {
  try {
    const response = await fetch(backendAPI(`/api/routes/${routeId}/like`), {
      method: "POST",
      credentials: "include",
    });

    const data: LikeResponse = await response.json();
    if (!response.ok) {
      const errorMessage = data.error ?? "Unknown error";
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}. ${errorMessage}`
      );
    }
    return data;
  } catch (error) {
    console.error("Failed to like route:", error);
    throw error;
  }
}

// DELETE /api/routes/{route_id}/like
async function dislike({ routeId }: Dislike): Promise<DislikeResponse> {
  try {
    const response = await fetch(backendAPI(`/api/routes/${routeId}/like`), {
      method: "DELETE",
      credentials: "include",
    });

    const data: DislikeResponse = await response.json();
    if (!response.ok) {
      const errorMessage = data.error ?? "Unknown error";
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}. ${errorMessage}`
      );
    }
    return data;
  } catch (error) {
    console.error("Failed to dislike route:", error);
    throw error;
  }
}

export { isLiked, like, dislike };
