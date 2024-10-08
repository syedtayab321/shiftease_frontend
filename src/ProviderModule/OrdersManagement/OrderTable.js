import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../../assets/Providercss/ordertable.css";
import apiUrls from "../../ApiUrls";

const OrdersTable = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const company_id = localStorage.getItem("UserID");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${apiUrls.PROVIDER_APPROVED_ORDERS_GET}${company_id}`
        );
        setOrdersData(response.data);
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
        console.error("Error fetching order data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [company_id]);

  const filteredOrders = ordersData.filter((orders) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (orders.client_name?.toLowerCase().includes(searchLower)) ||
      (orders.service_date?.includes(searchLower)) ||
      (orders.package_id?.toString().includes(searchLower)) || // Ensure package_id is a string
      (orders.id?.toString().includes(searchLower)) // Convert id to string
    );
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="orders-table-container">
      <h2 className="orders-table-title">My Orders</h2>

      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by Customer Name, Order ID, package id or Date"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      {/* Orders Table */}
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td> {/* Corrected field */}
                <td>{order.client_name}</td> {/* Corrected field */}
                <td>{order.package_id}</td>
                <td>{order.service_date}</td>
                <td className={`status ${order.order_status.toLowerCase()}`}>
                  {order.order_status}
                </td>
                <td>{order.package_price}</td>
                <td><button className='btn btn-primary'>View</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
