import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddDoctors = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { data: specialtes, isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('https://doctors-portal-server-lyart-iota.vercel.app/doctorspecialty');
            const data = await res.json();
            return data;
        }
    })
    const handleAddDoctor = data => {
        const image = data.img[0];
        console.log(image)
        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=85aca47675983b04de1e39f71f3deb26`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            if(imgData.success){
                const doctor = {
                    name: data.name,
                    email: data.email,
                    specialty: data.specialty,
                    image: imgData.data.url
                }

                fetch('https://doctors-portal-server-lyart-iota.vercel.app/doctors', {
                    method: 'POST', 
                    headers : {
                        'content-type' : 'application/json'
                    },
                    body: JSON.stringify(doctor)
                })
                .then(res => res.json())
                .then(data => {
                    toast.success(`${data.name} is added successfully`);
                    navigate('/dashboard/managedoctors');
                })
                
            }
        })

    }
    return (
        <div>
            <h2 className="text-4xl">Add a Doctor</h2>
            <form onSubmit={handleSubmit(handleAddDoctor)}>
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
                    <label className="label"><span className="label-text">Specialty</span></label>
                    <select {...register("specialty")}
                        className="select select-bordered w-full max-w-xs">
                        <option disabled selected>Pick a Specialty</option>
                        {
                            specialtes?.map(specialty =>
                                <option key={specialty._id} value={specialty.name}> {specialty.name}
                                </option>)
                        }
                    </select>
                </div>

                <div className="form-control w-full">
                    <label className="label"><span className="label-text">Name</span></label>
                    <input type='file' {...register("img", { required: "Name is required" })}
                        className="input input-bordered w-full" />
                    {errors.img && <p className='text-red-600' role='alert'>{errors.img?.message}</p>}
                </div>

                <input className='w-full justify-center bg-neutral p-3 text-white rounded-lg mt-3 hover:pointer-events-auto' type="submit" value='ADD DOCTOR' />
            </form>
        </div>
    );
};

export default AddDoctors;