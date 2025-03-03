"use client";

import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import IconButton from "@/components/common/IconButton";
import * as api from "@/api/services";

interface LikeButtonProps {
  id: string;
}

function LikeButton({ id }: LikeButtonProps) {
  const [likes, setLikes] = useState<number | null>(null);
  const [liked, setLiked] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const result = await api.isLiked({ routeId: id });
        setLikes(result.likes);
        setLiked(result.is_liked);
      } catch (error) {
        setLikes(null);
        setLiked(null);
      }
    };
    fetchLikes();
  }, []);

  const handleLike = async () => {
    try {
      const result = await api.like({ routeId: id });
      setLikes(() => result.likes);
      setLiked(() => true);
    } catch (error) {}
  };

  const handleLikeDelete = async () => {
    try {
      const result = await api.dislike({ routeId: id });
      setLikes(() => result.likes);
      setLiked(() => false);
    } catch (error) {}
  };

  return (
    <IconButton
      icon={liked ? FaHeart : FaRegHeart}
      text={String(likes ?? "----") + " いいね"}
      onClick={() => {
        switch (liked) {
          case true:
            handleLikeDelete();
            break;
          case false:
            handleLike();
            break;
          default:
            break;
        }
      }}
      className="bg-red-500"
    />
  );
}

export default LikeButton;
