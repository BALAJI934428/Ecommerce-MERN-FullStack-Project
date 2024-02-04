import React from "react";
import { useEffect, useState } from "react";
import store from "./store";
import { loadUser } from "./actions/userActions";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Payment from "./components/cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
function Stripe() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    store.dispatch(loadUser);

    async function getStripeApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");

      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  }, []);
  return (
    <Router>
      <Routes>
        {stripeApiKey && (
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
        )}
      </Routes>
    </Router>
  );
}

export default Stripe;
