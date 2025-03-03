"use client";

import { useEffect, useState } from "react";
import LikesCheckpointsContainer from "./LikesCheckpointsContainer";
import Progress from "./Progress";

import * as api from "@/api/services";
import * as schema from "@/api/schemas";

function Profile() {
  const [userName, setUserName] = useState<string | null>(null);
  const [badgedRoutes, setbadgedRoutes] = useState<schema.BadgedRoute[] | null>(
    null
  );
  const [likedRoutes, setLikedRoutes] = useState<schema.LikedRoute[] | null>(
    null
  );
  const [mileage, setMileage] = useState<number | null>(null);
  const [totalDistance, setTotalDistance] = useState<number | null>(null);

  const fetchProfile = async () => {
    try {
      const result = await api.getProfile();
      console.log(result);
      setUserName(() => result.user_name);
      setbadgedRoutes(() => result.badged_routes);
      setLikedRoutes(() => result.liked_routes);
      setMileage(() => result.mileage);
      setTotalDistance(() => result.total_distance);
    } catch (error) {
      setUserName(() => null);
      setbadgedRoutes(() => null);
      setLikedRoutes(() => null);
      setMileage(() => null);
      setTotalDistance(() => null);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:justify-stretch items-center gap-6 m-2 p-4 rounded-lg bg-theme-yellow text-theme-gray">
      <div className="flex flex-col items-center w-full">
        <p className="text-xl">{userName ?? ""}</p>
        <Progress current={mileage ?? 0} goal={totalDistance ?? 1} />
      </div>
      <div className="flex flex-col items-center w-full">
        <LikesCheckpointsContainer
          likedRoutes={likedRoutes ?? []}
          badgedRoutes={badgedRoutes ?? []}
        />
      </div>
    </div>
  );
}

export default Profile;
