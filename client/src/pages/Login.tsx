// components/LoginPage.jsx
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Card,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Github,Apple } from 'lucide-react';

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});


export default function LoginPage() {
  const handleLogin = (values) => {
    console.log("Login values:", values);
    // Perform login logic here (API call, etc.)
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>

        <CardContent>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {() => (
              <Form className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Field
                    as={Input}
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Field
                    as={Input}
                    name="password"
                    type="password"
                    placeholder="••••••••"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>

                <Button variant='outline' asChild={false} className="w-full">
                  Login
                </Button>
              </Form>
            )}
          </Formik>

          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative bg-white px-2 text-muted-foreground">
              OR
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <Apple size={20} /> Continue with Google
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
          <a href="/register" className="ml-1 text-blue-600 underline">
            Register here
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}


