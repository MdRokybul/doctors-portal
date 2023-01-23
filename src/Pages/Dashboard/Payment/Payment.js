import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe('pk_test_51MShnWDwxGku0Y9c4u6xlRdlLa9i8tPCEz5hTa1qprgbNkLGEbMpcSAgco0W6tugKjXvqIpBh9NoQsC7qGMsg7r700yhT9gc0r');


const Payment = () => {
    const booking = useLoaderData();
    const { treatment, price, appointmentDate, slot } = booking;
    console.log(booking);

    return (
        <div>
            <h3 className='text-3xl'>Payment for {treatment}</h3>
            <p className='text-xl'>Please pay <strong className='text-primary'>${price}</strong> for your appointment on {appointmentDate} at {slot}</p>

            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm 
                    booking = {booking}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;