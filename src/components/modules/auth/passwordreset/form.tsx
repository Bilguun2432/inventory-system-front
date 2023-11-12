"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { usePasswordReset } from "./api";
import Link from "next/link";
import Loading from "@/components/loader/loader";

// interface FormProps {
//   id?: number;
//   authPermission?: AuthPermissionType;
//   onComplete?: () => void;
// }
// props: FormProps

export default function AuthPermissionForm() {
  const [entityLoading, setEntityLoading] = useState<boolean>(false);
  const { trigger: triggerCreate } = usePasswordReset();
  const theme = useTheme();

  useEffect(function () {}, []);

  const validationSchema = yup.object({
    email: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data: any) => {
    try {
      const result = await triggerCreate(data);
      console.log("res=>>", result);
      alert("Нууц үг шинэчлэх хүсэлтийг илгээсэн");
      window.location.href = "/auth/login";
    } catch (exp) {
      console.error(exp);
      alert("Майл буруу байна");
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
              label={"Email"}
              {...register("email")}
              defaultValue={""}
              fullWidth
              size="medium"
              error={errors.email ? true : false}
              helperText={errors.email?.message}
            />
          </Box>

          <Stack
            direction={"row"}
            justifyContent={"start"}
            sx={{ mb: theme.spacing(4) }}
          >
            <Button
              type={"submit"}
              variant="outlined"
              color="primary"
              size="medium"
            >
              reset password
            </Button>
            <Button variant="text">
              <Link href="/auth/login" passHref>
                back
              </Link>
            </Button>
          </Stack>
        </form>
      )}
    </Box>
  );
}
