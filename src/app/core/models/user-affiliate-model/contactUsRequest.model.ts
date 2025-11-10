export class ContactUsRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;

  constructor(fullName: string, email: string, phoneNumber: string, subject: string, message: string) {
    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.subject = subject;
    this.message = message;
  }
}
