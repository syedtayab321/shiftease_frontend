import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../../assets/Providercss/teamtable.css";
import AddTeamMemberModal from "./AddTeamMembers";
import apiUrls from "../../ApiUrls";

const TeamTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [memberid,setMemberId]=useState('');
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
      console.error("Error fetching packages data:", error);
      alert("An error occurred while fetching package data.");
    }
  };

  useEffect(() => {
    if (Companyid) {
      fetchTeamData();
    }
  }, [Companyid]);

 const handleadding=()=>{
    fetchTeamData();
 }
const filteredTeamMembers = teamMembers.filter((member) => {
  const searchTermLower = searchTerm.toLowerCase();
  const teamName = member.team_name ? member.team_name.toLowerCase() : "";
  const memberId = member.id ? String(member.id) : "";
  const memberName = member.team_member_name ? member.team_member_name.toLowerCase() : "";
  const memberEmail = member.team_member_email ? member.team_member_email.toLowerCase() : "";
  const memberPhone = member.team_member_phone ? String(member.team_member_phone) : "";

  return (
    teamName.includes(searchTermLower) ||
    memberId.includes(searchTermLower) ||
    memberName.includes(searchTermLower) ||
    memberEmail.includes(searchTermLower) ||
    memberPhone.includes(searchTerm)
  );
});

  const DeleteTeamMember = async (id) => {
     try {
      const response = await axios.delete(`${apiUrls.PROVIDER_TEAM_DATA_DELETE}${id}`);
      fetchTeamData();
    } catch (error) {
      console.error("Error fetching packages data:", error);
      alert("An error occurred while fetching package data.");
    }
  };

  const UpdateModal=(team_id)=>{
      setMemberId(team_id);
      handleShow();
  }
    const AddModal=()=>{
      setMemberId('');
      handleShow();
  }
  return (
    <>
      <AddTeamMemberModal show={showModal} handleClose={handleClose} onTeamAdded={handleadding} teamMemberId={memberid}/>
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
          <button onClick={()=>AddModal()} className="btn btn-success add-button">
            Add Team Member
          </button>
        </div>
        <table className="team-table">
          <thead>
          <tr>
            <th>Member ID</th>
            <th>Team Name</th>
            <th>Member Name</th>
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
                  <td>{member.team_member_email}</td>
                  <td>{member.team_member_phone}</td>
                  <td>{member.team_member_cnic}</td>
                  <td>
                    <button className="btn btn-warning" onClick={()=>UpdateModal(member.id)}>Update</button>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={()=>DeleteTeamMember(member.id)}>Delete</button>
                  </td>
                </tr>
            ))}
            {filteredTeamMembers.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">
                  No team members found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TeamTable;
