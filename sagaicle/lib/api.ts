const BACKEND_API_URL = process.env.BACKEND_API_URL?.replace(/\/$/, "") ?? "";

function backendAPI(endpoint: string) {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${BACKEND_API_URL}${cleanEndpoint}`;
}

export { backendAPI };
