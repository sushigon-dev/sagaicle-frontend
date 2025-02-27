import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { backendAPI } from "@/lib/api";
import LikesCheckpointsContainer from "./LikesCheckpointsContainer";
import Progress from "./Progress";

type GetResponseData = {
  user_name: string;
  badged_routes: { id: string; name: string }[];
  liked_routes: { id: string; name: string }[];
  mileage: number;
  total_distance: number;
  error?: string;
};

function Profile() {
  const [userName, setUserName] = useState<string>("");
  const [badgedRoutes, setbadgedRoutes] = useState<
    { id: string; name: string }[]
  >([]);
  const [likedRoutes, setLikedRoutes] = useState<
    { id: string; name: string }[]
  >([]);
  const [mileage, setMileage] = useState<number>(0);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUserName(() => "ほげほげ男");
    setbadgedRoutes(() => [
      { id: "1", name: "test1" },
      { id: "2", name: "test2" },
      { id: "3", name: "test3" },
    ]);
    setLikedRoutes(() => [
      { id: "1", name: "test1" },
      { id: "2", name: "test2" },
      { id: "3", name: "test3" },
    ]);
    setMileage(() => 100);
    setTotalDistance(() => 1000);
    return;
    const fetchData = async () => {
      const response = await fetch(backendAPI("/api/user"), {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: GetResponseData = await response.json();
      if (!response.ok) {
        console.error(response.status, data.error);
        return;
      }

      setUserName(() => data.user_name);
      setbadgedRoutes(() => data.badged_routes);
      setLikedRoutes(() => data.liked_routes);
      setMileage(() => data.mileage);
      setTotalDistance(() => data.total_distance);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:justify-stretch items-center gap-6 m-2 p-4 rounded-lg bg-theme-yellow text-theme-gray">
      <div className="flex flex-col items-center w-full">
        <p className="text-xl">{userName}</p>
        <Progress current={mileage} goal={totalDistance} />
      </div>
      <div className="flex flex-col items-center w-full">
        <LikesCheckpointsContainer
          likedRoutes={likedRoutes}
          badgedRoutes={badgedRoutes}
        />
      </div>
    </div>
  );
}

export default Profile;
