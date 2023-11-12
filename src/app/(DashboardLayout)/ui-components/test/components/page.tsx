"use client";
import React from "react";
// import { SnackbarOrigin } from "@mui/material/Snackbar";

// import { useCreateSwr } from "@/components/modules/test/api";
// import Alert from "@mui/material/Alert";

// interface State extends SnackbarOrigin {
//   open: boolean;
// }

export default function TestComponentsPage() {
  const clickFunction = function () {};

  return (
    <>
      <div className="my-4">
        <button onClick={clickFunction}>add</button>
        <h4 className="h-10 font-bold">Default TextField</h4>
        <input className="shadow rounded w-full py-2 px-3 text-gray-700 leading-tight hover:bg-slate-400 hover:text-slate-950 focus:outline-none focus:shadow-outline transition duration-1000" />
      </div>
    </>
  );
}
