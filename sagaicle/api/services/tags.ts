import { backendAPI } from "@/lib/api";
import type { GetTagsResponse } from "../types";

async function getTags(): Promise<GetTagsResponse> {
  try {
    const response = await fetch(backendAPI("/api/tags"), {
      method: "GET",
    });

    const data: GetTagsResponse = await response.json();
    if (!response.ok) {
      const errorMessage = data.error ?? "Unknown error";
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}. ${errorMessage}`
      );
    }
    console.log("success get tags: ", data);
    return data;
  } catch (error) {
    console.error("Failed to get tags:", error);
    throw error;
  }
}

export { getTags };

// import { getTagsResponse } from "../mocks";

// async function getTags(): Promise<GetTagsResponse> {
//   return getTagsResponse;
// }

// export { getTags };
