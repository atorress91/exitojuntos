export class PurchasePerMonthDto {
  year: number;
  month: number;
  totalPurchases: number;
}

export class PurchasesResponse {
  currentYearPurchases: PurchasePerMonthDto[];
  previousYearPurchases: PurchasePerMonthDto[];
}
