import { format } from 'date-fns';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { json } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
    const { name, slots, price } = treatment;
    const date = format(selectedDate, 'PP');
    const { user } = useContext(AuthContext);
    const handleBooking = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const phone = form.phone.value;
        const email = form.email.value;
        const slot = form.slot.value;

        const booking = {
            appointmentDate: date,
            slot,
            patient: name,
            phone,
            email,
            treatment: treatment.name,
            price
        }

        fetch('https://doctors-portal-server-lyart-iota.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',

            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    setTreatment(null);
                    toast.success("Booking confirmed");
                    refetch();
                }
                else{
                    toast.error(data.message)
                }
            })
        console.log(booking);
    }
    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handleBooking}>
                        <input type="text" value={date} className="input input-bordered w-full my-3" disabled />
                        <select name='slot' className="select select-bordered w-full">
                            {
                                slots && slots.map((slot, i) => <option value={slot} key={i}>{slot}</option>)
                            }
                        </select>
                        <input name='name' type="text" defaultValue={user?.displayName} disabled className="input input-bordered w-full my-3" />
                        <input name='email' type="text" defaultValue={user?.email} disabled className="input input-bordered w-full my-3" />
                        <input name='phone' type="text" placeholder="Phone Number" className="input input-bordered w-full my-3" />
                        <input className='w-full bg-neutral p-3 rounded-lg mt-3 text-white uppercase' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;