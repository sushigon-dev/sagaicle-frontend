import * as schemas from "../schemas";

// POST /api/auth/register, /api/auth/login
interface Auth {
  userName: string;
  password: string;
}

type AuthRequest = {
  user_name: string;
  password: string;
};

type AuthResponse = {
  user_name: string;
  error?: string;
};

// DELETE /api/auth/logout
type LogoutResponse = {
  token: string;
  error?: string;
};

// GET /api/auth/me
type WhoameResponse = {
  user_id: schemas.UUID;
  user_name: string;
  token: string;
  error?: string;
};

export type { Auth, AuthRequest, AuthResponse, LogoutResponse, WhoameResponse };
