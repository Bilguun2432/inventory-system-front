"use client";

import { useEffect, useState, ReactNode } from "react";
import { useSession } from "next-auth/react";
import admnAxios from "@/lib/axios/admn/axios";
import fileAxios from "@/lib/axios/file/axios";
import cmrcAxios from "@/lib/axios/cmrc/axios";
import { useRouter } from "next/navigation";
import Loading from "@/components/loader/loader";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const { status: sessionStatus, data: sessionData } = useSession();

  console.log({ sessionStatus, session: sessionData });

  useEffect(
    function () {
      if (sessionStatus === "authenticated") {
        const { tokens }: any = sessionData;

        admnAxios.defaults.headers.common["Authorization"] = `Bearer ${tokens.access}`;

        fileAxios.defaults.headers.common["Authorization"] = `Bearer ${tokens.access}`;

        cmrcAxios.defaults.headers.common["Authorization"] = `Bearer ${tokens.access}`;

        setLoading(false);
      } else if (sessionStatus === "unauthenticated") {
        router.push("/auth/login");
      }
    },
    [router, sessionStatus, sessionData],
  );

  return <>{loading ? <Loading /> : <>{children}</>}</>;
}
