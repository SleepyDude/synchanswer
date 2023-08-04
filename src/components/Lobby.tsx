import { useState } from "react"
import EnterForm, { EnterFormInputs } from "./EnterForm"
import RoomCreationForm, { RoomCreationInputs } from "./RoomCreation";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../api/room";
import { TCreateRoomPayload } from "../types/room";

function Lobby() {
    const [isRoomCreation, setIsRoomCreation] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [roomId, setRoomId] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');
    const navigate = useNavigate();

    console.log(`render Lobby with username: ${username} and roomId: ${roomId}`);

    const onSumbitEnterForm: SubmitHandler<EnterFormInputs> = data => {
        setUsername(data.username);
        setRoomId(data.roomId);
        setIsRoomCreation(true);
        // navigate(`/rooms/${data.roomId}`, {state: roomState});
    }

    const onSumbitCreateRoomForm: SubmitHandler<RoomCreationInputs> = async (data) => {
        console.log(data.question);

        const roomState: TCreateRoomPayload = {
            roomId: roomId,
            username: username,
            question: data.question,
        }

        // TODO: отправка на сервер запроса для создания комнаты с данными параметрами.
        const response = await createRoom(roomState);
        if (response.status !== 200) {
            const json: { error: string, statusCode: number } = await response.json();
            setErrorMsg(json.error);
            setIsRoomCreation(false);
            return;
        }
        const json: { data: {roomId: string} } = await response.json();
        console.log(`json: ${JSON.stringify(json)}`);
        roomState.roomId = json.data.roomId;

        // successfull room creation. Let's load room component
        navigate(`/rooms/${json.data.roomId}`, { state: roomState });
    }

    return (
        <div>
            <h2 className="text-red-600 mb-3">{errorMsg}</h2>
            { !isRoomCreation ?
                <EnterForm submitHandler={onSumbitEnterForm} />
            :
                <RoomCreationForm submitHandler={onSumbitCreateRoomForm} />
            }
        </div>
    )
}

export default Lobby
