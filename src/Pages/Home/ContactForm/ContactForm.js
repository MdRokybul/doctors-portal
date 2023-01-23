import React from 'react';
import { Link } from 'react-router-dom';
import appointment from '../../../assets/images/appointment.png';

const ContactForm = () => {
    return (
        <section style={{
            background: `URL(${appointment})`
        }}>
            <div className='mt-12 mx-auto w-1/2 p-28'>
                <div className='text-center'>
                    <h3 className='text-lg text-primary font-bold'>Contact Us</h3>
                    <h2 className='text-4xl'>Stay connected with us</h2>
                </div>
                <div className='text-center'>
                    <input type="text" placeholder="Type here" className="input my-6 w-3/4 mx-auto block input-bordered " />
                    <input type="text" placeholder="Type here" className="input my-6 w-3/4 mx-auto block input-bordered" />
                    <textarea className="textarea my-6 block textarea-bordered w-3/4 mx-auto" placeholder="Bio"></textarea>
                    <Link><button className='btn btn-primary gb-gradient-to-r from-primary to-secondary'>Submit</button></Link>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;