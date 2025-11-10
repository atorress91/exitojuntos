export class SecretQuestion {
    id: number;
    password: string;
    secret_question: string;
    secret_answer:string;
  
    constructor() {
      this.id = 0;
      this.secret_question = '';
      this.password = '';
      this.secret_answer='';
    }
  }
  