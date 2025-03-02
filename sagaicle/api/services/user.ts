import { backendAPI } from "@/lib/api";
import type { GetProfileResponse } from "../types";

// GET /api/user
async function getProfile() {
  try {
    const response = await fetch(backendAPI("/api/user"), {
      method: "GET",
      credentials: "include",
    });

    const data: GetProfileResponse = await response.json();
    if (!response.ok) {
      const errorMessage = data.error ?? "Unknown error";
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}. ${errorMessage}`
      );
    }
    return data;
  } catch (error) {
    console.error("Failed to get profile:", error);
    throw error;
  }
}

export { getProfile };
