import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { Ticket } from '@app/core/models/ticket-model/ticket.model';
import { UserService } from '@app/core/service/user-service/user.service';

@Pipe({
    name: 'adminResponded',
    standalone: true
})
export class AdminRespondedPipe implements PipeTransform {
  adminIds$: Observable<number[]>;

  constructor(private userService: UserService) {
    this.adminIds$ = this.userService.getAll().pipe(
      map(users => users.filter(user => user.rol_name === 'Administrador').map(admin => admin.id))
    );
  }

  transform(ticket: Ticket): Observable<boolean> {
    if (!ticket || !ticket.messages) {
      return of(false);
    }
    return this.adminIds$.pipe(
      map(adminIds => ticket.messages.some(message => adminIds.includes(message.userId)))
    );
  }
}
