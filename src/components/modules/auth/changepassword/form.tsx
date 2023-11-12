"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import TextField from "@mui/material/TextField";
import { useChangePasswordSWR } from "./api";
import Link from "@mui/material/Link";
import Loading from "@/components/loader/loader";

export default function ChangePasswordForm() {
  const [entityLoading, setEntityLoading] = useState<boolean>(false);
  const { trigger: triggerChangePassword } = useChangePasswordSWR();
  const theme = useTheme();

  const validationSchema = yup.object({
    currentPassword: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Нууц үг таарах ёстой")
      .required("Нууц үгээ баталгаажуулах шаардлагатай"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const sendData = async (data: any) => {
    console.log(data, "ahhaha");

    try {
      await triggerChangePassword(data);
      alert("Нууц үг амжилттай солигдлоо");
      window.location.href = "/";
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        alert(
          "Нууц үг нь дор хаяж нэг том, жижиг үсэг, тоо, тусгай тэмдэгт мөн хамгийн багадаа 8 тэмдэгтийн урттай байх ёстой.",
        );
      } else {
        alert("Нууц үг алдаатай байна.");
      }
    }
  };

  const onSubmit = async (data: any) => {
    const dataToSend = {
      currentpassword: data.currentPassword,
      password: data.password,
    };
    try {
      sendData(dataToSend);
    } catch (exp) {
      console.error(exp);
    }
  };

  return (
    <Box sx={{ my: theme.spacing(2) }}>
      {entityLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: theme.spacing(4) }}>
            <TextField
              label="Current Password"
              {...register("currentPassword")}
              defaultValue=""
              fullWidth
              size="medium"
              type="password"
              error={!!errors.currentPassword}
              helperText={errors.currentPassword?.message}
            />
          </Box>
          <Box sx={{ mb: theme.spacing(4) }}>
            <TextField
              label="Password"
              {...register("password")}
              defaultValue=""
              fullWidth
              size="medium"
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Box>

          <Box sx={{ mb: theme.spacing(4) }}>
            <TextField
              label="Confirm Password"
              {...register("confirmPassword")}
              defaultValue=""
              fullWidth
              size="medium"
              type="password"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
          </Box>

          <Stack
            direction="row"
            justifyContent="start"
            sx={{ mb: theme.spacing(4) }}
          >
            <Button
              type={"submit"}
              variant="outlined"
              color="primary"
              size="medium"
            >
              Change Password
            </Button>
            <Button variant="text">
              <Link href="/" underline="none">
                back
              </Link>
            </Button>
          </Stack>
        </form>
      )}
    </Box>
  );
}
