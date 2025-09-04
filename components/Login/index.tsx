"use client";
import { login } from "@/lib/actions/auth";
import React, { FormEvent } from "react";
import Image from "next/image";
import LogginSvg from "@/assets/images/login.svg";
import { useRouter } from "next/navigation";
import toaster from "@/lib/toastify";

const LoginComp: React.FC = () => {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      ?.value;

    if (email && password) {
      const resp = await login({ email, password });
      console.log(resp, "resp");
      if (resp.data?.user) {
        toaster.success("logged in sucessfully");
        router.push("dashboard");
      } else {
        toaster.error("Error login");
      }
    } else {
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="col-12 col-md-6 col-lg-4 p-4">
          <div className="text-center mb-4">
            <Image
              src={LogginSvg}
              className="img-fluid"
              style={{ maxHeight: "160px" }}
              alt="logo"
              width={160}
              height={160}
            />
          </div>
          <div className="text-center mb-4">
            <h1 className="display-4 fw-bold mb-2">
              <span className="text-primary">joly</span>
              <span className="text-dark">.com</span>
            </h1>
            <p className="lead text-muted">Find Your Next Great Hire</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                required
              />
            </div>

            <button
              className="btn btn-primary w-100 py-3 mb-3 d-flex align-items-center justify-content-center"
              type="submit"
            >
              Start Hiring
              <svg
                className="ms-2"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </button>

            <div className="d-flex justify-content-between align-items-center">
              <a href="#" className="text-muted text-decoration-none">
                Forgot Password?
              </a>
              <div>
                <span className="text-muted">New Here?</span>{" "}
                <a href="#" className="text-primary text-decoration-underline">
                  Sign Up
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComp;
