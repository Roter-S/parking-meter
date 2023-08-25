import React, { useEffect, useState } from "react";
import { login } from "../services/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

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
      const credentialUser = await login({ email, password });
      console.log(credentialUser);
      setEmail("");
      setPassword("");
    } catch (error: any) {
      // Explicitly type the error as 'any'
      console.log(error);
      if (error.code === "auth/user-not-found") {
        setErrors({ email: "Email no registrado" });
      }
      if (error.code === "auth/wrong-password") {
        setErrors({ password: "Contraseña incorrecta" });
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
        paddingX: "1rem",
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
        <Avatar sx={{ mx: "auto", bgcolor: "#444" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box onSubmit={handleSubmit} component="form" sx={{ mt: 1 }}>
          <TextField
            type="text"
            placeholder="test@example.com"
            value={email}
            onChange={handleEmailChange}
            name="email"
            id="email"
            label="Ingrese email"
            fullWidth
            sx={{ mb: 3 }}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            type="password"
            placeholder="Ingrese contraseña"
            value={password}
            onChange={handlePasswordChange}
            name="password"
            id="password"
            label="Ingrese contraseña"
            fullWidth
            sx={{ mb: 3 }}
            error={!!errors.password}
            helperText={errors.password}
          />

          <LoadingButton
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            variant="contained"
            fullWidth
            sx={{ mb: 3 }}
          >
            Login
          </LoadingButton>

          <Button component={Link} to="/register" fullWidth>
            ¿No tienes cuenta? Regístrate
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
