import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Input, PasswordInput } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Apple, Github } from "lucide-react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../graphql/mutation";
import { Link } from "react-router-dom";

// Validation Schema
const registrationSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export default function RegistrationPage() {
  const [registerUser] = useMutation(REGISTER_USER);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registrationSchema,
    onSubmit: async (values) => {
      try {
        await registerUser({
          variables: {
            input: {
              name: values.name,
              email: values.email,
              password: values.password,
            },
          },
        });
      } catch (error) {
        console.error("Registration error", error);
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#1a1c2b] dark:to-[#2c2e43] transition-colors duration-300">
      <Card className="w-full max-w-md rounded-2xl backdrop-blur-md bg-white/30 dark:bg-white/5 border border-white/30 dark:border-white/10 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-gray-900 dark:text-gray-100">
            Create Account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-gray-700 dark:text-gray-200">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="bg-white/80 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-sm text-red-500">{formik.errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="bg-white/80 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-200">
                Password
              </Label>
              <PasswordInput
                id="password"
                name="password"
                placeholder="••••••••"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="bg-white/80 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500">{formik.errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-200">
                Confirm Password
              </Label>
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className="bg-white/80 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-sm text-red-500">{formik.errors.confirmPassword}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>

          {/* OR Divider */}
          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative px-2 bg-white dark:bg-black text-muted-foreground dark:text-gray-400">
              OR
            </div>
          </div>

          {/* Social Auth */}
          <div className="flex flex-col space-y-2">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 bg-white/70 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
            >
              <Apple size={20} /> Continue with Apple
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 bg-white/70 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
            >
              <Github size={20} /> Continue with GitHub
            </Button>
          </div>
        </CardContent>

        <CardFooter className="justify-center text-sm text-gray-700 dark:text-gray-300">
          Already have an account?
          <Link to="/login" className="ml-1 text-blue-600 underline dark:text-blue-400">
            Login here
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
