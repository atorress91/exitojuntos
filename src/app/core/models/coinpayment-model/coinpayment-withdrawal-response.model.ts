export class CoinPaymentWithdrawalResponse {
  error?: string;
  result?: { [key: string]: WithdrawalInfo };
}

export class WithdrawalInfo {
  error?: string;
  id?: string;
  status?: number;
  amount?: string;
}
