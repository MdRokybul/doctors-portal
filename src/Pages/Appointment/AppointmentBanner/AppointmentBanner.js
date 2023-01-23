import React, { useState } from 'react';
import chair from '../../../assets/images/chair.png';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';

const AppointmentBanner = ({selectedDate, setSelectedDate}) => {
    
    return (
        <header>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={chair} className=" lg:w-1/2 rounded-lg shadow-2xl" />
                    <div>
                        <DayPicker mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}>
                        </DayPicker>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppointmentBanner;