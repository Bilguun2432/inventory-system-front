"use client";

import { useBankAccountTransactionListSwr } from "./api";

export default function BankAccountTransactionList() {
  // const { data, error, isLoading, mutate } = useBankAccountTransactionListSwr();
  const { data, mutate } = useBankAccountTransactionListSwr();
  async function reloadData() {
    await mutate();
  }

  return (
    <>
      <h4>Bank Account Transaction List</h4>

      <button
        type="button"
        className="shadow px-3 py-1 rounded"
        onClick={() => {
          reloadData();
        }}
      >
        Reload
      </button>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Click Me
      </button>

      <table className="w-full table-fixed">
        <thead>
          <tr>
            <th className="border border-slate-300">ID</th>
            <th className="border border-slate-300">bankAccountId</th>
            <th className="border border-slate-300">transactionCode</th>
            <th className="border border-slate-300">transactionId</th>
            <th className="border border-slate-300">amount</th>
            <th className="border border-slate-300">state</th>
            <th className="border border-slate-300">timeTransaction</th>
            <th className="border border-slate-300"></th>
          </tr>
        </thead>

        {typeof data === "object" && data.data && (
          <tbody>
            {data.data.map(function (bankAccountTransaction: any) {
              return (
                <tr key={`product_category_row_${bankAccountTransaction.id}`}>
                  <td className="p-1 border border-slate-300 text-center font-bold">
                    {bankAccountTransaction.id}
                  </td>
                  <td className="border border-slate-300">
                    {bankAccountTransaction.bankAccountId}
                  </td>
                  <td className="border border-slate-300">
                    {bankAccountTransaction.transactionCode}
                  </td>
                  <td className="border border-slate-300">
                    {bankAccountTransaction.transactionId}
                  </td>
                  <td className="border border-slate-300">
                    {bankAccountTransaction.amount}
                  </td>
                  <td className="border border-slate-300">
                    {bankAccountTransaction.state}
                  </td>
                  <td className="border border-slate-300">
                    {bankAccountTransaction.timeTransaction}
                  </td>
                  <td className="border border-slate-300"></td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </>
  );
}
