
export function formatAsIntlNumberDollars(number: bigint, languageCode: string){
  const decimalNumber: number = Number(number)/100
    return new Intl.NumberFormat(languageCode, { style: "currency", currency: "USD" }).format(
    decimalNumber,
  )
}

export function formatAsBigIntCents(number: number){
  return BigInt(number*100);
}


export function toUTCDate(){
  const utcDate: string = new Date().toISOString();
  return utcDate;
}