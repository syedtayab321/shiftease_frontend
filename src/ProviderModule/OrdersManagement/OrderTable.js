import React, { useState } from "react";
import "./../../assets/Providercss/ordertable.css";

const ordersData = [
  {
    orderId: "#001",
    customerName: "John Doe",
    service: "Home Shifting",
    date: "2024-08-10",
    status: "Completed",
    amount: "$250"
  },
  {
    orderId: "#002",
    customerName: "Jane Smith",
    service: "Home Decoration",
    date: "2024-08-12",
    status: "Processing",
    amount: "$450"
  },
  {
    orderId: "#003",
    customerName: "Sam Wilson",
    service: "Home Shifting",
    date: "2024-08-15",
    status: "Pending",
    amount: "$300"
  }
];

const OrdersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter orders based on search term
  const filteredOrders = ordersData.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.date.includes(searchTerm)
  );

  return (
    <div className="orders-table-container">
      <h2 className="orders-table-title">My Orders</h2>

      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by Customer Name, Order ID, Service, Status or Date"
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
          {filteredOrders.map((order, index) => (
            <tr key={index}>
              <td>{order.orderId}</td>
              <td>{order.customerName}</td>
              <td>{order.service}</td>
              <td>{order.date}</td>
              <td className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </td>
              <td>{order.amount}</td>
              <td><button className='btn btn-primary'>View</button></td>
            </tr>
          ))}
          {filteredOrders.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
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
