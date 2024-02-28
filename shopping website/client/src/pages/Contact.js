import React from 'react';
import Layout from '../components/Layout';
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
    return (
        <Layout title={"Contact Us"}>
            <div className="flex flex-wrap items-center">
                <div className="w-full md:w-6/12 mb-6 md:mb-0">
                    <img
                        src="/images/contact-us.webp"
                        alt="contactus"
                        className="w-full h-auto"
                    />
                </div>
                <div className="w-full md:w-6/12 p-2">
                    <h1 className="bg-black p-2 text-white text-center">CONTACT US</h1>
                    <p className="text-justify mt-2">
                        Any query and info about the product, feel free to call anytime; we are available 24x7.
                    </p>
                    <p className="mt-3 font-bold">
                        <BiMailSend /> : saumyaranjanbehera08@gmail.com
                    </p>
                    <p className="mt-3 font-semibold">
                        <BiPhoneCall /> : 012-3456789
                    </p>
                    <p className="mt-3 font-semibold">
                        <BiSupport /> : 1800-0000-0000 (toll-free)
                    </p>
                </div>
            </div>
        </Layout>
    );
}

export default Contact;
