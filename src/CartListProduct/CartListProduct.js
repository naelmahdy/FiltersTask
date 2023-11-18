import React from "react";
import  "./CartListProduct.css";

const CartListProduct = ({ products }) => {
  // console.log("products from cart", products);
  // ---------------------------------
  // -----------render elements-------
  // ---------------------------------
  const renderElements=products.map((product)=>(
    <div key={product.id} className="card card2 col-md-4 col-sm-12 p-1"  >
      <div className="image">
       <img src={product.img}/>
    </div>

    <h2 className="productName">{product.name}</h2>
    <h2 className="productName">{product.description}</h2>
    <h2 className="productName">{product.category}</h2>
    <div className='prices'>
    <h3>${Number(product.price) + 20}</h3>
    <h3>${product.price}</h3>
  </div>

  <div>
  <button type="button" className="btn btn-primary" >Add To Cart</button>
</div>
    </div>

   

  ))

  return <div  className="row">
  
  {renderElements}
  </div>;
};

export default CartListProduct;
