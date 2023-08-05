import {
  TCreateRoomPayload,
  TJoinRoomPayload,
  TJoinRoomResult,
} from "../types/room";
import { SERVERHOST } from "./constants";

export async function joinRoom(payload: TJoinRoomPayload) {
  const response: Response = await fetch(`${SERVERHOST}/rooms/join`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const joinRoomResult: TJoinRoomResult = await response.json();

  return joinRoomResult.data;
}

export async function leaveRoom(payload: TJoinRoomPayload): Promise<void> {
  console.log("leaving room start");
  await fetch(`${SERVERHOST}/rooms/leave`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  console.log("leaving room end");
}

export async function createRoom(payload: TCreateRoomPayload) {
  const response: Response = await fetch(`${SERVERHOST}/rooms`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response;
}

export async function isRoomExists(roomId: string): Promise<boolean> {
  const response: Response = await fetch(`${SERVERHOST}/rooms/check/${roomId}`);

  return response.status === 200;
}
