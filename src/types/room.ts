export type TJoinRoomPayload = {
  username: string;
  roomId: string;
};

export type TCreateRoomPayload = {
  username: string;
  question: string;
  // roomId: string;
};

export type TUser = {
  username: string;
  hasAnswer: boolean;
  isHost: boolean;
};

export type TJoinRoomResult = {
  statusCode: number;
  data: TUser[];
};
