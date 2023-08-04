import { useForm, SubmitHandler } from 'react-hook-form';

export type EnterFormInputs = {
    username: string,
    roomId: string,
}

type EnterFormProps = {
    submitHandler: SubmitHandler<EnterFormInputs>;
}

function EnterForm({submitHandler}: EnterFormProps) {
    const {register, handleSubmit, formState: {errors}} = useForm<EnterFormInputs>();

    return (
        <div className='border border-black w-96 mx-auto'>
            <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col'>
                <input className='m-1 p-1 border border-black' placeholder='Input your Username' {...register("username", {required: true})} />
                {errors.username && <span>This field is required</span>}
                <input className='m-1 p-1 border border-black' placeholder='Input roomId if you have invite (Optional)' {...register("roomId")}/>
                
                <input className='m-1 p-1 border border-black' type="submit" value="Create Room" />
                
            </form>
        </div>
    )
}

export default EnterForm
