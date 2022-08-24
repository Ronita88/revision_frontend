// cette route affiche tous les articles qui ont été créés

// import package
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/products.css";

function Products() {
  const [data, setData] = useState({});
  const [isLoading, setIsloading] = useState(true);
  // const [search, setSearch] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState();
  // const totalPages = Math.ceil(data.count / limit); //ici si je ne souhiate avoir que les boutons prev et next sans les chiffres de pagination
  const pageNumber = [];

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/productslist?page=${page}&limit=${limit}` //${page} correspond à req.query.page à qui on transmet page en props dans le tableau
        );
        console.log(response.data);
        setData(response.data);
        setIsloading(false);

        const totalPages = Math.ceil(data.count / limit);
        for (let i = 0; i < totalPages; i++) {
          pageNumber.push[i];
        }
        console.log(pageNumber);
      } catch (error) {
        console.log(error.response); // contrairement au error.message d'express
      }
    };
    fetchdata();
  }, [page, limit]);

  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <div>
      <h1>Nos sacs</h1>
      {data.products.map((bag, index) => {
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
      {/* pour désactiver le boutton  disabled={page !== 0} et disabled={page <=data.count} ne marchent pas*/}
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1 ? true : false}
      >
        prev
      </button>
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages ? true : false}
      >
        next
      </button>
    </div>
  );
}
export default Products;
