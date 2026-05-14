import { ActorsType } from '@/types/movie'

export default function ActorsCard({ actor }: { actor: ActorsType }) {
  return (
    <div className="h-4/6 w-11/12">
      <img
        className="rounded-t-xl lg:h-50 w-full object-cover"
        src={actor.profile_path}
        alt={actor.name}
      />
      <p className="rounded-b-xl bg-black text-center text-lg font-bold text-white">{actor.name}</p>
      <p className="text-center text-sm text-[#efefef]">{actor.character}</p>
    </div>
  )
}
