 
import React from "react";
import UpdateProductForm from "../../components/UpdateProductForm";

const SingleProductPage = async ({ params }) => {
    const { id } = await params;

    // Fetch single product
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return <div className="p-10 text-red-500">Product not found</div>;
    }

    const data = await res.json();
    const product = data?.product || data; 
    return (
        <div className="p-10">
            <UpdateProductForm product={product}></UpdateProductForm>
      
        </div>
    );
};

export default SingleProductPage;
