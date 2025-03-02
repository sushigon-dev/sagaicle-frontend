import { backendAPI } from "@/lib/api";
import type {
  GetVisitedCheckpoints,
  GetVisitedCheckpointsResponse,
  VisitCheckpoints,
  VisitCheckpointsResponse,
} from "../types";

// GET /api/routes/{route_id}/checkpoints
async function getVisitedCheckpoints({
  routeId,
}: GetVisitedCheckpoints): Promise<GetVisitedCheckpointsResponse> {
  try {
    const response = await fetch(
      backendAPI(`/api/routes/${routeId}/checkpoints`),
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data: GetVisitedCheckpointsResponse = await response.json();
    if (!response.ok) {
      const errorMessage = data.error ?? "Unknown error";
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}. ${errorMessage}`
      );
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch visited checkpoints:", error);
    throw error;
  }
}

// POST /api/routes/{route_id}/checkpoints/{checkpoint_index}/visit
async function visitCheckpoint({
  routeId,
  checkpointIndex,
}: VisitCheckpoints): Promise<VisitCheckpointsResponse> {
  try {
    const response = await fetch(
      backendAPI(`/api/routes/${routeId}/checkpoints/${checkpointIndex}/visit`),
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data: VisitCheckpointsResponse = await response.json();
    if (!response.ok) {
      const errorMessage = data.error ?? "Unknown error";
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}. ${errorMessage}`
      );
    }
    return data;
  } catch (error) {
    console.error("Failed to visit checkpoint:", error);
    throw error;
  }
}

export { getVisitedCheckpoints, visitCheckpoint };
