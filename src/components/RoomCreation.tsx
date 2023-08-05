import { SubmitHandler, useForm } from "react-hook-form";
import { TCreateRoomPayload } from "../types/room";
import { createRoom } from "../api/room";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// type RoomCreationProps = {
//   submitHandler: SubmitHandler<RoomCreationInputs>;
// };

function RoomCreationForm() {
  const [errorMsg, setErrorMsg] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateRoomPayload>();

  const navigate = useNavigate();

  const submitHandler: SubmitHandler<TCreateRoomPayload> = async (data) => {
    const response = await createRoom(data);

    if (response.status !== 200) {
      const json: { error: string; statusCode: number } = await response.json();
      setErrorMsg(json.error);
      return;
    }

    const json: { data: { roomId: string } } = await response.json();
    console.log(`json: ${JSON.stringify(json)}`);

    // successfull room creation. Let's load room component
    navigate(`/rooms/${json.data.roomId}`, { state: data });
  };

  return (
    <div className="border border-black w-96 mx-auto">
      <p className="mb-2 text-red-600">{errorMsg}</p>
      <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col">
        <input
          className="m-1 p-1 border border-black"
          placeholder="Input your Username"
          {...register("username", { required: true })}
        />
        {errors.username && <span>This field is required</span>}
        <input
          className="m-1 p-1 border border-black"
          placeholder="Input Question"
          {...register("question", { required: true })}
        />
        {errors.question && <span>This field is required</span>}

        <input
          className="m-1 p-1 border border-black"
          type="submit"
          value="Create Room"
        />
      </form>
    </div>
  );
}

export default RoomCreationForm;
