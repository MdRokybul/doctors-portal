import React, { useState } from 'react';

const AppointmentOption = ({ option, setTreatment}) => {
    const { name, slots, price } = option;
    
    return (
        <div className="card shadow-xl">
            <div className="card-body text-center">
                <h2 className="text-primary text-xl font-semibold">{name}</h2>
                <p>{slots.length > 0 ? slots[0] : 'Try another day'}</p>
                <p> {slots.length} {slots.length > 1 ? 'space' : 'speces'} available. </p>
                <p><small>Price: ${price}</small></p>
                <div className="card-actions justify-center">
                    <label onClick={() => setTreatment(option)} htmlFor="booking-modal" className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white">Book Apoointment</label>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;