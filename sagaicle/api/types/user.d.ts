import * as schemas from "../schemas";

// GET /api/user
interface GetProfileResponse {
  user_name: string;
  badged_routes: schemas.BadgedRoute[];
  liked_routes: schemas.LikedRoute[];
  mileage: number;
  total_distance: number;
  error?: string;
}

export type { GetProfileResponse };
