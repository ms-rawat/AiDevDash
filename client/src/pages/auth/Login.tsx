// components/LoginPage.jsx
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Card,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input, PasswordInput } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Github, Apple } from "lucide-react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../graphql/mutation";

// Validation schema
const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too short!").required("Required"),
});

export default function LoginPage() {
  const [LoginUser] = useMutation(LOGIN_USER);
  const navigate= useNavigate()
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      console.log("Login values:", values);
      try{
        const result =   await LoginUser({
            variables:{
              email : values.email,
              password : values.password
            }
          })
          console.log(result)
          if(result?.data?.login?.token)
          {
          localStorage.setItem('token',result?.data?.login?.token)
           navigate('/dashboard')

          }
          
      }catch(error){
        console.log("Registration error",error)
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                name="password"
                placeholder="••••••••"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500">{formik.errors.password}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          {/* OR Divider */}
          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative bg-white px-2 text-muted-foreground">
              OR
            </div>
          </div>

          {/* Social Auth Buttons */}
          <div className="flex flex-col space-y-2">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <Apple size={20} /> Continue with Apple
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <Github size={20} /> Continue with GitHub
            </Button>
          </div>
        </CardContent>

        <CardFooter className="justify-center text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="ml-1 text-blue-600 underline">
            Register here
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
