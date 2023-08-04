import { SubmitHandler, useForm } from 'react-hook-form';

export type RoomCreationInputs = {
    question: string,
}

type RoomCreationProps = {
    submitHandler: SubmitHandler<RoomCreationInputs>;
}

function RoomCreationForm({submitHandler}: RoomCreationProps) {
    
    const {register, handleSubmit, formState: {errors}} = useForm<RoomCreationInputs>();
    // const navigate = useNavigate();
    // const onSubmit: SubmitHandler<Inputs> = data => {
    //     console.log(`click, data: ${JSON.stringify(data)}`);
    //     const roomState: TRoomState = {username: data.username};
    //     navigate(`/rooms/${data.roomId}`, {state: roomState});
    // }

    return (
        <div className='border border-black w-96 mx-auto'>
            <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col'>
                <input className='m-1 p-1 border border-black' 
                    placeholder='Input your Question' {...register("question", {required: true})} />
                {errors.question && <span>This field is required</span>}
                
                <input className='m-1 p-1 border border-black' type="submit" />
                
            </form>
        </div>
    )
}

export default RoomCreationForm
