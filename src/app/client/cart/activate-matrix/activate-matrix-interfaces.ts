export interface PaymentDetails {
  matrixName: string;
  matrixType: string;
  matrixCost: number;
  gatewayFee: string;
  totalAmount: string;
}

export interface PaymentTranslations {
  activateMatrix: string;
  matrixType: string;
  totalCost: string;
  gatewayFee: string;
  matrixCost: string;
  totalToPay: string;
  paymentWarning: string;
  gatewayFeeInfo: string;
  confirmPayment: string;
  cancel: string;
}
