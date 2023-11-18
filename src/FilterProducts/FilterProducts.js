import React, { useEffect, useState } from "react";
import { getAllProducts } from "../services/Api";
import CartListProduct from "../CartListProduct/CartListProduct";
import Dropdown from "react-bootstrap/Dropdown";
import './FilterProducts.css'
const FilterProducts = () => {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [maxPrice, setMaxPrice] = useState(1000);

  // ----------------------------------------------------------------------------------
  //-------------------- fetch the products from json server---------------------------
  // -----------------------------------------------------------------------------------
  const fetchSubCategoryData = async () => {
    try {
      const res = await getAllProducts();
      console.log("getprodusts", res.data);
      return res.data;
      // console.log("setProducts", products);
    } catch (err) {
      console.log("error");
    }
  };
  // ----------------------------------------------------------------------------------
  //-------------------- get the products from json server---------------------------
  // -----------------------------------------------------------------------------------
  useEffect(() => {
    fetchSubCategoryData().then((data) => {
      setProducts(data);
      setOriginalProducts(data)
    });
  }, []);
  // ----------------------------------------------------------------------------------
  //-------------------- handle the category change ---------------------------
  // -----------------------------------------------------------------------------------

  const handleSelect = async (selectedValue, event) => {
    let updatedProducts;

    // Log the selected value
    // console.log(`Selected category: ${selectedCategory}`);

    // console.log("Selected event", event);
    if (selectedValue === "all") {

      updatedProducts = await fetchSubCategoryData();

    } else {
      // If selecting a specific category, filter the products
      // console.log('before', products)
      //       updatedProducts = await fetchSubCategoryData();
      //       console.log('after', products)

      // updatedProducts = products.filter((item) => item.category === selectedValue);
      // console.log('last', products)
      updatedProducts = originalProducts.filter(
        (item) => item.category === selectedValue
      );
    }

    // Update the state with the new list of products
    setProducts(updatedProducts);
    setSelectedCategory(selectedValue);
  };

  // ----------------------------------------------------------------------------------
  //-------------------- -------------sort ----------------------------------------
  // -----------------------------------------------------------------------------------

  const sortProducts = (sortOrder) => {
    let sortedProducts;

    if (sortOrder === "asc") {
      sortedProducts = [...products].sort((a, b) => a.price - b.price);
    } else {
      sortedProducts = [...products].sort((a, b) => b.price - a.price);
    }
    setProducts(sortedProducts);
  };

  // ----------------------------------------------------------------------------------
  //-------------------- -------------  Seach ----------------------------------------
  // -----------------------------------------------------------------------------------

  const handleSearch = (e) => {
    const searchQuery = e.target.value.trim().toLowerCase();

    // Create a copy of the original products array
    const originalProductsCopy = [...originalProducts];
    console.log("originalProductsCopy", originalProductsCopy);
    console.log("products", products);

    const filteredProducts = originalProductsCopy.filter((product) =>
      product.name.toLowerCase().includes(searchQuery)
    );
    // console.log("filteredProducts", filteredProducts);
    // console.log("filteredProducts.length > 0 ", filteredProducts.length > 0 );
    setProducts(searchQuery ? filteredProducts : originalProductsCopy);
  };

  //--------------------------------------------------------------------------
  // ------------------------handleFilterByPrice------------------------------
  //--------------------------------------------------------------------------
  const handleFilterByPrice = (e) => {
    
    const filteredProducts = originalProducts.filter(
      (product) => product.price <= maxPrice
    );

    setProducts(filteredProducts);
  };
  return (
    <div className="products container mt-5">
      <div className="row">
        <div className="left col-md-3">
          <div className="filterItem">
            <h2>Select Category</h2>

            <Dropdown data-bs-theme="dark" onSelect={handleSelect}>
              <Dropdown.Toggle
                id="dropdown-button-dark-example1"
                variant="secondary"
              >
                Select Category
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  eventKey="all"
                  active={selectedCategory === "all"}
                >
                  All
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Electronics"
                  active={selectedCategory === "Electronics"}
                >
                  Electronics
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Clothing"
                  active={selectedCategory === "Clothing"}
                >
                  Clothing
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Home & Kitchen"
                  active={selectedCategory === "Home & Kitchen"}
                >
                  Home & Kitchen{" "}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="filterItem">
            <h2>Search</h2>
            <input
              className="form-control"
              type="text"
              onChange={(e) => {
                handleSearch(e);
                
              }}
            />
          </div>

          <div className="filterItem">
            <h2>Filter By Price</h2>
            <div className="inputItem">
              <span>0</span>
              <input
                type="range"
                man={0}
                max={1000}
                onChange={(e) => {
                  handleFilterByPrice(e.target.value);
                  setMaxPrice(e.target.value);
                }}
              />
              <span>{maxPrice}</span>
            </div>
          </div>

          <div className="filterItem">
            <h2>Sort By </h2>

            <div className="inputItem">
              <input
                type="radio"
                id="asc"
                value="asc"
                name="price"
                onChange={(e) => {
                  sortProducts("asc");
                }}
              />
              <label htmlFor="asc">price (lowest first)</label>
            </div>

            <div className="inputItem">
              <input
                type="radio"
                id="desc"
                value="desc"
                name="price"
                onChange={(e) => {
                  sortProducts("desc");
                }}
              />
              <label htmlFor="desc">price (Height first)</label>
            </div>
          </div>
        </div>

        <div className="right col-md-9">
          <CartListProduct products={products} />
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;
