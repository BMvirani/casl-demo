"use client";
import Dashboard from "@/app/components/Dashboard";
import { useAuth } from "@/app/providers/AuthContext";
import { Can } from "@/app/providers/Can";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LoginForm from "./components/Login";

const page = () => {
  const { user, setUser } = useAuth();

  return (
    <>
      
      <div className="test-note">
        <Link href={"/testing"}>Click here to check tesing credentials</Link>
      </div>
      <LoginForm />
      <div className="login-page-userboard">
        {user && (
          <Can I="read" a="Dashboard">
            <h2>Role : {user.role}</h2>
            <Dashboard />
          </Can>
        )}
      </div>
    </>
  );
};

export default page;
