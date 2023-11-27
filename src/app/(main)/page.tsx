"use client";

import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { signOut, useSession } from "next-auth/react";
import CustomizedBreadcrumbs from "@/components/breadcrumbs/breadcrumb";
import StorageList from "@/components/modules/storage/list";
import { useRouter } from "next/navigation";
import { useDetailEmailSwr } from "@/components/modules/storage/userapi";

export default function HomePage() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const { data: sessionData } = useSession();
  function onDatePickerChange(date: Date) {
    console.log(date.toLocaleTimeString());
    setStartDate(date);
  }
  console.log("sessionData", sessionData);

  const router = useRouter();

  const { data } = useSession();
  const { data: authUser } = useDetailEmailSwr(data?.user?.email);

  useEffect(() => {
    if (authUser && authUser?.authRole?.name === "Employee") {
      router.push("/employee/product/");
    }
  }, [authUser, router]);

  return (
    <>
      <div className="">
        <CustomizedBreadcrumbs />
        <StorageList />
      </div>
    </>
  );
}
