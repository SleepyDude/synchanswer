import { TCreateRoomPayload, TJoinRoomPayload } from "../types/room";
import { SERVERHOST } from "./constants";

export async function joinRoom(payload: TJoinRoomPayload) {
    const response: Response = await fetch(
        `${SERVERHOST}/rooms/join`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    )

    return response;
}

export async function createRoom(payload: TCreateRoomPayload) {
    const response: Response = await fetch(
        `${SERVERHOST}/rooms`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    )

    return response;
}