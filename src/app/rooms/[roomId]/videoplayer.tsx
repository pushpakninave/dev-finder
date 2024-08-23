"use client";

import {
    Call,
    CallControls,
    CallParticipantsList,
    SpeakerLayout,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
    User,
} from '@stream-io/video-react-sdk';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Room } from '@/db/schema';
import { generateTokenForVideo } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import "@stream-io/video-react-sdk/dist/css/styles.css";

const token = 'authentication-token';

export function DevFinderVideo({ roomInfo }: { roomInfo: Room }) {

    const router = useRouter();
    const session = useSession();
    const [client, setClient] = useState<StreamVideoClient | null>(null);
    const [call, setCall] = useState<Call | null>(null);

    const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;

    useEffect(() => {

        if (!roomInfo) {
            return;
        }
        if (!session.data) {
            return;
        }

        const userId = session.data?.user.id;
        const client = new StreamVideoClient({
            apiKey,
            user: {
                id: userId,
                name: session.data.user.name ?? undefined,
                image: session.data.user.image ?? undefined,
            },
            tokenProvider: () => generateTokenForVideo()
        });
        const call = client.call('default', roomInfo.id);
        call.join({ create: true });
        setCall(call);
        setClient(client);

        return () => {
            call
                .leave()
                .then(() => client.disconnectUser())
                .catch(console.error)
        };
    }, [session, roomInfo])


    return (
        client &&
        call && (
            <StreamVideo client={client}>
                <StreamTheme>
                    <StreamCall call={call}>
                        <SpeakerLayout />
                        <CallControls/>
                        <CallParticipantsList onClose={() => undefined} />
                    </StreamCall>
                </StreamTheme>
            </StreamVideo>
        )
    );
};