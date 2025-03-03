import { backendAPI } from "@/lib/api";
import type {
  Auth,
  AuthRequest,
  AuthResponse,
  LogoutResponse,
  WhoamiResponse,
} from "../types";

// // POST /api/auth/register
// async function register({ userName, password }: Auth): Promise<AuthResponse> {
//   try {
//     const body: AuthRequest = { user_name: userName, password: password };
//     const response = await fetch(backendAPI("/api/auth/register"), {
//       method: "POST",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     });

//     const data: AuthResponse = await response.json();
//     if (!response.ok) {
//       const errorMessage = data.error ?? "Unknown error";
//       throw new Error(
//         `HTTP Error: ${response.status} - ${response.statusText}. ${errorMessage}`
//       );
//     }
//     return data;
//   } catch (error) {
//     console.error("Failed to register user:", error);
//     throw error;
//   }
// }

// // POST /api/auth/login
// async function login({ userName, password }: Auth): Promise<AuthResponse> {
//   try {
//     const body: AuthRequest = { user_name: userName, password: password };
//     const response = await fetch(backendAPI("/api/auth/login"), {
//       method: "POST",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     });

//     const data: AuthResponse = await response.json();
//     if (!response.ok) {
//       const errorMessage = data.error ?? "Unknown error";
//       throw new Error(
//         `HTTP Error: ${response.status} - ${response.statusText}. ${errorMessage}`
//       );
//     }
//     return data;
//   } catch (error) {
//     console.error("Failed to login user:", error);
//     throw error;
//   }
// }

// // DELETE /api/auth/logout
// async function logout(): Promise<LogoutResponse> {
//   try {
//     const response = await fetch(backendAPI("/api/auth/logout"), {
//       method: "DELETE",
//       credentials: "include",
//     });

//     const data: LogoutResponse = await response.json();
//     if (!response.ok) {
//       const errorMessage = data.error ?? "Unknown error";
//       throw new Error(
//         `HTTP Error: ${response.status} - ${response.statusText}. ${errorMessage}`
//       );
//     }
//     return data;
//   } catch (error) {
//     console.error("Failed to logout user:", error);
//     throw error;
//   }
// }

// // GET /api/auth/me
// async function whoami(): Promise<WhoamiResponse> {
//   try {
//     const response = await fetch(backendAPI("/api/auth/me"), {
//       method: "GET",
//       credentials: "include",
//     });

//     const data: WhoamiResponse = await response.json();
//     if (!response.ok) {
//       throw new Error(
//         `HTTP Error: ${response.status} - ${response.statusText}`
//       );
//     }
//     return data;
//   } catch (error) {
//     console.error("Failed to fetch user info:", error);
//     throw error;
//   }
// }

// export { register, login, logout, whoami };

import { authResponse, whoamiResponse } from "../mocks";

async function register({ userName, password }: Auth): Promise<AuthResponse> {
  return authResponse;
}

async function login({ userName, password }: Auth): Promise<AuthResponse> {
  return authResponse;
}

async function whoami(): Promise<WhoamiResponse> {
  return whoamiResponse;
}

export { register, login, whoami };
