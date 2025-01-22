import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  TableFooter,
  Button,
  TextField,
  Box,
} from "@mui/material";
import axios from "axios";
import apiUrls from "../../ApiUrls";

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  // Fetch complaints data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrls.ADMIN_COMPLAINTS}`);
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };
    fetchData();
  }, []);

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filtered data based on search
  const filteredComplaints = complaints.filter((complaint) =>
    complaint.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          color: "#1976d2",
          fontWeight: "bold",
          marginBottom: "20px",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
        }}
      >
        Complaints Management
      </Typography>

      {/* Search Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <TextField
          label="Search Complaints"
          variant="outlined"
          size="small"
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "300px" }}
        />
      </Box>

      {/* Complaints Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "15px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Title
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Description
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Date
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredComplaints
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell>{complaint.id}</TableCell>
                  <TableCell>{complaint.title}</TableCell>
                  <TableCell>{complaint.description}</TableCell>
                  <TableCell>{new Date(complaint.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      color={
                        complaint.status === "Resolved"
                          ? "success"
                          : "warning"
                      }
                    >
                      {complaint.status}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      color="info"
                      onClick={() => alert(`Details of complaint ${complaint.id}`)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={filteredComplaints.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ComplaintsPage;
