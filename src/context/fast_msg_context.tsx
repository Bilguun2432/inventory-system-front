import React, { createContext, PropsWithChildren, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { MessageType } from "@/types/component";

interface MessageContextValue {
  data: string | null;
  setAlertMsg: (msg: string, MessageType: MessageType) => void;
}

interface MessageObject {
  message: string | null;
  type: MessageType;
}

const FastMsgContext = createContext<MessageContextValue | undefined>(
  undefined,
);

export const ErrorCtx: React.FC<PropsWithChildren> = (props) => {
  const [errorMsg, setErrorMsg] = useState<MessageObject>({
    message: null,
    type: MessageType.info,
  });

  const updateMsgStatus = (msg: string, type: MessageType) => {
    setErrorMsg((prevState) => ({ ...prevState, message: msg, type: type }));
    setTimeout(() => {
      setErrorMsg((prevState) => ({ ...prevState, message: null }));
    }, 3000);
  };

  return (
    <FastMsgContext.Provider
      value={{ data: errorMsg.message, setAlertMsg: updateMsgStatus }}
    >
      {errorMsg.message ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={true}
          message={"errorContext?.data"}
          key={"smackbarComponent"}
        >
          <Alert severity={errorMsg.type} sx={{ width: "100%" }}>
            {errorMsg?.message}
          </Alert>
        </Snackbar>
      ) : null}

      {props.children}
    </FastMsgContext.Provider>
  );
};

export default FastMsgContext;
