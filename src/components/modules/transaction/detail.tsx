"use client";

import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import transactionApi, { useDetailSwr } from "./api";
import { TransactionType } from "@/types/modules/transaction";
import PaymentState from "./PaymentState";
import dayjs from "dayjs";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import MoreActionsNav, {
  MenuActionDataType,
} from "@/components/nav/MoreActionsNav";
import { TransactionProductActionType } from "@/types/modules/common";
import { AxiosError, AxiosResponse } from "axios";

interface DetailProps {
  id: number;
  onLoadSuccess?: (t: TransactionType) => void;
}

const moreActions: MenuActionDataType[] = [
  {
    label: "Биелүүлэх",
    action: TransactionProductActionType.FULFILL,
    icon: <PlaylistAddCheckIcon />,
  },
];

export default function TransactionDetail({ id, onLoadSuccess }: DetailProps) {
  const { data: transactionDetail, error } = useDetailSwr(id);

  useEffect(
    function () {
      if (onLoadSuccess) {
        onLoadSuccess(transactionDetail);
      }
    },
    [transactionDetail, error, onLoadSuccess],
  );

  function onActionClick(id: number, action: string) {
    if (action == TransactionProductActionType.FULFILL) {
      transactionApi
        .fulfill(transactionDetail)
        .then(function (response: AxiosResponse) {
          const { status, data } = response;
          console.log({ status, data });
        })
        .catch(function (error: AxiosError) {
          console.log({ error });
        });
    }
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Гүйлгээний дугаар</TableCell>
              <TableCell>Нийт үнэ</TableCell>
              <TableCell>Төлөв</TableCell>
              <TableCell>Төлбөр</TableCell>
              <TableCell>Үүссэн цаг</TableCell>
              <TableCell>Дууссан цаг</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          {typeof transactionDetail === "object" && (
            <TableBody>
              {transactionDetail && (
                <TableRow>
                  <TableCell>{transactionDetail.id}</TableCell>
                  <TableCell>{transactionDetail.transactionCode}</TableCell>
                  <TableCell>
                    {transactionDetail.priceTotal.toLocaleString("en-US")}
                  </TableCell>
                  <TableCell>{transactionDetail.state}</TableCell>
                  <TableCell>
                    <PaymentState state={transactionDetail.statePayment} />
                  </TableCell>
                  <TableCell>
                    {transactionDetail.timeCreated && (
                      <>
                        {dayjs(transactionDetail.timeCreated).format(
                          "YYYY-MM-DD HH:mm:ss",
                        )}
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    {transactionDetail.timeCompleted && (
                      <>
                        {dayjs(transactionDetail.timeCompleted).format(
                          "YYYY-MM-DD HH:mm:ss",
                        )}
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    <MoreActionsNav
                      id={transactionDetail.id}
                      actions={moreActions}
                      onActionClick={onActionClick}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
