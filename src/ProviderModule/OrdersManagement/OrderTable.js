import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  LineController,
  LineElement,
  PointElement,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Legend,
} from "chart.js";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";
import "./../../assets/Providercss/ordertable.css";
import apiUrls from "../../ApiUrls";

// Register scales and other components
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  LineController,
  DoughnutController, PointElement,
  Tooltip,
  Legend
);

const OrdersTable = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({ completed: 0, processing: 0 });
  const [lineChartData, setLineChartData] = useState({ labels: [], data: [] });

  const company_id = localStorage.getItem("UserID");
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${apiUrls.PROVIDER_APPROVED_ORDERS_GET}${company_id}`
      );
      setOrdersData(response.data);

      // Update chart data based on order status
      const completedOrders = response.data.filter(
        (order) => order.order_status === "Completed"
      ).length;
      const processingOrders = response.data.filter(
        (order) => order.order_status === "Processing"
      ).length;

      setChartData({ completed: completedOrders, processing: processingOrders });

      // Prepare data for the line chart
      const dates = response.data.map(order => order.service_date);
      const orderCounts = response.data.map(order => order.order_status === 'Completed' ? 1 : 0);

      setLineChartData({
        labels: dates,
        data: orderCounts,
      });
    } catch (err) {
      setError("Failed to fetch orders. Please try again later.");
      console.error("Error fetching order data:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company_id]);

  const filteredOrders = ordersData.filter((orders) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      orders.client_name?.toLowerCase().includes(searchLower) ||
      orders.service_date?.includes(searchLower) ||
      orders.package_id?.toString().includes(searchLower) ||
      orders.id?.toString().includes(searchLower)
    );
  });

  // Handle complete order button
  const handleComplete = async (orderId) =>{
    try {
      await axios.put(`${apiUrls.PROVIDER_APPROVED_ORDERS_UPDATE}${orderId}`, { order_status: 'Completed' });
      fetchOrders();
    } catch (error) {
      console.error('Error approving the ad', error);
    }
  };

  // Handle delete order button
  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`${apiUrls.PROVIDER_APPROVED_ORDERS_DELETE}${orderId}`);
      fetchOrders();
    } catch (error) {
      console.error('Error approving the ad', error);
    }
  };

  // If the orders are still loading
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


      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Team</th>
            <th>Complete/Delete</th>
          </tr>
        </thead>
        <tbody >
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <tr key={index} className="bg-dark">
                <td>{order.id}</td>
                <td>{order.client_name}</td>
                <td>{order.package_id}</td>
                <td>{order.service_date}</td>
                <td className={`status ${order.order_status.toLowerCase()}`}>
                  {order.order_status}
                </td>
                <td>{order.package_price}</td>
                <td>{order.team_name}</td>
                <td>
                  <button
                    className="icon-button btn-success"
                    onClick={() => handleComplete(order.id)}
                    title="Complete Order"
                  >
                    <FaCheckCircle />
                  </button>
                  <button
                    className="icon-button delete"
                    onClick={() => handleDelete(order.id)}
                    title="Delete Order"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Order Status Chart */}
      <div className="chart-title">Order Status Overview</div>
      <OrderStatusChart data={chartData} />

      {/* Line Chart for Order Trend */}
      <div className="chart-title">Order Trend Over Time</div>
      <OrderTrendChart labels={lineChartData.labels} data={lineChartData.data} />
    </div>
  );
};


const OrderStatusChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Completed", "Processing"],
        datasets: [
          {
            label: "Order Status",
            data: [data.completed, data.processing],
            backgroundColor: ["#4caf50", "#ff9800"],
            borderWidth: 2,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          tooltip: {
            backgroundColor: '#fff',
            titleColor: '#333',
            bodyColor: '#666',
            borderColor: '#ccc',
            borderWidth: 1,
          },
        },
      },
    });

    // Cleanup on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="chart-container" style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', maxWidth: '400px', margin: '0 auto' }}>
      <canvas ref={chartRef} style={{ width: '100%', height: 'auto' }}></canvas>
    </div>
  );
};

// Chart Component for Line Chart
const OrderTrendChart = ({ labels, data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy the previous chart instance before creating a new one
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Completed Orders",
            data: data,
            fill: false,
            borderColor: "#4caf50",
            tension: 0.1,
            pointRadius: 5,
            pointBackgroundColor: "#4caf50",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          tooltip: {
            backgroundColor: '#fff',
            titleColor: '#333',
            bodyColor: '#666',
            borderColor: '#ccc',
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Number of Orders',
            },
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [labels, data]);

  return (
    <div className="chart-container" style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', maxWidth: '400px', margin: '20px auto' }}>
      <canvas ref={chartRef} style={{ width: '100%', height: 'auto' }}></canvas>
    </div>
  );
};

export default OrdersTable;
