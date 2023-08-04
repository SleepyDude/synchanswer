import { useParams, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { joinRoom } from '../api/room';
import { TJoinRoomPayload, TJoinRoomResult } from '../types/room';

function Room() {
    const { roomId } = useParams();
    const location = useLocation();
    const state: TJoinRoomPayload = location.state;
    const [users, setUsers] = useState<TJoinRoomResult>([]);

    useEffect(() => {
        
        joinRoom(state).then((resp) => {
            resp.json().then((result: TJoinRoomResult) => {
                setUsers(() => result);
            })
        })
        
        // const pusher = new Pusher (
        //     '' + process.env.PUSHER_APP_ID,
        //     {
        //         cluster: process.env.PUSHER_CLUSTER || 'eu',
        //     }
        // );

        // const roomChannel = pusher.subscribe('rooms');

        // roomChannel.bind(roomId, onRoomMessage);

        // return (() => {
		// 	pusher.unsubscribe(roomId)
		// })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <h1>Room {roomId}</h1>
            <h1>State {JSON.stringify(state)}</h1>
            <ol>
            {
                users.map(user => 
                    <li>{JSON.stringify(user)}</li> 
                )
            }
            </ol>
            
        </div>
    )
}

export default Room
