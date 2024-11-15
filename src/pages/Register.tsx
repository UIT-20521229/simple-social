import React from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const Register: React.FC = () => {
    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
                <Typography variant="h4" gutterBottom>
                    Register
                </Typography>
                <TextField label="Username" variant="outlined" margin="normal" fullWidth />
                <TextField label="Email" variant="outlined" margin="normal" fullWidth />
                <TextField label="Password" type="password" variant="outlined" margin="normal" fullWidth />
                <Button variant="contained" color="primary" fullWidth>
                    Register
                </Button>
            </Box>
        </Container>
    );
};

export default Register;
