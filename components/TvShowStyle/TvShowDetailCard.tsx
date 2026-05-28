"use client";

import { useState } from "react";
import { ActorsType } from "@/types/movie";
import { TvShowType } from "@/types/tv";
import { useTvShowDetails, useTvTrailer, useTvCredits } from "@/hooks/useTv";
import ActorsCard from "@/components/MovieStyle/ActorsCard";
import { Button, Card, Chip, Skeleton } from "@heroui/react";
import { CalendarDays, Layers, Star, Tv, X } from "lucide-react";

interface Props {
  showData: TvShowType;
  onClose: () => void;
}

export default function TvShowDetailCard({ showData, onClose }: Props) {
  const [showActors, setShowActors] = useState(false);

  const { data: details, isLoading: isDetailsLoading } = useTvShowDetails(showData.id);
  const { data: trailerKey, isLoading: isTrailerLoading } = useTvTrailer(showData.id);
  const { data: credits, isLoading: isCreditsLoading } = useTvCredits(showData.id);

  const actors = credits?.actors ?? [];
  const director = credits?.director ?? null;
  const firstAirYear = showData.first_air_date?.slice(0, 4) || "N/A";
  const score = Number(showData.vote_average.toFixed(1));
  const episodeRuntime = details?.episode_run_time?.[0];
  const runtimeLabel = episodeRuntime ? `${episodeRuntime} 分鐘 / 集` : "尚無資料";

  return (
    <Card
      className="show-card relative flex flex-col md:h-[90vh] h-auto max-w-[95vw] md:max-w-[90vw] lg:max-w-6xl w-full z-50 bg-[#2b2628] border border-[#4a4346] shadow-2xl md:overflow-y-scroll"
      onClick={(e) => e.stopPropagation()}
    >
      <Button
        isIconOnly
        size="sm"
        variant="ghost"
        onPress={onClose}
        aria-label="關閉"
        className="absolute top-3 right-3 md:top-4 md:right-4 z-10"
      >
        <X size={18} color="white" />
      </Button>

      <Card.Header className="p-3 sm:p-4 md:p-6 border-b border-[#454042] pr-12 md:pr-14">
        <div className="min-w-0">
          <Card.Title className="text-[#f4f1f2] text-lg sm:text-xl md:text-3xl">
            {showData.name}
          </Card.Title>
          <Card.Description className="text-[#b3a9ad] text-xs sm:text-sm truncate pt-1.5 sm:pt-2">
            {showData.original_name}
          </Card.Description>
        </div>
      </Card.Header>

      <Card.Content className="flex-1 min-h-0 p-3 sm:p-4 pt-0 pb-4 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-8">
          {/* 左欄：海報 + 資訊 */}
          <div className="lg:col-span-4 xl:col-span-3 pt-4 sm:pt-6 lg:pt-7">
            <Card className="bg-[#221f20] border border-[#3d383a] lg:sticky lg:top-4">
              <Card.Content className="p-3 sm:p-4">
                <img
                  className="rounded-xl w-full max-w-56 sm:max-w-72 lg:max-w-80 mx-auto object-cover"
                  src={showData.poster_path}
                  alt={showData.name}
                />
                <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-1">
                  <div className="grid gap-2 text-white">
                    <div className="flex items-center justify-between rounded-lg border border-[#393537] bg-[#1a1718] px-3 py-2">
                      <div className="flex items-center gap-2 text-[#c5bdc1] text-xs sm:text-sm">
                        <CalendarDays size={14} />
                        <span>首播年份</span>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-[#f5f2f3]">
                        {firstAirYear}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-[#393537] bg-[#1a1718] px-3 py-2">
                      <div className="flex items-center gap-2 text-[#c5bdc1] text-xs sm:text-sm">
                        <Tv size={14} />
                        <span>每集片長</span>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-[#f5f2f3]">
                        {runtimeLabel}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-[#393537] bg-[#1a1718] px-3 py-2">
                      <div className="flex items-center gap-2 text-[#c5bdc1] text-xs sm:text-sm">
                        <Layers size={14} />
                        <span>季數 / 集數</span>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-[#f5f2f3]">
                        {isDetailsLoading
                          ? "—"
                          : `${details?.number_of_seasons ?? "—"}季 / ${details?.number_of_episodes ?? "—"}集`}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-[#393537] bg-[#1a1718] px-3 py-2">
                      <div className="flex items-center gap-2 text-[#c5bdc1] text-xs sm:text-sm">
                        <Star size={14} />
                        <span>TMDB評分</span>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-[#f5f2f3]">
                        {score}
                      </span>
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>

          {/* 右欄：預告片 + 介紹 / 演員 */}
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col">
            <div className="flex items-center gap-2 px-1 sm:px-2 lg:ml-5">
              <Button
                size="sm"
                variant={showActors ? "secondary" : "primary"}
                onPress={() => setShowActors(false)}
                className="rounded-b-none flex-1 lg:flex-none"
              >
                介紹
              </Button>
              <Button
                size="sm"
                variant={showActors ? "primary" : "secondary"}
                onPress={() => setShowActors(true)}
                className="rounded-b-none flex-1 lg:flex-none"
              >
                演員
              </Button>
            </div>

            {!showActors ? (
              <div className="flex flex-col gap-3">
                <div className="rounded-xl overflow-hidden border border-[#3d383a] bg-[#1f1c1d] min-h-48 md:min-h-75 lg:min-h-96">
                  {trailerKey ? (
                    <iframe
                      className="video"
                      src={`https://www.youtube.com/embed/${trailerKey}`}
                      title="Trailer"
                      style={{ border: "none" }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : isTrailerLoading ? (
                    <div className="w-full h-full min-h-48 md:min-h-75 lg:min-h-96 p-4 md:p-6 grid gap-3 content-center">
                      <Skeleton className="rounded-xl h-8 w-2/5 opacity-50" />
                      <Skeleton className="rounded-xl h-10 w-full opacity-50" />
                      <Skeleton className="rounded-xl h-10 w-11/12 opacity-50" />
                    </div>
                  ) : (
                    <div className="w-full h-full min-h-48 md:min-h-75 lg:min-h-96 flex items-center justify-center text-[#9f9599] text-sm">
                      目前無預告片
                    </div>
                  )}
                </div>

                <Card className="bg-[#221f20] border border-[#3d383a]">
                  <Card.Content className="p-4 lg:p-5">
                    {isDetailsLoading ? (
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Skeleton className="h-6 w-16 rounded-full" />
                          <Skeleton className="h-6 w-20 rounded-full" />
                          <Skeleton className="h-6 w-14 rounded-full" />
                        </div>
                        <Skeleton className="h-4 w-40 rounded-md" />
                        <Skeleton className="h-4 w-full rounded-md" />
                        <Skeleton className="h-4 w-4/5 rounded-md" />
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {details?.genres?.map((genre) => (
                            <Chip key={genre.id} size="sm" variant="soft">
                              {genre.name}
                            </Chip>
                          ))}
                        </div>
                        <p className="text-[#f4f1f2] text-sm mb-2">
                          首播日期：{showData.first_air_date}
                        </p>
                        <p className="text-[#ded8da] leading-relaxed text-sm md:text-base">
                          {showData.overview}
                        </p>
                      </>
                    )}
                  </Card.Content>
                </Card>
              </div>
            ) : (
              <Card className="bg-[#221f20] border border-[#3d383a]">
                <Card.Content className="p-4 lg:p-5">
                  <p className="text-[#f4f1f2] text-xl font-semibold mb-4">主要演員</p>
                  {isCreditsLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-4">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-20 rounded-xl" />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-4">
                      {actors.map((actor: ActorsType) => (
                        <ActorsCard key={actor.id} actor={actor} />
                      ))}
                    </div>
                  )}
                </Card.Content>
              </Card>
            )}
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
