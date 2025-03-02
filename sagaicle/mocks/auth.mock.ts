import type { AuthResponse, WhoameResponse } from "@/api";

const authResponse: AuthResponse = {
  user_name: "ほげほげ男",
};

const whoameResponse: WhoameResponse = {
  user_id: "12345678-1234-1234-1234-1234567890ab",
  user_name: "ほげほげ男",
  token: "12345678-1234-1234-1234-1234567890ab",
};

export { authResponse, whoameResponse };
