import { SubmitHandler, useForm } from "react-hook-form";

type TEnterRoomInputs = {
  username: string;
};

type EnterRoomProps = {
  submitHandler: SubmitHandler<TEnterRoomInputs>;
};

function EnterRoomForm({ submitHandler }: EnterRoomProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TEnterRoomInputs>();

  return (
    <div className="border border-black w-96 mx-auto">
      <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col">
        <input
          className="m-1 p-1 border border-black"
          placeholder="Input your Username"
          {...register("username", { required: true })}
        />
        {errors.username && <span>This field is required</span>}

        <input
          className="m-1 p-1 border border-black"
          type="submit"
          value="Enter Room"
        />
      </form>
    </div>
  );
}

export default EnterRoomForm;
