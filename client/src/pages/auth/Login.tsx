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
import { Github, Apple } from "lucide-react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../graphql/mutation";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too short!").required("Required"),
});

export default function LoginPage() {
  const [LoginUser] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const result = await LoginUser({
          variables: {
            email: values.email,
            password: values.password,
          },
        });
        const token = result?.data?.login?.token;
        if (token) {
          localStorage.setItem("token", token);
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--color-background-primary)] text-[var(--color-text-primary)] transition-colors">
      <Card className="w-full max-w-md rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-surface)] shadow-lg backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-[var(--color-text-primary)] font-semibold">
            Login
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-[var(--color-text-secondary)]">
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
                className="bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] border border-[var(--color-border-default)]"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-[var(--color-error)]">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-[var(--color-text-secondary)]">
                Password
              </Label>
              <PasswordInput
                id="password"
                name="password"
                placeholder="••••••••"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] border border-[var(--color-border-default)]"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-[var(--color-error)]">{formik.errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
            >
              Login
            </Button>
          </form>

          {/* OR Divider */}
          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--color-border-default)]" />
            </div>
            <div className="relative px-2 bg-[var(--color-surface)] text-[var(--color-muted)] text-sm">
              OR
            </div>
          </div>

          {/* Social Logins */}
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 bg-[var(--color-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)]"
            >
              <Apple size={20} /> Continue with Apple
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 bg-[var(--color-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)]"
            >
              <Github size={20} /> Continue with GitHub
            </Button>
          </div>
        </CardContent>

        <CardFooter className="justify-center text-sm text-[var(--color-text-secondary)]">
          Don’t have an account?{" "}
          <Link to="/register" className="ml-1 underline text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">
            Register here
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
