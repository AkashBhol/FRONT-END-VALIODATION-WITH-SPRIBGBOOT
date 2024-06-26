import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { viewSingleUser } from "../SERVICE/UserService";
import axios from "axios";

const ViewOneUser = () => {
    const { id } = useParams(); // Get the user ID from the URL
    const [user, setUser] = useState({
        name: "",
        city: "",
        sal: "",
        email: ""
    });

    useEffect(() => {
        debugger
        useEffect(() => {
            axios.get(`http://localhost:8089/api/v2/get/single/${id}`).then((res) => {
                setUser(res.data);
            }).catch((error) => {
                console.error("Error fetching user data:", error);
            });
        }, [id])
    })
        return (
            <Grid container spacing={2}>
                {user ? (
                    <>
                        <Grid item xs={12}>
                            <Typography variant="h4">User Details</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">Name: {user.name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">City: {user.city}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">Salary: {user.sal}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">Email: {user.email}</Typography>
                        </Grid>
                    </>
                ) : (
                    <Grid item xs={12}>
                        <Typography variant="h6">Loading...</Typography>
                    </Grid>
                )}
            </Grid>
        );
    };

    export default ViewOneUser;
