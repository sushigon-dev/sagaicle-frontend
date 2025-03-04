// const BACKEND_API_URL = process.env.BACKEND_API_URL?.replace(/\/$/, "") ?? "";
const BACKEND_API_URL = "https://sushigon.hopto.org";
function backendAPI(endpoint: string) {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${BACKEND_API_URL}${cleanEndpoint}`;
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

export { backendAPI, GOOGLE_MAPS_API_KEY };
