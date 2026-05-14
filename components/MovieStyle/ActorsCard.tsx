import { ActorsType } from '@/types/movie'
import { Avatar, Card } from '@heroui/react'

export default function ActorsCard({ actor }: { actor: ActorsType }) {
  return (
    <Card className="bg-[#221f20] border border-[#3d383a]">
      <Card.Content className="p-4 flex items-center gap-3">
        <Avatar className="size-16 shrink-0">
          <Avatar.Image className="h-full w-full object-cover" src={actor.profile_path} alt={actor.name} />
          <Avatar.Fallback>{actor.name.slice(0, 1)}</Avatar.Fallback>
        </Avatar>
        <div className="min-w-0">
          <p className="text-[#f4f1f2] text-base font-semibold truncate">{actor.name}</p>
          <p className="text-[#b3a9ad] text-sm truncate">{actor.character}</p>
        </div>
      </Card.Content>
    </Card>
  )
}
