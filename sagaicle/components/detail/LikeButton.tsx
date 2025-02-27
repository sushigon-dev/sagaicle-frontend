"use client";

import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { backendAPI } from "@/lib/api";
import IconButton from "@/components/common/IconButton";

type GetResponseData = {
  display_error_message: string;
  likes: number;
  liked: boolean;
};

type PostResponseData = {
  display_error_message: string;
  likes: number;
};

type DeleteResponseData = {
  display_error_message: string;
  likes: number;
};

interface LikeButtonProps {
  id: string;
}

function LikeButton({ id }: LikeButtonProps) {
  const [likes, setLikes] = useState<number | null>(null);
  const [liked, setLiked] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchLiked = async () => {
      const response = await fetch(backendAPI(`/api/user/likes/${id}`), {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: GetResponseData = await response.json();
      if (!response.ok) {
        console.error("Error:", data.display_error_message);
        return;
      }
      setLikes(data.likes);
      setLiked(data.liked);
    };
    fetchLiked();
  }, []);

  const handleLike = async () => {
    const response = await fetch(backendAPI(`/api/user/likes/${id}`), {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: PostResponseData = await response.json();
    if (!response.ok) {
      console.error("Error:", data.display_error_message);
      return;
    }
    setLikes((pre) => (pre === null ? null : pre + 1));
    setLiked((pre) => (pre === null ? null : true));
  };

  const handleLikeDelete = async () => {
    const response = await fetch(backendAPI(`/api/user/likes/${id}`), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("Error:", data.display_error_message);
      return;
    }
    setLikes((pre) => (pre === null ? null : pre - 1));
    setLiked((pre) => (pre === null ? null : false));
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
