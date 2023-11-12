"use client";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import Link from "next/link";
import MoreActionsNav, { MenuActionDataType } from "@/components/nav/MoreActionsNav";
import { TransactionProductActionType } from "@/types/modules/common";
import { useListByTransactionSwr } from "./api";
import dayjs from "dayjs";
import { TransactionType, TransactionProductType } from "@/types/modules/transaction";
import { fsUrl } from "@/lib/util/file_server";
import TransactionProductCharge from "./charge";
import TransactionProductNumber from "./number";
import TransactionProductSim from "./sim";

const moreActions: MenuActionDataType[] = [
  {
    label: "Биелүүлэх",
    action: TransactionProductActionType.FULFILL,
    icon: <PlaylistAddCheckIcon />,
  },
];

export default function TransactionList({ transaction }: { transaction: TransactionType }) {
  const { data } = useListByTransactionSwr(transaction.id);

  function onActionClick(id: number, action: string) {
    if (action == TransactionProductActionType.FULFILL) {
      console.log("yes");
    }
  }

  function getProductImagePath(tp: TransactionProductType): string {
    if (!tp) {
      return "/image/image_blank.jpg";
    }
    if (tp.product?.images) {
      if (tp.product?.images.length > 0) {
        return fsUrl(tp.product?.images[0].filePath);
      }
    }
    return "/image/image_blank.jpg";
  }

  return (
    <>
      {data &&
        data.map(function (transactionProduct: TransactionProductType) {
          return (
            <Card sx={{ mb: 2 }} key={`transaction_product_card_${transactionProduct.id}`}>
              <Grid container spacing={1}>
                <Grid item md={2}>
                  <CardMedia component="img" sx={{ width: "100%" }} image={getProductImagePath(transactionProduct)} alt="Live from space album cover" />
                </Grid>
                <Grid item md={10}>
                  <CardContent>
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{ mb: 1 }}>
                      <Link href={`/product/${transactionProduct.product?.id}/detail`}>
                        <Button variant={"text"} color={"primary"}>
                          {transactionProduct.product?.name}
                        </Button>
                      </Link>
                      <MoreActionsNav id={transactionProduct.id} actions={moreActions} onActionClick={onActionClick} />
                    </Stack>

                    <Table size="small" sx={{ mb: 1 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Дугаар</TableCell>
                          <TableCell>Нэгж үнэ</TableCell>
                          <TableCell>Тоо</TableCell>
                          <TableCell>Үнэ</TableCell>
                          <TableCell>Төлөв</TableCell>
                          <TableCell>Үүссэн</TableCell>
                          <TableCell>Дууссан</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{transactionProduct.accNumber}</TableCell>
                          <TableCell>{transactionProduct.priceUnit}</TableCell>
                          <TableCell>{transactionProduct.amount}</TableCell>
                          <TableCell>{transactionProduct.priceTotal}</TableCell>
                          <TableCell>{transactionProduct.state}</TableCell>
                          <TableCell>{dayjs(transactionProduct.timeCreated).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                          <TableCell>{transaction.timeCompleted && <>{dayjs(transactionProduct.timeCompleted).format("YYYY-MM-DD HH:mm:ss")}</>}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    <Grid container sx={{ justifyContent: "flex-end" }}>
                      <Grid item md={10}>
                        {transactionProduct.charge && <TransactionProductCharge charge={transactionProduct.charge} />}
                        {transactionProduct.number && <TransactionProductNumber number={transactionProduct.number} />}
                        {transactionProduct.sim && <TransactionProductSim sim={transactionProduct.sim} />}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          );
        })}
    </>
  );
}
