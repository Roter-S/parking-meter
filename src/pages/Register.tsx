import React, { useState } from "react";
import { register } from "../services/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { Link } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const { user } = useUserContext();

  useRedirectActiveUser(user, "/dashboard");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await register({ email, password });
      console.log("user registered");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      console.log(error.code);
      console.log(error.message);
      if (error.code === "auth/email-already-in-use") {
        setErrors({ email: "Email already in use" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          textAlign: "center",
          my: "auto",
          mx: "auto",
        }}
      >
        <Avatar sx={{ mx: "auto", bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>

        <Box onSubmit={handleSubmit} component="form" sx={{ mt: 1 }}>
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            label="Email Address"
            id="email"
            type="text"
            placeholder="Ingrese email"
            value={email}
            onChange={handleEmailChange}
            name="email"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            id="password"
            type="password"
            placeholder="Ingrese contraseña"
            value={password}
            onChange={handlePasswordChange}
            name="password"
            error={!!errors.password}
            helperText={errors.password}
          />
          <LoadingButton
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
            fullWidth
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Button component={Link} to="/" color="secondary">
                ¿Ya tienes cuenta? Accede aquí
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
