
export function intlNumberFormat(number: bigint, languageCode: string){
  const decimalNumber: number = Number(number)/100
    return new Intl.NumberFormat(languageCode, { style: "currency", currency: "USD" }).format(
    decimalNumber,
  )
}

export function toUTCDate(){
  const utcDate: string = new Date().toISOString();
  return utcDate;
}