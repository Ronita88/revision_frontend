// cette route affiche tous les articles qui ont été créés

// import package
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/products.css";

function Products() {
  const [data, setData] = useState("");
  const [isLoading, setIsloading] = useState(true);
  // const [search, setSearch] = useState();
  const [page, setPage] = useState(1);
  const { limit, setLimit } = useState(0);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/productslist?page=${page}&limit=${limit}` //${page} correspond à req.query.page à qui on transmet page en props dans le tableau l 29
        );
        console.log(response.data);
        setData(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error.message); // contrairement au error.message d'express
      }
    };
    fetchdata();
  }, [page, limit]);

  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <div>
      <h1>Nos sacs</h1>
      {data.map((bag, index) => {
        return (
          <div className="bagContainer" key={index}>
            <div className="bag-container-left">
              <p>{bag.product_name}</p>
            </div>

            <div className="bag-container-right">
              <p>{bag.product_description}</p>
              <p>{bag.product_price}</p>
            </div>
          </div>
        );
      })}
      <input type />
    </div>
  );
}
export default Products;
