// app/products/page.jsx
import React from "react";
import OurShop from "../category/OurShop";

const ProductsPage = async ({ searchParams }) => {
    const query = await searchParams;
    let search = query?.q
    console.log(search)
    return (
        <div>
            <OurShop search={search} />
        </div>
    );
};

export default ProductsPage;