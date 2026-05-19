"use client";

import { authClient } from "@/lib/auth-client";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    console.log(userData);
    const { data, error } = await authClient.signIn.email({
      email: userData.email,
      password: userData.password,
      rememberMe: true,
      callbackURL: "/",
    });

    if (data) {
      alert("Login successful");
    }
    if (error) {
      alert(error.message);
    }
  };

  const handleGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-[70vh]  my-36 flex items-center justify-center px-4">
      <Form
        className="flex w-full max-w-md flex-col gap-5 rounded-3xl border border-gray-200 bg-white p-8 shadow-xl"
        onSubmit={handleRegister}
      >
        <div className="mb-2 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Login Account</h2>

          <p className="mt-1 text-gray-500">Welcome Back ! Your account</p>
        </div>

        <TextField
          className="w-full"
          name="email"
          type="email"
          validate={(value) => {
            if (!value) {
              return "Email is required";
            }

            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email";
            }

            return null;
          }}
        >
          <Label>Email Address</Label>

          <Input
            placeholder="example@gmail.com"
            className="h-12 rounded-xl border border-gray-300 px-4"
          />

          <FieldError className="mt-1 text-sm text-red-500" />
        </TextField>

        <TextField
          className="w-full"
          name="password"
          validate={(value) => {
            if (!value) {
              return "Password is required";
            }

            if (value.length < 8) {
              return "Password must be at least 6 characters";
            }

            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }

            if (!/[a-z]/.test(value)) {
              return "Password must contain at least one lowercase letter";
            }

            return null;
          }}
        >
          <Label>Password</Label>

          <InputGroup className="relative">
            <InputGroup.Input
              name="password"
              className="h-12 w-full rounded-xl border border-gray-300 px-4 pr-10"
              type={isVisible ? "text" : "password"}
              placeholder="Enter your password"
            />

            <InputGroup.Suffix className="absolute top-1/2 right-3 -translate-y-1/2">
              <Button
                isIconOnly
                aria-label={isVisible ? "Hide password" : "Show password"}
                size="sm"
                variant="ghost"
                onPress={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeSlash className="size-4" />
                )}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>

          <FieldError className="mt-1 text-sm text-red-500" />
        </TextField>

        <Button
          type="submit"
          className="h-12 w-full rounded-xl bg-black font-semibold text-white transition-all hover:bg-gray-800"
        >
          Login
        </Button>

        <div className="relative flex items-center">
          <div className="grow border-t border-gray-300"></div>

          <span className="mx-3 text-sm text-gray-400">OR</span>

          <div className="grow border-t border-gray-300"></div>
        </div>

        <div className="text-center">
          <Button
            onClick={handleGoogle}
            variant="secondary"
            className="h-12 rounded-xl border border-gray-300 bg-white hover:bg-gray-50"
          >
            <FcGoogle size={25} />
            Sign up with Google
          </Button>
        </div>

        <p className="text-center  text-sm text-gray-500">
          Don't have an account?
          <Link
            href="/register"
            className="font-semibold  text-black hover:underline"
          >
            Register
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default LoginPage;
