export class AdditionalParametersConfiguration{
  minutes_validity_code:number;
  concept_wallet_withdrawal:string;
  activate_confirmation_mails:boolean;

  constructor(){
    this.minutes_validity_code = 0;
    this.concept_wallet_withdrawal = '';
    this.activate_confirmation_mails = false;
  }
}
