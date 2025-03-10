import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { auth } from "../../service/index";
import { Notification } from "../../utils/index";
import {signInValidationSchema} from "../../utils/validation"

const Index = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (values) => {
    try {
      const response = await auth.sign_in(values);
      if (response.status === 200) {
          navigate("/");
        localStorage.setItem("access_token", response.data.access_token);
        Notification({
          title: "Sign In Successfuly",
          type: "success",
        });
      }
    } catch (error) {
      console.error(error);
      Notification({
        title: "Sign In Failed",
        type: "error",
      })
    }
  };
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="h-screen flex-col flex items-center justify-center p-5">
        <h1 className="text-[40px] font-bold sm:text-[36px] md:text-[56px]">
          Login
        </h1>
        <div className="max-w-[600px]">
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={signInValidationSchema}>
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="email"
                  type="email"
                  as={TextField}
                  label="Email address"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  as={TextField}
                  label="Password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="text-[red] text-[15px]"
                    />
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <span
                  onClick={() => navigate("/forgot-password")}
                  className=" text-blue-300 cursor-pointer hover:text-blue-500"
                >
                Forgot Password?
                </span>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{ marginBottom: "8px", marginTop: "8px" }}
                >
                  {isSubmitting ? "Signing" : "Sign In"}
                </Button>
                <span>Don't have an account?</span>
                <span
                  onClick={() => navigate("/sign-up")}
                  className="ml-2 cursor-pointer text-blue-500"
                  
                >
                   Register here
                </span>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Index;
