import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TJoinRoomPayload } from "../types/room";
import EnterRoomForm from "./EnterRoomForm";
import { useEffect, useState } from "react";
import Room from "./Room";
import { isRoomExists } from "../api/room";

// lobby connected with route /rooms/:roomId
function RoomLobby() {
  const { roomId } = useParams();
  const [username, setUsername] = useState<string>("");
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    // Let's check that room with that Id is already exist
    isRoomExists("" + roomId).then((roomExist) => {
      if (!roomExist) {
        navigate(`/404`, { state: { roomId: roomId } });
      }
    });

    const state: TJoinRoomPayload | null = location.state;
    if (state === null) return; // We used link and it's a guest
    setUsername(state.username); // Else username is already exists
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {username.length && roomId ? (
        <Room roomId={roomId} username={username} />
      ) : (
        <EnterRoomForm submitHandler={(data) => setUsername(data.username)} />
      )}
    </div>
  );
}

export default RoomLobby;
