import { TagsList } from '@/components/taglist'
import { getRoomInfoById } from '@/lib/actions'
import { splitTags } from '@/lib/utils'
import { GithubIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { DevFinderVideo } from './videoplayer'

async function Roompage(roomInfo: { params: { roomId: string } }) {
    const roomInfoById = await getRoomInfoById(roomInfo.params.roomId)

    if (!roomInfoById) {
        return <div>No room of this ID found</div>;
    }

    const relatedTags = splitTags(roomInfoById.tags);

    return (
        <div className="grid grid-cols-4 min-h-screen">
            <div className="col-span-3 p-4 pr-2">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 min-h-screen">
                    <DevFinderVideo roomInfo={roomInfoById} />
                </div>
            </div>

            <div className="col-span-1 p-4 pl-2">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
                    <h1 className="text-base">{roomInfoById?.name}</h1>

                    {roomInfoById?.githubRepo && (
                        <Link
                            href={roomInfoById.githubRepo}
                            className="flex items-center gap-2 text-center text-sm hover:text-[#db4a2b]"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GithubIcon />
                            Github Project
                        </Link>
                    )}

                    <p className="text-base text-gray-600">{roomInfoById?.description}</p>

                    <TagsList tags={relatedTags} />

                </div>
            </div>
        </div>
    )
}

export default Roompage