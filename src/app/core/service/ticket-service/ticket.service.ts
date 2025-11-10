import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Response } from '@app/core/models/response-model/response.model';
import { TicketRequest } from '@app/core/models/ticket-model/ticketRequest.model';
import { BehaviorSubject, map } from 'rxjs';

const httpOptions = {

  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': environment.tokens.accountService.toString(),
    'X-Client-ID': environment.tokens.clientID.toString()
  }),
};

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  urlApi: string;
  private currentTicket = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    this.urlApi = environment.apis.accountService;
  }

  createTicket(ticket: TicketRequest) {
    return this.http
      .post<Response>(
        this.urlApi.concat('/ticket'),
        ticket,
        httpOptions
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getAllTicketsByAffiliateId(affiliateId: number) {
    return this.http
      .get<Response>(`${this.urlApi}/ticket/GetAllTickets/${affiliateId}`, httpOptions)
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  setTicket(ticket: any) {
    this.currentTicket.next(ticket);
  }

  getTicket() {
    return this.currentTicket.asObservable();
  }
}
