import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBoundStore } from "../store";
import { useEffect } from "react";
import { formatAsIntlNumberDollars } from "../utils/format";

export interface newReport {
  year: number;
  series: string;
}

const schema = z.object({
  year: z.number({ message: "Year must be a number." }),
  series: z
    .string({ message: "Receive date must be a date string." }),
});

export type FormFields = z.output<typeof schema>;
export type FormInputFields = z.input<typeof schema>;

function ReportsPage(){

    const currentReport = useBoundStore((store) => store.currentReport);
    const paymentSummaryRows = useBoundStore((store) => store.paymentSummaryRows);
    const expenseSummaryRows = useBoundStore((store) => store.expenseSummaryRows);
    const seriesSummary = useBoundStore((store) => store.seriesSummary);
    const properties = useBoundStore((store) => store.propertiesArray);
    const units = useBoundStore((store) => store.unitsArray);
    const leases = useBoundStore((store) => store.leasesArray);
    const payments = useBoundStore((store) => store.paymentsArray);
    const expenses = useBoundStore((store) => store.expensesArray);
    const updateCurrentReport = useBoundStore((store) => store.updateCurrentReport);
    const summarizePaymentsByAddressAndYear = useBoundStore(
      (store) => store.summarizePaymentsByAddressAndYear,
    );
    const summarizeExpensesByAddressAndYear = useBoundStore(
      (store) => store.summarizeExpensesByAddressAndYear,
    );
    const summarizePaymentsBySeries = useBoundStore((store) => store.summarizePaymentsBySeries);
    const expenseByPropertyId = new Map(
      expenseSummaryRows.map((row) => [row.propertyId, row.totalAmountCents]),
    );

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<FormInputFields, unknown, FormFields>({
        resolver: zodResolver(schema),
    });


     const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));
    
          const newReport: newReport = {
            year: data.year,
            series: data.series,
          };
          updateCurrentReport(newReport);
          summarizePaymentsByAddressAndYear(
            properties,
            units,
            leases,
            payments,
            data.series,
            data.year,
          );
          summarizeExpensesByAddressAndYear(expenses, data.year);
          summarizePaymentsBySeries(data.series);
          reset();
        } catch {
          setError("root", { message: "Form could not be submitted." });
        }
      };

    useEffect(() => {
        if (isSubmitSuccessful) {
          reset();
        }
      }, [isSubmitSuccessful, reset]);

    return(
        <>
            <form
            className="gap-5 flex flex-col mt-5 min-w-[50vw] items-center"
            onSubmit={handleSubmit(onSubmit)}
        >
            <input
            {...register("year",{ valueAsNumber: true })}
            type="number"
            defaultValue={Number(new Date().getFullYear())}
            className="border-2 border-black text-center p-2 min-w-[40vw]"
            />
            {errors.year && <div className="text-red-500">{errors.year.message}</div>}

            <input
            {...register("series")}
            list='series-options'
            id='series'
            placeholder="Enter Series Number"
            className="border-2 border-black text-center p-2 min-w-[40vw]"
            />
            <datalist id="series-options">
                <option value="Albany" />
                <option value="Troy" />
            </datalist>
            {errors.series && <div className="text-red-500">{errors.series.message}</div>}

            <button
            disabled={isSubmitting}
            type="submit"
            className="border-2 border-black m-5 text-center cursor-pointer max-w-[20vw] p-2"
            >
            {isSubmitting ? "loading..." : "Submit"}
            </button>

            {errors.root && (
            <div className="text-red-500">{errors.root.message}</div>
            )}
            </form>

            <div className="mt-8 px-8">
                <h2 className="text-xl font-semibold mb-3">
                  Payment Summary for {currentReport.series || "Series"} ({currentReport.year || "Year"})
                </h2>
                {paymentSummaryRows.length === 0 ? (
                  <p>No matching payments found for that series/year.</p>
                ) : (
                  <div>
                    <ul className="space-y-2">
                      {paymentSummaryRows.map((summaryRow) => (
                        <li key={summaryRow.propertyId} className="border-2 border-black p-3 rounded">
                          Address: {summaryRow.propertyAddress} 
                           | Payments: {summaryRow.paymentCount} 
                           | Total:{" "} 
                          {formatAsIntlNumberDollars(summaryRow.totalAmountCents, "en")}
                           | Expenses:
                          {formatAsIntlNumberDollars(expenseByPropertyId.get(summaryRow.propertyId) ?? 0n, 'en')}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5">
                      <p className="border-2 border-black p-3 rounded">Series Name: {seriesSummary.seriesId} | Total Payments: {seriesSummary.totalPaymentCount} | Total Payment Value: {formatAsIntlNumberDollars(seriesSummary.grandTotalPaymentAmountCents, 'en')} | Total Expenses: {formatAsIntlNumberDollars(seriesSummary.grandTotalExpensesAmountCents, 'en')}</p>
                    </div>
                  </div>
                )}
            </div>
        
        </>
    )
}

export default ReportsPage;