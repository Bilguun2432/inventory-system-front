"use client";

import { signIn, SignInResponse } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";
import React from "react";
type AuthFormValues = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>();

  const onSubmit: SubmitHandler<AuthFormValues> = async (data) => {
    const { username, password } = data;

    const { error, status, ok, url }: any = await signIn("credentials", {
      username: username,
      password: password,
      redirect: true,
    });

    console.log("", { error, status, ok, url });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="px-8 pt-6 pb-8 mb-4">
        <link rel="stylesheet" type="text/css" href="/vendor/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="/fonts/font-awesome-4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" type="text/css" href="/fonts/iconic/css/material-design-iconic-font.min.css" />
        <link rel="stylesheet" type="text/css" href="/vendor/animate/animate.css" />
        <link rel="stylesheet" type="text/css" href="/vendor/css-hamburgers/hamburgers.min.css" />
        <link rel="stylesheet" type="text/css" href="/vendor/animsition/css/animsition.min.css" />
        <link rel="stylesheet" type="text/css" href="/vendor/select2/select2.min.css" />
        <link rel="stylesheet" type="text/css" href="/vendor/daterangepicker/daterangepicker.css" />
        <link rel="stylesheet" type="text/css" href="/css/util.css" />
        <link rel="stylesheet" type="text/css" href="/css/main.css" />

        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100">
              <Typography variant="h1" sx={{ my: "30px", fontWeight: "bold", textAlign: "center" }}>
                Inventory System
              </Typography>
              <span className="login100-form-title p-b-48"></span>

              <Box sx={{ mb: "15px" }}>
                <TextField label={"Email"} {...register("username")} type={"text"} placeholder={"Email"} fullWidth />
              </Box>

              <Box sx={{ mb: theme.spacing(2) }}>
                <TextField label={"Password"} {...register("password")} type={"password"} placeholder={"Password"} fullWidth />
              </Box>

              <span className="login100-form-title p-b-48"></span>

              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <Stack direction={"column"} justifyContent={"end"}>
                    <Button type="submit" size="large" style={{ color: "white" }}>
                      Sign In
                    </Button>
                  </Stack>
                </div>
              </div>

              <span className="login100-form-title p-b-48"></span>

              <Button variant="text">
                <Link href="/resetpassword" passHref>
                  Reset password
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
