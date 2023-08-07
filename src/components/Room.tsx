import { useEffect, useState } from "react";
import { joinRoom, leaveRoom } from "../api/room";
import { TUser } from "../types/room";
import Pusher from "pusher-js";
import { SERVERHOST } from "../api/constants";

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

    console.log(`pusher_app_id: ${JSON.stringify(import.meta.env)}`);
    // console.log(`pusher_cluster: ${process.env.PUSHER_CLUSTER}`);

    const pusher = new Pusher("" + import.meta.env.VITE_PUSHER_APP_KEY, {
      cluster: import.meta.env.PUSHER_CLUSTER || "eu",
      forceTLS: true,
      userAuthentication: {
        endpoint: `${SERVERHOST}/pusher/user-auth`,
        transport: "ajax",
        params: {
          roomId: props.roomId,
        },
      },
      // channelAuthorization: {
      //   endpoint: `${SERVERHOST}/pusher/user-auth`,
      //   transport: "ajax",
      // },
    });

    // const watchlistEventHandler = (event: {
    //   user_ids: unknown;
    //   name: unknown;
    // }) => {
    //   console.log(`watchlistEvent: ${JSON.stringify(event)}`);
    // };
    // pusher.user.watchlist.bind("online", watchlistEventHandler);
    // pusher.user.watchlist.bind("offline", watchlistEventHandler);

    pusher.subscribe("rooms");
    pusher.signin();

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
      leaveRoom(props).then(() => console.log("Leave room finished"));
      // pusher.unbind_all();
      pusher.unsubscribe("rooms");
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
