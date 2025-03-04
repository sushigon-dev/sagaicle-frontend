import type { GetProfileResponse } from "../types";

const getProfileResponse: GetProfileResponse = {
  user_name: "ほげほげ男",
  badged_routes: [
    { id: "1", title: "歴史と温泉巡りコース" },
    { id: "2", title: "温泉と空の旅へ！佐賀エアーコース" },
  ],
  liked_routes: [
    { id: "1", title: "歴史と温泉巡りコース" },
    { id: "2", title: "海と山のコントラスト！絶景サイクリングコース" },
  ],
  mileage: 15,
  total_distance: 321,
};

export { getProfileResponse };
