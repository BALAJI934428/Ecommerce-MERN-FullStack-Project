import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  orderDetail as orderDetailAction,
  userDeleteOrder as userDeleteOrderAction,
} from "../../actions/orderActions";
import Loader from "../layouts/Loader";
import { clearError, clearUserOrderDeleted } from "../../slices/orderSlice";
import { toast } from "react-toastify";

function OrderDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderDetail, loading, error, isuserDeleted } = useSelector(
    (state) => state.orderState
  );
  const {
    shippingInfo = {},
    user = {},
    orderStatus = "Processing",
    orderItems = [],
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetail;
  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;
  const { id } = useParams();
  // const deleteHandler = (orderId) => {
  //   console.log(orderId);
  //   dispatch(userDeleteOrderAction(orderId));
  // };
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
    if (isuserDeleted) {
      toast("Order Cancelled successfully", {
        type: "success",
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => {
          dispatch(clearUserOrderDeleted());
        },
      });

      return;
    }
    dispatch(orderDetailAction(id));
  }, [id, dispatch, isuserDeleted, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 className="my-5">Order # {orderDetail._id}</h1>

              <h4 className="mb-4">Shipping Info</h4>
              <p>
                <b>Name:</b> {user.name}
              </p>
              <p>
                <b>Phone:</b> {shippingInfo.phoneNo}
              </p>
              <p className="mb-4">
                <b>Address:</b>
                {shippingInfo.address}, {shippingInfo.city},{" "}
                {shippingInfo.postalCode}, {shippingInfo.state},{" "}
                {shippingInfo.country}
              </p>
              <p>
                <b>Amount:</b> ${totalPrice}
              </p>

              <hr />

              <h4 className="my-4">Payment</h4>
              <p className={isPaid ? "greenColor" : "redColor"}>
                <b>{isPaid ? "PAID" : "NOT PAID"}</b>
              </p>

              <h4 className="my-4">Order Status:</h4>
              <p
                className={
                  orderStatus && orderStatus.includes("Delivered")
                    ? "greenColor"
                    : "redColor"
                }
              >
                <b>{orderStatus}</b>
              </p>

              <h4 className="my-4">Order Items:</h4>

              <hr />
              <div className="cart-item my-1">
                {orderItems &&
                  orderItems.map((item, i) => (
                    <div className="row my-5" key={i}>
                      <div className="col-4 col-lg-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="45"
                          width="65"
                        />
                      </div>

                      <div className="col-5 col-lg-5">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>{item.quantity} Piece(s)</p>
                      </div>
                    </div>
                  ))}
              </div>
              <hr />
            </div>
            {/* <div className="col-12 col-lg-3 mt-5 ">
              <h4 className="my-4">Order Status</h4>

              <button
                onClick={deleteHandler(orderDetail._id)}
                className="btn btn-primary btn-block"
              >
                CANCEL ORDER
              </button>
            </div> */}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default OrderDetail;
