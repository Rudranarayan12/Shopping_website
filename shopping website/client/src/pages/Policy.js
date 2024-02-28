import React from 'react';
import Layout from '../components/Layout';

const Policy = () => {
    return (
        <Layout title={"Privacy Policy"}>
            <div className="flex flex-wrap items-center">
                <div className="w-full md:w-6/12 mb-6 md:mb-0">
                    <img
                        src="/images/privency.jpg"
                        alt="contactus"
                        className="w-[90vh] h-auto"
                    />
                </div>
                <div className="w-full md:w-6/12 p-2">
                    <p className="mb-4">
                        It offers one of the country’s widest ranges in the latest apparel, beauty, home decor, fragrances, accessories and luxury watches at the best prices. Today ShoppersStop.com is an easy way to shop for all your fashion and lifestyle needs online from the comfort of your home. 
                    </p>
                   
                    <p className="mb-4">
                        Men’s clothing and accessories Give your wardrobe a makeover with men’s apparel and accessories from ShoppersStop.com that’ll take you from the boardroom to the beach. Brands that you should definitely check out are Bandeya for men’s Indianwear like kurtas and pyjamas as well Stop that retails smart men’s clothing like formal shirts and trousers.
                    </p>
                    <p>
                        Buying guide Head over to the buying guide at Shoppersstop.com to browse through personalized suggestions to make better purchases for yourself and your loved ones.
                    </p>
                    <p className='mt-2'>
                        Please any Queries mail to <b>saumyaranjanbehera08@gmail.com</b>
                    </p>
                </div>
            </div>
        </Layout>
    );
}

export default Policy;
