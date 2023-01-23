import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../hooks/useToken';

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {createUser, updateUser} = useContext(AuthContext);
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();
    if(token){
        navigate('/');
    }
    const handleSignup = data => {
        console.log(data);
        createUser(data.email, data.password)
        .then(result => {
            toast("User Created Sucessfully")
            const userInfo = {
                displayName: data.name
            }
            updateUser(userInfo)
            .then(() => {
                saveUser(data.name, data.email);
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    }

    const saveUser = (name, email) => {
        const user = {name, email}
        fetch('https://doctors-portal-server-lyart-iota.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json)
        .then(data => {
            setCreatedUserEmail(email)
        })
    }
    return (
        <div className='flex justify-center items-center'>
            <div className='w-full m-3 md:w-1/2 lg:w-1/3'>
                <h2 className='text-2xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignup)}>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input type='text' {...register("name", { required: "Name is required" })}
                            className="input input-bordered w-full" />
                        {errors.name && <p className='text-red-600' role='alert'>{errors.name?.message}</p>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type='email' {...register("email",
                            { required: "Email is required" })}
                            className="input input-bordered w-full" />
                        {errors.email && <p className='text-red-600' role="alert">{errors.email?.message}</p>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type='password' {...register("password",
                            {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be 6 characters" },
                                pattern: {
                                    value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                    message: "Password must be strong"
                                }
                            })}
                            className="input input-bordered w-full" />
                        {errors.password && <p className='text-red-600' role="alert">{errors.password?.message}</p>}
                    </div>

                    <input className='w-full justify-center bg-neutral p-3 text-white rounded-lg mt-3 hover:pointer-events-auto' type="submit" value='SIGN UP' />
                    <p className='text-sm text-center'>Already have an account?
                        <Link className='text-secondary' to='/login'>Please Login</Link>
                    </p>
                    <div className="divider">OR</div>
                    <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;