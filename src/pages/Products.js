// cette route affiche tous les articles qui ont été créés

// import package
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import "../css/products.css";

function Products() {
  const [searchParams] = useSearchParams();
  let currentPage = Number(searchParams.get("page"));
  if (!currentPage) {
    currentPage = 1;
  }

  const [data, setData] = useState({});
  const [isLoading, setIsloading] = useState(true);
  // const [search, setSearch] = useState();

  const [limit, setLimit] = useState(3);
  const [pagination, setPagination] = useState(null);

  // const totalPages = Math.ceil(data.count / limit); //ici si je ne souhaite avoir que les boutons prev et next sans les chiffres de pagination

  // console.log("totalPages >>>", totalPages);

  // useEffect(() => {
  //   setPage(currentPage);
  // }, []);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        //route en get pour récupérer ma data
        const response = await axios.get(
          `http://localhost:4000/productslist?page=${currentPage}&limit=${limit}` //${page} correspond à req.query.page à qui on transmet page en props dans le tableau
        );
        // console.log(response.data);
        setData(response.data);
        let totalPages = Math.ceil(response.data.count / limit);
        const paginationArr = [
          <div key={"prec"}>
            <Link
              to={`?page=${currentPage - 1}`}
              className={currentPage === 1 ? "disabled-link" : ""}
            >
              prec
            </Link>
          </div>,
        ];
        console.log("totalPage >>>", totalPages);
        for (let i = 1; i <= totalPages; i++) {
          paginationArr.push(
            <div key={i}>
              <Link to={`?page=${i}`}>{i}</Link>
            </div>
          );
        }
        paginationArr.push(
          <div key={"suiv"}>
            <Link
              to={`?page=${currentPage + 1}`}
              className={currentPage < totalPages ? "" : "disabled-link"}
            >
              suiv
            </Link>
          </div>
        );
        setPagination(paginationArr);

        setIsloading(false);
        console.log("paginationArr >>>", paginationArr);
      } catch (error) {
        console.log(error.response); // contrairement au error.message d'express
      }
    };
    fetchdata();
  }, [searchParams, limit]);

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
      <div className="pagination">{pagination}</div>
    </div>
  );
}
export default Products;
