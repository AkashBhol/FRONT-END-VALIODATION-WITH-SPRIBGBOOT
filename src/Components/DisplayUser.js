import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { viewUser } from "../SERVICE/UserService";

const DisplayUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    viewUser().then((res) => {
      if (res && res.data) {
        setUsers(res.data); // Update the state with the fetched data
      }
    }).catch((error) => {
      console.error("Error fetching user data:", error);
    });
  }, []);

  const handleView = (user) => {
    navigate(`/viewOneUser/${user.id}`); // Assuming you have a route for viewing a single user
  };

  const handleEdit = (user) => {
    // navigate(`/editUser/${user.id}`); // Assuming you have a route for editing a user
  };

  const handleDelete = (userId) => {
    // Implement your delete logic here
    // console.log("Delete user with ID:", userId);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button onClick={() => navigate("/")}>Back</Button>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.city}</TableCell>
                  <TableCell>{user.sal}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleView(user)}>View</Button>
                    <Button onClick={() => handleEdit(user)}>Edit</Button>
                    <Button onClick={() => handleDelete(user.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default DisplayUser;
