import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsPencilSquare, BsTrash } from 'react-icons/bs'; // Import icons
import "./../../assets/Providercss/teamtable.css";
import AddTeamMemberModal from "./AddTeamMembers";
import apiUrls from "../../ApiUrls";

const TeamTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [memberid, setMemberId] = useState('');

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const Companyid = localStorage.getItem("UserID");

  const fetchTeamData = async () => {
    try {
      const response = await axios.get(`${apiUrls.PROVIDER_TEAM_DATA_GET}${Companyid}`);
      if (Array.isArray(response.data)) {
        setTeamMembers(response.data);
      } else {
        console.error("Unexpected response format", response.data);
        setTeamMembers([]);
      }
    } catch (error) {
      console.error("Error fetching team data:", error);
      alert("No team member data found");
    }
  };

  useEffect(() => {
    if (Companyid) {
      fetchTeamData();
    }
  }, [Companyid]);

  const handleAdding = () => {
    fetchTeamData();
  };

  const filteredTeamMembers = teamMembers.filter((member) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      member.team_name?.toLowerCase().includes(searchTermLower) ||
      member.team_member_role?.toLowerCase().includes(searchTermLower) ||
      String(member.id).includes(searchTermLower) ||
      member.team_member_name?.toLowerCase().includes(searchTermLower) ||
      member.team_member_email?.toLowerCase().includes(searchTermLower) ||
      String(member.team_member_phone).includes(searchTerm)
    );
  });

  const DeleteTeamMember = async (id) => {
    try {
      await axios.delete(`${apiUrls.PROVIDER_TEAM_DATA_DELETE}${id}`);
      fetchTeamData();
    } catch (error) {
      console.error("Error deleting team member:", error);
      alert("An error occurred while deleting the team member.");
    }
  };

  const UpdateModal = (team_id) => {
    setMemberId(team_id);
    handleShow();
  };

  const AddModal = () => {
    setMemberId('');
    handleShow();
  };

  return (
    <>
      <AddTeamMemberModal
        show={showModal}
        handleClose={handleClose}
        onTeamAdded={handleAdding}
        teamMemberId={memberid}
      />
      <div className="team-table-container">
        <h2 className="team-table-title">Team Members</h2>

        <div className="search-and-add-container">
          <input
            type="text"
            placeholder="Search by Name, Team Type, Email, or Mobile Number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          <button onClick={AddModal} className="btn btn-success add-button">
            Add Team Member
          </button>
        </div>

        <div className="table-responsive">
          <table className="team-table">
            <thead>
              <tr>
                <th>Member ID</th>
                <th>Team Name</th>
                <th>Member Name</th>
                <th>Member Role</th>
                <th>Member Email</th>
                <th>Mobile Number</th>
                <th>Member Cnic</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeamMembers.map((member, index) => (
                <tr key={index}>
                  <td>{member.id}</td>
                  <td>{member.team_name}</td>
                  <td>{member.team_member_name}</td>
                  <td>{member.team_member_role}</td>
                  <td>{member.team_member_email}</td>
                  <td>{member.team_member_phone}</td>
                  <td>{member.team_member_cnic}</td>
                  <td>
                    <BsPencilSquare
                      size={24}
                      color="orange"
                      style={{ cursor: 'pointer' }}
                      onClick={() => UpdateModal(member.id)}
                    />
                  </td>
                  <td>
                    <BsTrash
                      size={24}
                      color="red"
                      style={{ cursor: 'pointer' }}
                      onClick={() => DeleteTeamMember(member.id)}
                    />
                  </td>
                </tr>
              ))}
              {filteredTeamMembers.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center">
                    No team members found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TeamTable;
