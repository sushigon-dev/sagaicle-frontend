import type { AuthResponse, WhoamiResponse } from "../types";

const authResponse: AuthResponse = {
  user_name: "ほげほげ男",
};

const whoamiResponse: WhoamiResponse = {
  user_id: "12345678-1234-1234-1234-1234567890ab",
  user_name: "ほげほげ男",
  token: "12345678-1234-1234-1234-1234567890ab",
};

export { authResponse, whoamiResponse };
