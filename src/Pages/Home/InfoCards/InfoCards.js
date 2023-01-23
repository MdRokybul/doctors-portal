import React from 'react';
import clock from '../../../assets/icons/clock.svg';
import marker from '../../../assets/icons/marker.svg';
import phone from '../../../assets/icons/phone.svg';
import InfoCard from './InfoCard';

const InfoCards = () => {
    const cardData = [
        {
            id: 1, 
            name: "Opening Hours", 
            description: "Open 9.00 AM to 5.00 PM everyday",
            icon: clock,
            bgClass: 'bg-gradient-to-r from-primary to-secondary'
        },
        {
            id: 2, 
            name: "Our location", 
            description: "Brooklyn, NY 10036, United States",
            icon: marker,
            bgClass: 'bg-neutral'
        },
        {
            id: 3, 
            name: "Contact us", 
            description: "+880 1739 080895",
            icon: phone,
            bgClass: 'bg-gradient-to-r from-primary to-secondary'
        },
    ]
    return (
        <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 text-white'>
            {
                cardData.map(card => <InfoCard key={card.id} card={card}></InfoCard>)
            }
        </div>
    );
};

export default InfoCards;