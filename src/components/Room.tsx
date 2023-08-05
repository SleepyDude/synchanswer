import { useEffect, useState } from "react";
import { joinRoom, leaveRoom } from "../api/room";
import { TUser } from "../types/room";
import Pusher from "pusher-js";

type TRoomProps = {
  roomId: string;
  username: string;
};

function Room(props: TRoomProps) {
  const [users, setUsers] = useState<TUser[]>([]);

  useEffect(() => {
    joinRoom(props).then((users) => {
      console.log(users);
      setUsers(users);
    });

    // console.log(`pusher_app_id: ${process.env.PUSHER_APP_ID}`);
    // console.log(`pusher_cluster: ${process.env.PUSHER_CLUSTER}`);

    // const pusher = new Pusher("" + process.env.PUSHER_APP_ID, {
    //   cluster: process.env.PUSHER_CLUSTER || "eu",
    // });

    // const roomChannel = pusher.subscribe("rooms");

    // roomChannel.bind(props.roomId, (data: string) => {
    //   console.log(`data from room channel: ${data}`);
    // });

    // pusher.connection.bind("connected", function () {
    //   console.log("connected");
    // });

    // pusher.connection.bind(
    //   "state_change",
    //   function (states: { previous: string; current: string }) {
    //     console.log(
    //       `state change from ${states.previous} to ${states.current}`,
    //     );
    //   },
    // );

    return () => {
      // pusher.unbind_all();
      // pusher.unsubscribe("rooms");
      leaveRoom(props).then(() => console.log("Leave room finished"));
    };
  }, []);

  return (
    <div>
      <h1>Room: {props.roomId}</h1>
      <h1>User: {props.username}</h1>
      {/* <p>{JSON.stringify(users)}</p> */}
      <ol>
        {users.map((user) => (
          <li key={user.username}>{JSON.stringify(user)}</li>
        ))}
      </ol>
    </div>
  );
}

export default Room;
