import React from 'react';

const Reviews = ({ review }) => {
    const { name, description, location, image } = review;
    return (
        <div className="card shadow-xl">
            <div className="card-body">
                <p>{description}</p>
                <div className="flex items-center">
                    <div className="avatar mr-6">
                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={image} />
                        </div>
                    </div>
                    <div>
                        <h5 className='text-lg'>{name}</h5>
                        <p>{location}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reviews;