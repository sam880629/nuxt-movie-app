"use client";

import { useState } from "react";
import { MovieType, ActorsType } from "@/types/movie";
import {
  useMovieDetails,
  useMovieTrailer,
  useMovieCredits,
} from "@/hooks/useMovies";
import ActorsCard from "./ActorsCard";
import { Button, Card, Chip, Skeleton } from "@heroui/react";
import { CalendarDays, Clock3, Star, X } from "lucide-react";

interface Props {
  movieData: MovieType;
  onClose: () => void;
}

export default function ShowCard({ movieData, onClose: _onClose }: Props) {
  const [showActors, setShowActors] = useState(false);

  const { data: details, isLoading: isDetailsLoading } = useMovieDetails(
    movieData.id,
  );
  const { data: trailerKey, isLoading: isTrailerLoading } = useMovieTrailer(
    movieData.id,
  );
  const { data: credits, isLoading: isCreditsLoading } = useMovieCredits(
    movieData.id,
  );

  const actors = credits?.actors ?? [];
  const director = credits?.director ?? null;
  const releaseYear = movieData.release_date?.slice(0, 4) || "N/A";
  const runtimeLabel = details?.runtime
    ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`
    : "尚無資料";
  const score = Number(movieData.vote_average.toFixed(1));

  return (
    <Card
      className="show-card relative flex flex-col  md:h-[90vh]  h-auto max-w-[95vw] md:max-w-[90vw] lg:max-w-6xl w-full z-50 bg-[#2b2628] border border-[#4a4346] shadow-2xl md:overflow-y-scroll "
      onClick={(e) => e.stopPropagation()}
    >
      <Button
        isIconOnly
        size="sm"
        variant="ghost"
        onPress={_onClose}
        aria-label="關閉"
        className="absolute top-3 right-3 md:top-4 md:right-4 z-10"
      >
        <X size={18} color="white" />
      </Button>

      <Card.Header className="p-3 sm:p-4 md:p-6 border-b border-[#454042] pr-12 md:pr-14">
        <div className="min-w-0">
          <Card.Title className="text-[#f4f1f2] text-lg sm:text-xl md:text-3xl">
            {movieData.title}
          </Card.Title>
          <Card.Description className="text-[#b3a9ad] text-xs sm:text-sm truncate pt-1.5 sm:pt-2">
            {movieData.original_title}
          </Card.Description>
        </div>
      </Card.Header>

      <Card.Content className="flex-1 min-h-0 p-3 sm:p-4 pt-0 pb-4 overflow-y-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-8">
          <div className="lg:col-span-4 xl:col-span-3 pt-4 sm:pt-6 lg:pt-7">
            <Card className="bg-[#221f20] border border-[#3d383a] lg:sticky lg:top-4">
              <Card.Content className="p-3 sm:p-4">
                {/* 劇照 */}
                <img
                  className="rounded-xl w-full max-w-56 sm:max-w-72 lg:max-w-80 mx-auto object-cover"
                  src={movieData.poster_path}
                  alt={movieData.title}
                />
                {/* 電影資訊 + 導演（手機左右、桌機上下） */}
                <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-1">
                  <div className="grid gap-2 text-white">
                    <div className="flex items-center justify-between rounded-lg border border-[#393537] bg-[#1a1718] px-3 py-2">
                      <div className="flex items-center gap-2 text-[#c5bdc1] text-xs sm:text-sm">
                        <CalendarDays size={14} />
                        <span>上映年份</span>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-[#f5f2f3]">
                        {releaseYear}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-[#393537] bg-[#1a1718] px-3 py-2">
                      <div className="flex items-center gap-2 text-[#c5bdc1] text-xs sm:text-sm">
                        <Clock3 size={14} />
                        <span>片長</span>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-[#f5f2f3]">
                        {runtimeLabel}
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

                  <div>
                    {!isCreditsLoading && director && (
                      <Card className="bg-[#181516] border border-[#312d2f] h-full">
                        <Card.Content className="p-2 sm:p-3 h-full">
                          <div className="relative overflow-hidden rounded-lg border border-[#393537] bg-[#111] h-32 sm:h-44 lg:h-44">
                            <img
                              className="h-full w-full object-cover"
                              src={director.profile_path}
                              alt={director.name}
                            />
                            <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-2 left-3 right-3 min-w-0">
                              <p className="text-[#c6bec1] text-[11px] uppercase tracking-[0.18em]">
                                Director
                              </p>
                              <p className="text-[#f5f2f3] text-sm font-semibold truncate">
                                {director.name}
                              </p>
                            </div>
                          </div>
                        </Card.Content>
                      </Card>
                    )}

                    {isCreditsLoading && (
                      <Card className="bg-[#181516] border border-[#312d2f] h-full">
                        <Card.Content className="p-2 sm:p-3 h-full">
                          <Skeleton className="rounded-lg h-32 sm:h-44 lg:h-44 w-full" />
                        </Card.Content>
                      </Card>
                    )}
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>

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
                      <Skeleton className="rounded-xl h-10 w-10/12 opacity-50" />
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
                          上映日期：{movieData.release_date}
                        </p>
                        <p className="text-[#ded8da] leading-relaxed text-sm md:text-base">
                          {movieData.overview}
                        </p>
                      </>
                    )}
                  </Card.Content>
                </Card>
              </div>
            ) : (
              <Card className="bg-[#221f20] border border-[#3d383a]">
                <Card.Content className="p-4 lg:p-5">
                  <p className="text-[#f4f1f2] text-xl font-semibold mb-4">
                    主要演員
                  </p>
                  {isCreditsLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-4">
                      {Array.from({ length: 8 }).map((_, index) => (
                        <Skeleton key={index} className="h-20 rounded-xl" />
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
