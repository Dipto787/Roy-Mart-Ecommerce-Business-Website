import React from 'react';
import OurShop from '../OurShop';

const page = async ({ params }) => {
    let category = await params;
    return (
        <div> 
            <OurShop category={category?.category}></OurShop>
        </div>
    );
};

export default page;