'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { cn } from '@/lib/utils';
import { Badge, badgeVariants } from './ui/badge';

export function TagsList({ tags }: { tags: string[] }) {
    const router = useRouter();
    return (
        <div className='flex gap-2 flex-wrap'>
            {
                tags.map((tag) => (
                    <Badge
                        className={cn(badgeVariants())}
                        key={tag}
                        onClick={() => {
                            router.push(`browse/?query=${tag}`);
                        }}
                    >
                        {tag}
                    </Badge>
                ))
            }
        </div>
    )
}

