import type { GetProfileResponse } from "../types";

const getProfileResponse: GetProfileResponse = {
  user_name: "ほげほげ男",
  badged_routes: [
    { id: "1", title: "ほげほげルート" },
    { id: "2", title: "ふがふがルート" },
  ],
  liked_routes: [
    { id: "3", title: "ぴよぴよルート" },
    { id: "4", title: "ほげほげルート" },
  ],
  mileage: 15,
  total_distance: 300,
};

export { getProfileResponse };
