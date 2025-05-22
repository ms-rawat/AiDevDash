// components/RegistrationPage.jsx
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Card,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input, PasswordInput } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Github, Apple } from "lucide-react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../graphql/mutation";

// Validation Schema
const registrationSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export default function RegistrationPage() {
  const [registerUser, { loading, error, data }] = useMutation(REGISTER_USER);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registrationSchema,
    onSubmit: (values) => {
        try{
          cosnt data = await registerUser({
            variables:{
              input: {
                name:values.name,
                email: values.email,
                password : values.password,
              }
            }
          })
        }catch(error){
          console.log("Registration error",error);
        }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Register</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-sm text-red-500">{formik.errors.name}</p>
              )}
            </div>

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

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-sm text-red-500">{formik.errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full">
              Register
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

          {/* OAuth Buttons */}
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
          Already have an account?{" "}
          <Link to="/login" className="ml-1 text-blue-600 underline">
            Login here
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
