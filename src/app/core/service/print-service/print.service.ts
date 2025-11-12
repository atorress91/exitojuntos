import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { AffiliateService } from '../affiliate-service/affiliate.service';
import { Invoice } from '@app/core/models/invoice-model/invoice.model';
import { UserAffiliate } from '@app/core/models/user-affiliate-model/user.affiliate.model';
import { CountryService } from '../country-service/country.service';

const today = new Date();

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  countries = [];
  private readonly countryService: CountryService = inject(CountryService);

  constructor(
    private readonly http: HttpClient,
    private readonly affiliateService: AffiliateService,
    private readonly toastr: ToastrService,
  ) {
    this.countryService.getCountries().subscribe({
      next: resp => {
        this.countries = resp;
      },
      error: err => {
        this.toastr.error('error');
      },
    });
  }

  print(header: string[], body: Array<any>, title: string, save?: boolean) {
    const today = new Date();

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: 'letter',
    });

    doc.setFont('Helvetica', 'normal');
    doc.text(title, doc.internal.pageSize.width / 2, 25, { align: 'center' });

    autoTable(doc, {
      theme: 'striped',
      headStyles: {},
      head: [header],
      body: body,
    });

    doc.setProperties({ title: title });

    if (save) {
      const fileName = `${today.getDate()}-${
        today.getMonth() + 1
      }-${today.getFullYear()}-${today.getTime()}.pdf`;
      doc.save(fileName);
    } else {
      doc.output('dataurlnewwindow');
    }
  }

  public downloadInvoice(invoice: Invoice, user: UserAffiliate) {
    this.getImageAsBase64('assets/images/logo-invoice.png').subscribe(
      base64Image => {
        const base64Data = base64Image.replace(
          /^data:image\/(png|jpg);base64,/,
          '',
        );

        const doc = new jsPDF();

        doc.addImage(base64Data, 'PNG', 5, 6, 70, 35);

        autoTable(doc, {
          body: [
            [
              {
                content:
                  'FACTURA: #' +
                  invoice.id +
                  '\nRazón Social: exitojuntos Sharing Evolution S.A.' +
                  '\nC.I.F: 3-101-844938' +
                  '\nDomicilio: San José-Santa Ana, Brasil, Centro Comercial Plaza del Rio, Local #3' +
                  '\nTel/Fax: 50663321239' +
                  '\nCorreo: facturacion@exitojuntosfx.com' +
                  '\nFecha: ' +
                  today.getDate() +
                  '-' +
                  (today.getMonth() + 1) +
                  '-' +
                  today.getFullYear(),
                styles: {
                  halign: 'right',
                },
              },
            ],
          ],
          theme: 'plain',
        });

        autoTable(doc, {
          body: [
            [
              {
                content: 'Datos del cliente',
                styles: {
                  halign: 'left',
                  fontSize: 14,
                  fontStyle: 'bold',
                },
              },
            ],
          ],
          theme: 'plain',
        });

        autoTable(doc, {
          body: [
            [
              {
                content:
                  '' +
                  '\nNombre:' +
                  ' ' +
                  user.name +
                  ' ' +
                  user.lastName +
                  '\nPaís:' +
                  ' ' +
                  user.city,
                styles: {
                  halign: 'left',
                },
              },

              {
                content:
                  '' +
                  '\nTeléfono:' +
                  ' ' +
                  user.phone +
                  '\nNo de Identificación fiscal:' +
                  ' ' +
                  user.name +
                  '\nCorreo:' +
                  ' ' +
                  user.email +
                  '\nDomicilio:' +
                  ' ' +
                  user.address,
                styles: {
                  halign: 'right',
                },
              },
            ],
          ],
          theme: 'plain',
        });

        let totalDiscount = 0;
        let totalTax = 0;
        let subTotal = 0;

        const bodyData = invoice.invoicesDetails.map(detail => {
          totalDiscount += detail.productDiscount;
          subTotal += detail.productPrice;

          return [
            detail.productName,
            detail.productQuantity,
            '$' + detail.productPrice,
            '$' + detail.productDiscount,
            '$' +
              (
                detail.productPrice *
                (detail.productQuantity + detail.productIva / 100)
              ).toFixed(0),
          ];
        });
        autoTable(doc, {
          head: [['Concepto', 'Cantidad', 'Precio', 'Descuento', 'Total']],
          body: bodyData,
          theme: 'striped',
          headStyles: {
            fillColor: '#257272',
          },
        });

        autoTable(doc, {
          body: [
            [
              {
                content: 'Monto pagado:',
                styles: {
                  halign: 'right',
                  fontSize: 14,
                  fontStyle: 'bold',
                },
              },
            ],
            [
              {
                content: 'Total: $' + invoice.totalInvoice,
                styles: {
                  halign: 'right',
                  fontSize: 20,
                  textColor: '#3366ff',
                },
              },
            ],
            [
              {
                content: 'Impuesto incluido',
                styles: {
                  halign: 'right',
                  fontSize: 12,
                  textColor: '#3366ff',
                },
              },
            ],
            [
              {
                content: 'Fecha pago:\n' + invoice.date,
                styles: {
                  halign: 'right',
                },
              },
            ],
          ],
          theme: 'plain',
        });
        return doc.output('dataurlnewwindow');
      },
    );
  }

  getImageAsBase64(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      switchMap(blob => {
        if (blob instanceof Blob) {
          return this.convertBlobToBase64(blob);
        } else {
          return throwError('La respuesta no es un Blob');
        }
      }),
      catchError(error => {
        return throwError(error);
      }),
    );
  }

  convertBlobToBase64(blob: Blob): Observable<string> {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Observable<string>(observer => {
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          observer.next(reader.result);
          observer.complete();
        } else {
          observer.error(
            'El resultado de la lectura del blob no es una cadena',
          );
        }
      };
      reader.onerror = error => {
        observer.error(error);
      };
    });
  }

  getCountryName(id) {
    let countryName = '';
    this.countries.find(item => {
      if (item.id === id) {
        countryName = item.name;
        return true;
      }
    });

    return countryName;
  }
}
