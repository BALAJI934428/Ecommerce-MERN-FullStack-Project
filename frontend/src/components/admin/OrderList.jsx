import React, { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearOrderDeleted } from "../../slices/orderSlice";
import {
  deleteOrder,
  adminOrders as adminOrdersAction,
} from "../../actions/orderActions";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function OrderList() {
  const dispatch = useDispatch();
  const {
    adminOrders = [],
    loading = true,
    error,
    isOrderDeleted,
  } = useSelector((state) => state.orderState);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Number of Items",
          field: "noOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "status",
          field: "status",
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
    adminOrders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status: (
          <p
            style={{
              color: order.orderStatus.includes("Processing") ? "red" : "green",
            }}
          >
            {order.orderStatus}
          </p>
        ),
        actions: (
          <Fragment>
            <Link to={`/admin/order/${order._id}`} className="btn btn-primary">
              <i className="fa fa-pencil"></i>
            </Link>
            <Button
              onClick={(e) => deleteHandler(e, order._id)}
              className="btn btn-danger py-1 px-2 ml-2"
            >
              <i className="fa fa-trash"></i>
            </Button>
          </Fragment>
        ),
      });
    });
    return data;
  };
  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteOrder(id));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if (isOrderDeleted) {
      toast("Order Deleted successfully", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => dispatch(clearOrderDeleted()),
      });

      return;
    }
    dispatch(adminOrdersAction);
  }, [dispatch, error, isOrderDeleted]);
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
              <h1 className="my-4">Order List</h1>
              <Fragment>
                {loading ? (
                  <Loader />
                ) : (
                  <MDBDataTable
                    data={setOrders()}
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

export default OrderList;
