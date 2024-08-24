import { EditRoomForm } from "@/components/create-edit-room-form"
import { getRoomInfoById } from "@/lib/actions";
import { useParams } from "next/navigation";

async function EditRoomPage(roomInfo: { params: { roomId: string } }) {

    // const params = useParams();

    const roomInfoById = await getRoomInfoById(roomInfo.params.roomId);

    if (!roomInfoById) {
        return <div>No room of this ID found</div>;
    }

    return (
        <div className="container mx-auto flex flex-col gap-8 pt-12 pb-24">
            <h1 className="text-4xl font-bold">Edit Room</h1>

            <EditRoomForm roomInfo={roomInfoById} />
        </div>
    )
}

export default EditRoomPage