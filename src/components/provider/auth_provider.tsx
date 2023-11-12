"use client";

import React, { useEffect, useState, ReactNode } from "react";
import admnAxios from "@/lib/axios/admn/axios";
import fileAxios from "@/lib/axios/file/axios";
import cmrcAxios from "@/lib/axios/cmrc/axios";
import { useRouter } from "next/navigation";
import Loading from "@/components/loader/loader";
import { useSession } from "next-auth/react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const { status: sessionStatus, data: sessionData } = useSession();

  console.log({ sessionStatus, session: sessionData });

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      const accessToken = sessionData.tokens?.access;

      if (accessToken) {
        admnAxios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        fileAxios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        cmrcAxios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      }

      setLoading(false);
    } else if (sessionStatus === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [router, sessionStatus, sessionData]);

  return <>{loading ? <Loading /> : <>{children}</>}</>;
}
