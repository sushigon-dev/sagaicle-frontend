"use client";
import React, { useState } from 'react';

interface DetailProps {
  title: string;
  description: string;
  distance_km: number;
  estimated_time: number;
  tags: string[];
  likes: number;
  image_url: string;
  headerImages: string[];
  map_url: string;
  attractions: string[];
  detailed_impressions: string;
  highlights?: string;
}

function Detail({
  title,
  description,
  distance_km,
  estimated_time,
  tags,
  likes,
  image_url,
  headerImages,
  map_url,
  attractions,
  detailed_impressions,
  highlights,
}: DetailProps) {
  const [currentHeaderIndex, setCurrentHeaderIndex] = useState(0);
  const [likeClicked, setLikeClicked] = useState(false);

  const prevImage = () => {
    setCurrentHeaderIndex((prev) =>
      prev === 0 ? headerImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentHeaderIndex((prev) =>
      prev === headerImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleLike = () => {
    setLikeClicked(true);
    setTimeout(() => setLikeClicked(false), 300);
  };

  return (
    <div className="min-h-screen bg-[#f1e2be]">
      {/* ヒーローセクション：切り替え可能な画像 */}
      <section className="relative h-[80vh]">
        <img
          src={headerImages[currentHeaderIndex]}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center px-4">
          {headerImages.length > 1 && (
            <>
              <button
                aria-label="前の画像"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
                onClick={prevImage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                aria-label="次の画像"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
                onClick={nextImage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </section>

      {/* タイトル＆基本情報セクション */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl font-extrabold text-[#47763c] drop-shadow-lg">{title}</h1>
          <div className="mt-6 flex justify-center space-x-12">
            <div className="flex items-center text-xl text-[#47763c]">
              <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>{distance_km} km</span>
            </div>
            <div className="flex items-center text-xl text-[#47763c]">
              <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
              </svg>
              <span>{estimated_time} 分</span>
            </div>
          </div>
        </div>
      </section>

      {/* メインコンテンツ：マップと詳細情報 */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 左側：大きなマップコンテンツ */}
          <div className="p-10 flex justify-center items-center">
            <div className="relative w-full max-w-[800px] overflow-hidden rounded-xl shadow-xl transition-transform duration-200 hover:scale-105">
              {/* マップカードの背景グラデーション */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 opacity-70"></div>
              {/* マップタイトルオーバーレイ */}
              <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-40 px-4 py-2 flex items-center space-x-2">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 00-8 8 8 8 0 0016 0 8 8 0 00-8-8zm1 11H9v-2H7v-2h2V7h2v2h2v2h-2v2z" />
                </svg>
                <span className="text-white text-lg font-semibold">コースマップ</span>
              </div>
              <iframe
                src={map_url}
                className="w-full h-[800px] border-0 rounded-xl relative"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="コースマップ"
              ></iframe>
            </div>
          </div>
          {/* 右側：テキスト情報、タグ、いいね、寄り道スポットなど */}
          <div className="space-y-8 p-10">
            {highlights && (
              <div>
                <h2 className="text-3xl font-bold mb-4 text-[#47763c]">おすすめポイント</h2>
                <p className="text-lg text-gray-800 leading-relaxed">{highlights}</p>
              </div>
            )}
            <div>
              <h2 className="text-3xl font-bold mb-4 text-[#47763c]">概要</h2>
              <p className="text-lg text-gray-800 leading-relaxed">{description}</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4 text-[#47763c]">詳細な感想</h2>
              <p className="text-lg text-gray-800 leading-relaxed">{detailed_impressions}</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4 text-[#47763c]">寄り道スポット・イベント</h2>
              {attractions.length > 0 ? (
                <div className="flex flex-col items-center">
                  {attractions.map((spot, index) => (
                    <React.Fragment key={index}>
                      <div className="w-full max-w-md p-4 rounded-lg shadow-md border border-[#c1994d] bg-white">
                        <p className="text-lg text-gray-900 text-center">{spot}</p>
                      </div>
                      {index < attractions.length - 1 && (
                        <div className="my-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="#94c674">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">寄り道スポットはありません。</p>
              )}
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-[#47763c]">タグ</h2>
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag, index) => (
                    <span key={index} className="px-4 py-2 rounded-full text-lg bg-[#c1994d] text-white">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={handleLike}
                className={`flex items-center justify-center px-8 py-4 rounded-lg transition-transform duration-200 text-2xl bg-[#47763c] text-white focus:outline-none focus:ring-2 focus:ring-[#47763c] ${
                  likeClicked ? 'scale-110' : ''
                }`}
                aria-label="いいね"
              >
                <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.656l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
                {likes} いいね
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


export default Detail;
