import { TextInput , PasswordInput } from '../StyleComponents'
import { useForm , } from 'react-hook-form'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import Cookie from 'js-cookie'
import {useCookies} from 'react-cookie'
import { useLoginContext } from '../Context/loginContext'

export function LoginForm()
{
    // const [cookie, setCookie] = useCookies(["token"])
    const navigate = useNavigate()
 
    const {register , handleSubmit , setError ,getValues, formState:{ errors , isSubmitting}} = useForm()
    const {loginState,setLoginState} = useLoginContext()

    const submitHandler=async()=>{
        const values= getValues()
     
        try{
            const response = await axios.post('http://localhost:3000/auth/login',values,{
                withCredentials:true
            })  
            const {token} = response.data.user
        
            localStorage.setItem('token',token)
            setLoginState(true)
            navigate('/')
          
        }catch(err)
        {
            console.log("Error: ",err)
            setError('root',{message : err.response.data.message})
        }
    }
    
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
        },
    }
    return(
        <>
        <form onSubmit={handleSubmit(submitHandler)}>
            <TextInput label="Email" placeholder="Enter Email" classname="my-4" registerDetails={{register,registerFor:"email",validation:validation.email}}/>
            {errors.email && <div className='text-red-500 txt-sm'>{errors.email.message}</div>}

            <PasswordInput label="Password" placeholder="Enter Password" classname="my-4" registerDetails={{register,registerFor:"password",validation:validation.password}}/>
            {errors.password && <div className='text-red-500 txt-sm'>{errors.password.message}</div>}
            
            {errors.root && <div className='text-red-500 txt-sm'>{errors.root.message}</div>}

            <div className='w-full py-4 flex items-center justify-center' >
                <button disabled={isSubmitting} className='font-semibold py-2 px-6 bg-green-500 rounded-full mt-2'>{isSubmitting ? "Loading...":"LOG IN"}</button>
            </div>
        </form>
        </>
    )
}