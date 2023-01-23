import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null);
    const closeModal = () => {
        setDeletingDoctor(null);
    }
    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            const res = await fetch('https://doctors-portal-server-lyart-iota.vercel.app/doctors');
            const data = res.json();
            return data;
        }
    })
    // const handleDelete = id => {
    //     fetch(`https://doctors-portal-server-lyart-iota.vercel.app/doctors/${id}`, {
    //         method: 'DELETE'
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.deletedCount > 1) {

    //             }
    //         })
    // }

    const handleDeleteDoctor = doctor => {
        console.log(doctor);
        fetch(`https://doctors-portal-server-lyart-iota.vercel.app/doctors/${doctor._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success("Successfully delete");
                    refetch();
                }
            })
    }
    return (
        <div>
            <h3 className="text-3xl">Manage Doctors</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors?.map((doctor, i) =>
                                <tr>
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-24 rounded-full">
                                                <img src={doctor.image} />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.specialty}</td>
                                    <td>
                                        <label onClick={() => setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-error">Delete</label>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingDoctor &&
                <ConfirmationModal
                    title={`Are you sure you want to delete ${deletingDoctor.name}?`}
                    message={`If you delete ${deletingDoctor.name}. This cannot be undone.`}
                    closeModal = {closeModal}
                    successAction = {handleDeleteDoctor}
                    modalData = {deletingDoctor}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;