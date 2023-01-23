import React from 'react';
import fluoride from '../../../assets/images/fluoride.png';
import cavity from '../../../assets/images/cavity.png';
import whitening from '../../../assets/images/whitening.png';
import Service from './Service';

const Services = () => {
    const servicesData = [
        {
            id: 1, 
            name: "Fluoride Treatment", 
            description: "Fluoride treatments are typically professional treatments containing a high concentration of fluoride that a dentist or hygienist will apply to a person's teeth to improve health and reduce the risk of cavities",
            icon: fluoride,
            bgClass: 'bg-gradient-to-r from-primary to-secondary'
        },
        {
            id: 2, 
            name: "Cavity Filling", 
            description: "Fillings, also called restorations, are the main treatment option when decay has progressed beyond the earliest stage. Fillings are made of various materials, such as tooth-colored composite resins, porcelain or dental amalgam that is a combination of several materials.",
            icon: cavity,
            bgClass: 'bg-neutral'
        },
        {
            id: 3, 
            name: "Teeth Whitening", 
            description: "What is tooth whitening? Tooth whitening can be a very effective way of lightening the natural colour of your teeth without removing any of the tooth surface. It cannot make a complete colour change, but it may lighten the existing shade.",
            icon: whitening,
            bgClass: 'bg-gradient-to-r from-primary to-secondary'
        },
    ]
    return (
        <div className='mt-16'>
            <div className='text-center'>
                <h3 className='text-xl font-bold text-primary uppercase'>Our Services</h3>
                <h2>Services we provide</h2>
            </div>
            <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    servicesData.map(serviceData => <Service key={serviceData.id} serviceData={serviceData}></Service>)
                }
            </div>
        </div>
    );
};

export default Services;