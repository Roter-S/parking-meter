import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { login } from "../services/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const onSubmit = async (
    { email, password }: { email: string; password: string },
    { setSubmitting, setErrors, resetForm }: any
  ) => {
    try {
      const credentialUser = await login({ email, password });
      console.log(credentialUser);
      resetForm();
    } catch (error: any) {
      if (typeof error.code === "string") {
        const authErrorCode = error.code;
        if (authErrorCode === "auth/user-not-found") {
          setErrors({ email: "Email no registrado" });
        }
        if (authErrorCode === "auth/wrong-password") {
          setErrors({ password: "Contraseña incorrecta" });
        }
      }
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email no válido").required("Email requerido"),
    password: Yup.string()
      .trim()
      .min(6, "Mínimo 6 caracteres")
      .required("Contraseña requerida"),
  });

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          textAlign: "center",
          my: "auto",
          mx: "auto",
        }}
      >
        <CardContent>
          <Avatar sx={{ mx: "auto", bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ isSubmitting, errors }) => (
              <Form>
                <Field
                  as={TextField}
                  fullWidth
                  sx={{ mb: 3 }}
                  label="Email Address"
                  id="email"
                  type="text"
                  placeholder="Ingrese email"
                  name="email"
                  error={Boolean(errors?.email)}
                  helperText={errors?.email}
                />

                <Field
                  as={TextField}
                  fullWidth
                  label="Password"
                  id="password"
                  type="password"
                  placeholder="Ingrese contraseña"
                  name="password"
                  error={Boolean(errors?.password)}
                  helperText={errors?.password}
                />
                <LoadingButton
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  fullWidth
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                >
                  Login
                </LoadingButton>
                <Grid container>
                  <Grid item xs>
                    <Button component={Link} to="/register">
                      ¿No tienes cuenta? Registrate
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
