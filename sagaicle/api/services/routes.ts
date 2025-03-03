import { backendAPI } from "@/lib/api";
import type {
  SearchRoutes,
  SearchRoutesRequest,
  SearchRoutesResponse,
  PostRoute,
  PostRouteRequest,
  PostRouteResponse,
  GetRoute,
  GetRouteResponse,
} from "../types";

// GET /api/search
async function searchRoutes({
  distanceMin,
  distanceMax,
  timeMin,
  timeMax,
  tags,
  searchOption,
  sortByKey,
  sortByOrder,
  limit,
}: SearchRoutes): Promise<SearchRoutesResponse> {
  try {
    const body: SearchRoutesRequest = {
      distance: { min: distanceMin, max: distanceMax },
      time: { min: timeMin, max: timeMax },
      tags,
      search_option: searchOption,
      sort: { key: sortByKey, order: sortByOrder },
      limit,
    };
    const response = await fetch(backendAPI("/api/search"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data: SearchRoutesResponse = await response.json();
    if (!response.ok) {
      const errorMessage = data.error ?? "Unknown error";
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}. ${errorMessage}`
      );
    }
    return data;
  } catch (error) {
    console.error("Failed to search routes:", error);
    throw error;
  }
}

// POST /api/routes
async function postRoute({
  title,
  description,
  fullDescription,
  distance,
  time,
  tags,
  totalCheckpoints,
  images,
  map,
  checkpoints,
}: PostRoute): Promise<PostRouteResponse> {
  try {
    const body: PostRouteRequest = {
      title,
      description,
      full_description: fullDescription,
      distance,
      time,
      tags,
      total_checkpoints: totalCheckpoints,
      images,
      map,
      checkpoints,
    };
    const response = await fetch(backendAPI("/api/routes"), {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data: PostRouteResponse = await response.json();
    if (!response.ok) {
      const errorMessage = data.error ?? "Unknown error";
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}. ${errorMessage}`
      );
    }
    return data;
  } catch (error) {
    console.error("Failed to post route:", error);
    throw error;
  }
}

// GET /api/routes/{route_id}
async function getRoute({ routeId }: GetRoute): Promise<GetRouteResponse> {
  try {
    const response = await fetch(backendAPI(`/api/routes/${routeId}`), {
      method: "GET",
    });

    const data: GetRouteResponse = await response.json();
    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`
      );
    }
    return data;
  } catch (error) {
    console.error("Failed to get route:", error);
    throw error;
  }
}

export { searchRoutes, postRoute, getRoute };
