"use client";

import { authClient } from "@/lib/auth-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
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

const RegistrationPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
      image: userData.image,
    });
    console.log("DATA:", data);
    console.log("ERROR:", error);
    if (data) {
      alert("signup successful");
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
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>

          <p className="mt-1 text-gray-500">
            Welcome! Please enter your details
          </p>
        </div>

        <TextField
          className="w-full"
          name="name"
          type="text"
          validate={(value) => {
            if (!value) {
              return "Name is required";
            }

            if (value.length < 3) {
              return "Name must be at least 3 characters";
            }

            return null;
          }}
        >
          <Label>Full Name</Label>

          <Input
            placeholder="Enter your name"
            className="h-12 rounded-xl border border-gray-300 px-4"
          />

          <FieldError className="mt-1 text-sm text-red-500" />
        </TextField>

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
          name="image"
          type="url"
          validate={(value) => {
            if (!value) {
              return "Photo URL is required";
            }

            return null;
          }}
        >
          <Label>Photo URL</Label>

          <Input
            placeholder="https://example.com/photo.jpg"
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
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
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

        <TextField
          className="w-full"
          name="confirmPassword"
          validate={(value) => {
            if (!value) {
              return "Confirm Password is required";
            }

            if (value !== passwordValue) {
              return "Passwords do not match";
            }

            return null;
          }}
        >
          <Label>Confirm Password</Label>

          <InputGroup className="relative">
            <InputGroup.Input
              name="confirmPassword"
              className="h-12 w-full rounded-xl border border-gray-300 px-4 pr-10"
              type={isVisible2 ? "text" : "password"}
              placeholder="Confirm your password"
            />

            <InputGroup.Suffix className="absolute top-1/2 right-3 -translate-y-1/2">
              <Button
                isIconOnly
                aria-label={isVisible2 ? "Hide password" : "Show password"}
                size="sm"
                variant="ghost"
                onPress={() => setIsVisible2(!isVisible2)}
              >
                {isVisible2 ? (
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
          className="h-12 rounded-xl bg-black font-semibold text-white transition-all hover:bg-gray-800"
        >
          <Check className="mr-2 h-4 w-4" />
          Create Account
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

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-black hover:underline"
          >
            Login
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default RegistrationPage;
