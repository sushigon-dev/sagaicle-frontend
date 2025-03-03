import * as schemas from "../schemas";

// GET /api/routes/{route_id}/checkpoints
interface GetVisitedCheckpoints {
  routeId: schemas.UUID;
}

type GetVisitedCheckpointsResponse = {
  route_id: schemas.UUID;
  visited_checkpoints: boolean[];
  error?: string;
};

// POST /api/routes/{route_id}/checkpoints/{checkpoint_index}/visit
interface VisitCheckpoints {
  routeId: schemas.UUID;
  checkpointIndex: number;
}

type VisitCheckpointsResponse = {
  route_id: schemas.UUID;
  checkpoint_index: number;
  visited_count: number;
  total_checkpoints: number;
  error?: string;
};

export type {
  GetVisitedCheckpoints,
  GetVisitedCheckpointsResponse,
  VisitCheckpoints,
  VisitCheckpointsResponse,
};
