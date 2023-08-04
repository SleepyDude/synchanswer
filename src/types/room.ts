export type TJoinRoomPayload = {
    username: string;
    roomId: string;
}

export type TCreateRoomPayload = {
    username: string;
    question: string;
    roomId: string;
}

export type TJoinRoomResult = {
    username: string;
    hasAnswer: boolean;
    isHost: boolean;
}[]