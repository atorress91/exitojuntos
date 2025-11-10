export class WalletRequestRequest {
  id?: number;
  status?: number;
  affiliateId: number = 0;
  affiliateName: string = '';
  userPassword: string = '';
  verificationCode: string = '';
  amount: number = 0;
  concept: string = '';
  retention?: number;
  isSelected?: boolean;
}
