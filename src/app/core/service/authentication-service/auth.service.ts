import { Injectable, signal, computed, effect } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Signin } from '@app/core/models/signin-model/signin.model';
import { User } from '@app/core/models/user-model/user.model';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { environment } from '@environments/environment';
import { Response } from '@app/core/models/response-model/response.model';
import { ToastrService } from 'ngx-toastr';

import { CartService } from '../cart.service/cart.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: environment.tokens.accountService.toString(),
    'X-Client-ID': environment.tokens.clientID.toString(),
  }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Signals para el estado del usuario
  private readonly currentUserAffiliate = signal<UserAffiliate | null>(null);
  private readonly currentUserAdmin = signal<User | null>(null);

  // Computed signals para acceso reactivo
  public userAffiliate = this.currentUserAffiliate.asReadonly();
  public userAdmin = this.currentUserAdmin.asReadonly();

  // Computed signals para verificar si está logueado
  public isAffiliateLoggedIn = computed(
    () => this.currentUserAffiliate() !== null,
  );
  public isAdminLoggedIn = computed(() => this.currentUserAdmin() !== null);
  public isLoggedIn = computed(
    () => this.isAffiliateLoggedIn() || this.isAdminLoggedIn(),
  );

  // Mantener BehaviorSubjects para compatibilidad (deprecated)
  private readonly currentUserAffiliateSubject: BehaviorSubject<UserAffiliate>;
  public currentUserAffiliateObs: Observable<UserAffiliate>;

  private readonly currentUserAdminSubject: BehaviorSubject<User>;
  public currentUserAdminObs: Observable<User>;
  private readonly urlApi: string;

  constructor(
    private readonly http: HttpClient,
    private readonly toastr: ToastrService,
    private readonly cartService: CartService,
  ) {
    // Inicializar desde localStorage
    const storedAffiliate = this.getFromLocalStorage('currentUserAffiliate');
    const storedAdmin = this.getFromLocalStorage('currentUserAdmin');

    this.currentUserAffiliate.set(storedAffiliate);
    this.currentUserAdmin.set(storedAdmin);

    // Mantener BehaviorSubjects para compatibilidad
    this.currentUserAffiliateSubject = new BehaviorSubject<UserAffiliate>(
      storedAffiliate,
    );
    this.currentUserAdminSubject = new BehaviorSubject<User>(storedAdmin);
    this.currentUserAffiliateObs =
      this.currentUserAffiliateSubject.asObservable();
    this.currentUserAdminObs = this.currentUserAdminSubject.asObservable();
    this.urlApi = environment.apis.accountService;

    // Escuchar cambios en localStorage desde otras pestañas
    this.setupStorageListener();

    // Effect para sincronizar signals con BehaviorSubjects
    effect(() => {
      this.currentUserAffiliateSubject.next(this.currentUserAffiliate());
    });

    effect(() => {
      this.currentUserAdminSubject.next(this.currentUserAdmin());
    });
  }

  // Compatibilidad con código existente
  public get currentUserAffiliateValue(): UserAffiliate {
    return this.currentUserAffiliate();
  }

  public get currentUserAdminValue(): User {
    return this.currentUserAdmin();
  }

  private getFromLocalStorage(key: string): any {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      return null;
    }
  }

  private setupStorageListener(): void {
    // Escuchar cambios en localStorage desde otras pestañas
    globalThis.addEventListener('storage', (event: StorageEvent) => {
      if (event.key === 'currentUserAffiliate') {
        const newValue = event.newValue ? JSON.parse(event.newValue) : null;
        this.currentUserAffiliate.set(newValue);
      } else if (event.key === 'currentUserAdmin') {
        const newValue = event.newValue ? JSON.parse(event.newValue) : null;
        this.currentUserAdmin.set(newValue);
      }
    });
  }

  loginUser(userCredentials: Signin) {
    return this.http
      .post<Response>(
        this.urlApi.concat('/auth/login'),
        userCredentials,
        httpOptions,
      )
      .pipe(
        map((response: Response) => {
          if (response.success) {
            this.valiteUserType(response);
          }
          return response;
        }),
      );
  }

  valiteUserType(response: Response) {
    let isUserAffiliate = response.data.is_affiliate;
    if (isUserAffiliate) {
      this.setUserAffiliateValue(response.data);
    } else {
      this.setUserAdminValue(response.data);
    }
  }

  UserAffiliateEmailConfirmation(userName: string) {
    console.log(httpOptions);
    return this.http
      .put(
        this.urlApi.concat('/useraffiliateinfo/email_confirmation/', userName),
        {},
        httpOptions,
      )
      .pipe(
        map(data => {
          return data;
        }),
        catchError(error => {
          return throwError(() => error);
        }),
      );
  }

  logoutUser() {
    this.cartService.removeAllCart();
    localStorage.removeItem('currentUserAdmin');
    localStorage.removeItem('currentUserAffiliate');

    // Actualizar signals
    this.currentUserAffiliate.set(null);
    this.currentUserAdmin.set(null);

    this.toastr.clear();

    return of({ success: false });
  }

  public setUserAffiliateValue(user: UserAffiliate) {
    localStorage.setItem('currentUserAffiliate', JSON.stringify(user));

    // Actualizar signal
    this.currentUserAffiliate.set(user);
  }

  public setUserAdminValue(user: User) {
    localStorage.setItem('currentUserAdmin', JSON.stringify(user));

    // Actualizar signal
    this.currentUserAdmin.set(user);
  }

  getLoginMovementsByAffiliatedId(affiliateId: number) {
    return this.http
      .get<Response>(
        `${this.urlApi}/auth/login_movements/${affiliateId}`,
        httpOptions,
      )
      .pipe(
        map(response => {
          return response.data;
        }),
      );
  }

  fetchIpAddress(): Observable<string> {
    return this.http
      .get<{ ip: string }>('https://api.ipify.org?format=json')
      .pipe(map(data => data.ip));
  }
}
