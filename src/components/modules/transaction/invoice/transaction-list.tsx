"use client";

import { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import transactionInvoiceApi, { useListByTransactionSwr } from "./api";
import dayjs from "dayjs";
import { TransactionInvoiceType, TransactionType } from "@/types/modules/transaction";
import PaymentState from "../PaymentState";
import { AxiosResponse } from "axios";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { TransactionInvoiceActionType } from "@/types/modules/common";
import MoreActionsNav from "@/components/nav/MoreActionsNav";
import { ModalContext } from "@/components/layout/mui/ModalProvider";
import PaymentCheckResult from "./PaymentCheckResult";

const moreActions = [
  {
    action: TransactionInvoiceActionType.CHECK_PAYMENT_STATE,
    label: "Лавлагаа шалгах",
    icon: <AutorenewIcon />,
  },
];

export default function TransactionInvoiceList({ transaction }: { transaction: TransactionType }) {
  const modalContext = useContext(ModalContext);

  if (modalContext === undefined) {
    throw new Error("ModalContext undefined");
  }
  const { showModal } = modalContext;

  const { data: transactionInvoices, mutate: mutateList } = useListByTransactionSwr(transaction.id);

  function getTransactionInvoiceById(id: number) {
    let result = null;
    for (const ti of transactionInvoices) {
      if (ti.id == id) {
        result = ti;
        break;
      }
    }
    return result;
  }

  function checkPaymentState(id: number) {
    const transactionInvoice = getTransactionInvoiceById(id);

    transactionInvoiceApi.check(transactionInvoice).then((response: AxiosResponse) => {
      const { status, data } = response;
      if (status == 200) {
        showModal("Check result", <PaymentCheckResult {...data} />, "md");
        const { triggerProcess } = data;
        if (triggerProcess && triggerProcess == true) {
          mutateList();
        }
      }
    });
  }

  function onActionClick(id: number, action: string) {
    if (action == TransactionInvoiceActionType.CHECK_PAYMENT_STATE) {
      checkPaymentState(id);
    }
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Төлбөрийн хэлбэр</TableCell>
              <TableCell>Төлбөрийн суваг</TableCell>
              <TableCell>Дүн</TableCell>
              <TableCell>Invoice</TableCell>
              <TableCell>Session</TableCell>
              <TableCell>Төлөв</TableCell>
              <TableCell>Хугацаа</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {transactionInvoices &&
              transactionInvoices.map(function (transactionInvoice: TransactionInvoiceType) {
                return (
                  <TableRow hover key={`transaction_invoice_row_${transactionInvoice.id}`}>
                    <TableCell>{transactionInvoice.id}</TableCell>
                    <TableCell>{transactionInvoice.paymentMethod}</TableCell>
                    <TableCell>{transactionInvoice.paymentChannel}</TableCell>
                    <TableCell>{transactionInvoice.amount}</TableCell>
                    <TableCell>{transactionInvoice.invoiceId}</TableCell>
                    <TableCell>{transactionInvoice.sessionId}</TableCell>
                    <TableCell>
                      <PaymentState state={transactionInvoice.state} />
                    </TableCell>
                    <TableCell>{dayjs(transactionInvoice.timeCreated).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                    <TableCell>
                      <MoreActionsNav id={transactionInvoice.id ?? 0} actions={moreActions} onActionClick={onActionClick} />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
