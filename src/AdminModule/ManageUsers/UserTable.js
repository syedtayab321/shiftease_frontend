import React, {useEffect, useState} from "react";
import axios from "axios";
import {Spinner} from "react-bootstrap";
import apiUrls from "../../ApiUrls";

export default function UserTable(){
    const [items,setItems]=useState([])
     const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [error, setError] = useState('');
    const fetchItems = async () => {
        try {
            const response = await axios.get(apiUrls.BUYER_GET_DATA);
            if (Array.isArray(response.data)) {
                setItems(response.data);
            } else {
                setItems([]);
            }
            setLoading(false);
        } catch (err) {
            setError('Error fetching data');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }
    const filteredItems = items.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return(
        <>
            <div className="container">
                <h2 className="mb-4 text-center">Users Management</h2>

                {/* Search Bar */}
                <div className="mb-4 d-flex justify-content-between align-items-center">
                    <input
                        type="text"
                        placeholder="Search by email or username"
                        className="form-control w-50"
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                        <tr>
                            <th>User Id</th>
                            <th>Email</th>
                            <th>User Name</th>
                            <th>Password</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredItems.map((user, index) => (
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2">Edit
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-danger btn-sm me-2">Delete
                                    </button>
                                </td>
                                {/*<td>*/}
                                {/*    /!*<button className="btn btn-danger btn-sm"*!/*/}
                                {/*    /!*        onClick={() => DeleteData(user.id)}*!/*/}
                                {/*    /!*>Delete*!/*/}
                                {/*    /!*</button>*!/*/}
                                {/*</td>*/}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}