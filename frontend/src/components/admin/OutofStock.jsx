import React, { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../slices/productsSlices";
import { deleteProduct, getAdminProducts } from "../../actions/productsActions";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function OutofStock() {
  const dispatch = useDispatch();
  const {
    products = [],
    loading = true,
    error,
  } = useSelector((state) => state.productsState);
  let outOfStock = [];
  products.forEach((product) => {
    if (product.stock === 0) {
      outOfStock.push(product);
    }
  });

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },

        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };
    outOfStock.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,

        stock: product.stock,
        actions: (
          <Fragment>
            <Link
              to={`/admin/product/${product._id}`}
              className="btn btn-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
          </Fragment>
        ),
      });
    });
    return data;
  };
  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteProduct(id));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }

    dispatch(getAdminProducts);
  }, [dispatch, error]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row">
            <div className="col-12 col-md-2">
              <Sidebar />
            </div>

            <div className="col-12 col-md-10">
              <h1 className="my-4">Out of Stock List</h1>
              <Fragment>
                {loading ? (
                  <Loader />
                ) : (
                  <MDBDataTable
                    data={setProducts()}
                    bordered
                    striped
                    hover
                    className="px-3"
                  />
                )}
              </Fragment>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default OutofStock;
