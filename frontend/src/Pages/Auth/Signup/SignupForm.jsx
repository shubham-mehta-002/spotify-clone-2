import { TextInput , PasswordInput } from '../../../Components'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export function SignupForm()
{
    const navigate = useNavigate()
    const {register , handleSubmit, setError ,getValues ,watch ,formState :{ errors ,isSubmitting} }= useForm() 

    const submitHandler = async () => {
        try{
            const values=getValues()
         
            const response = await axios.post('http://localhost:3000/auth/register',values)
           if(response.data.success === true)
            navigate('/login')

        }catch(err)
        {
            // console.log(err.response.data)
            setError('root',{message : err.response.data.message})
        }
    };
    
    const validation={
        email:{
            required:"Email is required",
            pattern:{
                value:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message:"Invalid email format"
            }
        },
        password:{
            required:"Password is required",
            validate:(value)=>{
                if(!(/[A-Z]/.test(value)))
                    return "Must include atleast one Uppercase letter"
                if(!(/[a-z]/.test(value)))
                    return "Must include atleast one Lower letter"
                if(!(/[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]/.test(value)))
                    return "Must include atleast one special character"
                if(value.length<8)
                    return "Min length should be 8"
                return true
            }
        },
        recheckPassword:{
            required:"Enter password again",
            validate: (value) => {
                const password = watch('password'); // Get the value of the password field
               
                if (password !== value) {
                    return "Passwords do not match";
                }
                return true;
            },
        },
        firstName:{
            required:"Firstname is required",
            pattern:{
                value:/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/,
                message:"Invalid format"
            }
        },
        lastName:{
            pattern:{
                value:/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/,
                message:"Invalid format"
            }
        },
        username:{
            required:"Username is requried ",
        }
        
    }
    

    return(
        <>
        <form onSubmit={handleSubmit(submitHandler)}>
            <TextInput registerDetails={{register , registerFor:"email" ,validation:validation.email}} label="What's your email?" placeholder="Enter your email." classname="my-3"   />
            {errors.email && <div className='text-sm text-red-500'>{errors.email.message}</div>}

            <PasswordInput registerDetails={{register , registerFor:"password" , validation:validation.password}} label="Create a password" placeholder="Create a password" classname="my-3"  />
            {errors.password && <div className='text-sm text-red-500'>{errors.password.message}</div>}

           
            <PasswordInput  attributes={{onPaste:(e)=>e.preventDefault() }} registerDetails={{register , registerFor:"recheckPassword" , validation:validation.recheckPassword}} label="Confirm your password" placeholder="Re-enter password" classname="my-3"  />
            {errors.recheckPassword && <div className='text-sm text-red-500'>{errors.recheckPassword.message}</div>}

            <div className='w-full flex flex-row  space-x-8'>
                <div>
                <TextInput registerDetails={{register , registerFor:"firstName", validation:validation.firstName}} label="Enter First Name" placeholder="Enter your first name" classname="mt-3 mb-0  " />
                {errors.firstName && <div className='text-sm text-red-500'>{errors.firstName.message}</div>}
                </div>

                <div>
                <TextInput registerDetails={{register , registerFor:"lastName", validation:validation.lastName}} label="Enter Last Name" placeholder="Enter your last name" classname="mt-3 mb-0 " />
                {errors.lastName && <div className='text-sm text-red-500'>{errors.lastName.message}</div>}
                </div>

            </div>
            <TextInput registerDetails={{register , registerFor:"username" , validation:validation.username}} label="What should we call you?" placeholder="Enter username" classname="mt-3 mb-0 " />
            {errors.username && <div className='text-sm text-red-500'>{errors.username.message}</div>}

            <div className='w-full mb-1 justify-start'>This appears on your profile</div>
            {errors.root && <div className='text-sm text-red-500'>{errors.root.message}</div>}

            <div className='w-full py-4 flex items-center justify-center' >
                <button disabled={isSubmitting} type="submit" className='font-semibold py-2 px-6 bg-green-500 rounded-full mt-2'>{isSubmitting ? "Loading..." : "SIGN UP"}</button>
            </div>
        </form>
        </>
    )
}