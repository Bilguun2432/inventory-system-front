"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useNewPassword } from "./api";
import { AuthPermissionType } from "@/types/modules/auth_permission";
import Loading from "@/components/loader/loader";

interface FormProps {
  authPermission?: AuthPermissionType;
  token: string;
  onComplete?: () => void;
}

export default function ChangePasswordForm(props: FormProps) {
  const [entityLoading, setEntityLoading] = useState<boolean>(false);
  const { trigger: triggerChangePassword } = useNewPassword(props.token);
  const theme = useTheme();

  useEffect(() => {}, []);

  const validationSchema = yup.object({
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
    try {
      await triggerChangePassword(data);
      alert("Нууц үг амжилттай солигдлоо");
      window.location.href = "/auth/login";
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        alert(
          "Нууц үг нь дор хаяж нэг том, жижиг үсэг, тоо, тусгай тэмдэгт мөн хамгийн багадаа 8 тэмдэгтийн урттай байх ёстой.",
        );
      } else {
        alert("Token-ий хугацаа дууссан эсвэл олдсонгүй.");
      }
    }
  };

  const onSubmit = async (data: any) => {
    try {
      sendData({ password: data["password"] });

      // window.location.href = "/auth/login";
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
              type="submit"
              variant="outlined"
              color="primary"
              size="medium"
            >
              Change Password
            </Button>
          </Stack>
        </form>
      )}
    </Box>
  );
}
