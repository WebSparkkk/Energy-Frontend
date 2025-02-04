import { httpService } from "@/core/lib/services";
import { ANALYSIS_SPECIFIC_TYPES, ANALYSIS_TRANSACTION_TYPES, TAnalysisSpecificType, TAnalysisTransactionType } from "./types";

export async function getRevenueAnalysis({
  toDate,
  fromDate,
  transactionType,
  specificType
}:{
  toDate: string,
  fromDate: string,
  transactionType: TAnalysisTransactionType,
  specificType: TAnalysisSpecificType
}) {
  const transactionTypeParam = transactionType !== ANALYSIS_TRANSACTION_TYPES.ALL ? `&transactionType=${transactionType}` : ""
  const transactionSpecificTypeParam = specificType !== ANALYSIS_SPECIFIC_TYPES.ALL ? `&specificType=${specificType}` : ""

  const res = await httpService.get(`/treasury/analyze?toDate=${toDate}&fromDate=${fromDate}${transactionTypeParam}${transactionSpecificTypeParam}`)
  return res.data
}