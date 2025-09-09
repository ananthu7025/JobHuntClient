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
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <Image
                src={LogginSvg}
                className="logo-image"
                alt="JobHunt Platform"
                width={80}
                height={80}
              />
            </div>
            <div className="login-branding">
              <h1 className="brand-title">JobHunt Platform</h1>
              <p className="brand-subtitle">HR Dashboard - Find Your Next Great Hire</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-control-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-control-label">Password</label>
              <input
                type="password"
                className="form-input"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <button className="login-btn" type="submit">
              <i className="fas fa-sign-in-alt"></i>
              Sign In to Dashboard
            </button>

            <div className="login-links">
              <a href="#" className="forgot-link">
                Forgot your password?
              </a>
              <div className="signup-link">
                <span>New to JobHunt?</span>
                <a href="#">Create Account</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComp;
