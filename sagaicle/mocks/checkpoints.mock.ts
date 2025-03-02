import type {
  GetVisitedCheckpointsResponse,
  VisitCheckpointsResponse,
} from "@/api";

const getVisitedCheckpointsResponse: GetVisitedCheckpointsResponse = {
  route_id: "12345678-1234-1234-1234-1234567890ab",
  visited_checkpoints: [true, false, true],
};

const visitCheckpointsResponse: VisitCheckpointsResponse = {
  route_id: "12345678-1234-1234-1234-1234567890ab",
  checkpoint_index: 1,
  visited_count: 2,
  total_checkpoints: 3,
};

export { getVisitedCheckpointsResponse, visitCheckpointsResponse };
