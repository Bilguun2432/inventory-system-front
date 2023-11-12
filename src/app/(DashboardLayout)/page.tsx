"use client";

import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { signOut, useSession } from "next-auth/react";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CustomizedBreadcrumbs from "@/components/breadcrumbs/breadcrumb";
import React from "react";

export default function HomePage() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const { data: sessionData } = useSession();
  function onDatePickerChange(date: Date) {
    console.log(date.toLocaleTimeString());
    setStartDate(date);
  }
  console.log("sessionData", sessionData);

  return (
    <>
      <div className="">
        <CustomizedBreadcrumbs />
        <h4>Home Page</h4>
        <Button
          variant="contained"
          onClick={() => {
            signOut();
          }}
        >
          Signout
        </Button>
        <div className="grid grid-cols-2 justify-center">
          <TableContainer>
            <Table className="border-separate border-spacing-2 border border-slate-400">
              <TableBody>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>{sessionData?.user?.email}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <DatePicker selected={startDate} onChange={onDatePickerChange} />
        {JSON.stringify(sessionData)}
      </div>
    </>
  );
}
