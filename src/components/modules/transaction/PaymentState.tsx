"use client";

import Chip from "@mui/material/Chip";
import { PaymentStateType } from "@/types/modules/common";

type VariationType = "success" | "error" | "warning" | "default";

export default function PaymentState({ state }: { state: PaymentStateType }) {
  function getColorVariation(): VariationType {
    const variations = {
      success: [PaymentStateType.PAID],
      danger: [
        PaymentStateType.FAILED,
        PaymentStateType.CANCELED,
        PaymentStateType.DECLINED,
      ],
      warning: [PaymentStateType.EXPIRED],
    };

    if (variations.success.includes(state)) {
      return "success";
    } else if (variations.danger.includes(state)) {
      return "error";
    } else if (variations.warning.includes(state)) {
      return "warning";
    } else {
      return "default";
    }
  }

  return <Chip label={state} color={getColorVariation()} />;
}
