import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import CustomInput from './CustomInput';
import CommonUtil from './CommonUtil';
import { createUser } from '../SERVICE/UserService';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
const CreateUser = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [payload, setPayload] = useState({
        name: "",
        city: "",
        sal: "",
        email: ""
    });

    const [error, setError] = useState({
        name: "",
        city: "",
        sal: "",
        email: ""
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setPayload({
            ...payload,
            [name]: event.target.value,
        });

        setError({
            ...error,
            [name]: ""
        });
    };

    const resetError = (fieldName) => {
        setError((prevError) => ({
            ...prevError,
            [fieldName]: ""
        }));
    };

    const validateForm = () => {
        if (CommonUtil.isEmptyString(payload.name)) {
            setError({
                ...error,
                name: "This field is required",
            });
            return;
        }
        if (CommonUtil.isEmptyString(payload.city)) {
            setError({
                ...error,
                city: "This field is required",
            });
            return;
        }
        if (CommonUtil.isEmptyString(payload.sal)) {
            setError({
                ...error,
                sal: "This field is required",
            });
            return;
        }
        if (CommonUtil.isEmptyString(payload.email)) {
            setError({
                ...error,
                email: "This field is required",
            });
            return;
        }

        return true;
    };


    const handleSubmit = () => {
        if (validateForm()) {
            createUser(payload)
                .then((res) => {
                    enqueueSnackbar('User created successfully', { variant: 'success' });
                })
                .catch((error) => {
                    enqueueSnackbar('Error creating user', { variant: 'error' });
                })
        }
    };

    const handleRefress = () => {

    }
    return (
        <Grid container justifyContent="center" style={{ width: "100%" }}>
            <Grid item container style={{ width: "800px" }}>
                <Grid item sx={6} md={6} pt={2} rowGap={2}>
                    <CustomInput
                        id="AddProduct1"
                        required
                        label="name"
                        size="small"
                        name="name"
                        error={error.name}
                        resetError={() => resetError("name")}
                        value={payload.name}
                        handleChange={handleChange}
                        inputProps={{
                            maxLength: 10,
                        }}
                        helperText={error.name}
                        validation={"alpha-numeric-ch-th"}
                        placeholder={"Enter Product Name"}
                    />
                </Grid>
                <Grid item sx={6} md={6} pt={2} rowGap={2}>
                    <CustomInput
                        id="AddProduct2"
                        required
                        label="city"
                        size="small"
                        name="city"
                        error={error.city}
                        resetError={() => resetError("city")}
                        value={payload.city}
                        handleChange={handleChange}
                        placeholder={"Enter your city"}
                        helperText={error.city}//dispalying the error message that feild is empty
                    />
                </Grid>
                <Grid item sx={6} md={6} pt={2}>
                    <CustomInput
                        id="AddProduct3"
                        required
                        label="sal"
                        size="small"
                        name="sal"
                        error={error.sal}
                        resetError={() => resetError("sal")}
                        value={payload.sal}
                        handleChange={handleChange}
                        placeholder={"Enter your sal"}
                        helperText={error.sal}
                        validation={"numeric"}
                    />
                </Grid>
                <Grid item sx={6} md={6} pt={2}>
                    <CustomInput
                        id="AddProduct4"
                        required
                        label="email"
                        size="small"
                        name="email"
                        error={error.email}
                        resetError={() => resetError("email")}
                        value={payload.email}
                        handleChange={handleChange}
                        placeholder={"Enter your email"}
                        helperText={error.email}
                        validation={"email"}
                    />
                </Grid>
                <Grid item sx={6} md={6} pt={2}>
                    <Button onClick={handleSubmit}>Submit</Button>
                    <Button onClick={() => handleRefress}>Refress</Button>
                    <Button onClick={() => navigate("/viewUser")}>View User</Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CreateUser;
