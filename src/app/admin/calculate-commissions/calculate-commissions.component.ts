import {Component, OnInit} from '@angular/core';

import Swal from 'sweetalert2';
import {WalletService} from "../../core/service/wallet-service/wallet.service";
import {TranslatePipe} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-calculate-commissions',
  templateUrl: './calculate-commissions.component.html',
  standalone: true,
  imports: [
    TranslatePipe,
    RouterLink,
    NgbAlert,
    FormsModule,
    NgClass
  ]
})
export class CalculateCommissionsComponent implements OnInit {
  // Campos para liquidación
  selectedMonth: number;
  selectedYear: number;
  startDate: string;
  endDate: string;
  commissionType: string = 'residual'; // 'residual' o 'pasivo'
  calculationMode: string = 'simulate'; // 'simulate' o 'final'
  isProcessing: boolean = false;

  // Nuevos campos
  percentageToPay: number = 4; // Porcentaje a pagar (por defecto 4%)
  waitingDays: number = 2; // Días de espera (por defecto 2)

  months: { value: number, label: string }[] = [
    {value: 1, label: 'Enero'},
    {value: 2, label: 'Febrero'},
    {value: 3, label: 'Marzo'},
    {value: 4, label: 'Abril'},
    {value: 5, label: 'Mayo'},
    {value: 6, label: 'Junio'},
    {value: 7, label: 'Julio'},
    {value: 8, label: 'Agosto'},
    {value: 9, label: 'Septiembre'},
    {value: 10, label: 'Octubre'},
    {value: 11, label: 'Noviembre'},
    {value: 12, label: 'Diciembre'}
  ];

  constructor(private walletService: WalletService) {
    // Inicializar con el mes anterior (último mes completo)
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    this.selectedMonth = lastMonth.getMonth() + 1;
    this.selectedYear = lastMonth.getFullYear();
  }

  ngOnInit() {
    this.updateDateRange();
  }


  onMonthChange() {
    this.updateDateRange();
  }

  updateDateRange() {
    // Calcular primer y último día del mes seleccionado
    const firstDay = new Date(this.selectedYear, this.selectedMonth - 1, 1);
    const lastDay = new Date(this.selectedYear, this.selectedMonth, 0);

    this.startDate = this.formatDate(firstDay);
    this.endDate = this.formatDate(lastDay);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  isMonthDisabled(monthValue: number): boolean {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    // Calcular el mes mínimo permitido (mes anterior al actual)
    const minMonth = currentMonth - 1;

    // Si el año seleccionado es menor al actual
    if (this.selectedYear < currentYear) {
      // Solo permitir diciembre si es el mes anterior permitido
      if (this.selectedYear === currentYear - 1 && currentMonth === 1) {
        return monthValue !== 12;
      }
      return true;
    }

    // Si el año seleccionado es mayor al actual, deshabilitar
    if (this.selectedYear > currentYear) {
      return true;
    }

    // Si es el año actual, deshabilitar meses anteriores al mes permitido (mes anterior al actual)
    return monthValue < minMonth;
  }

  processLiquidation() {
    if (this.isProcessing) {
      return;
    }

    const actionText = this.calculationMode === 'simulate' ? 'simular' : 'ejecutar';
    const typeText = this.commissionType === 'residual' ? 'Residuales' : 'Pasivo';

    Swal.fire({
      title: '¿Está seguro?',
      html: `Está a punto de <strong>${actionText}</strong> la liquidación de comisiones <strong>${typeText}</strong><br>` +
        `Período: ${this.startDate} al ${this.endDate}<br>` +
        `Porcentaje a pagar: <strong>${this.percentageToPay}%</strong><br>` +
        `Días de espera: <strong>${this.waitingDays} días</strong>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.calculationMode === 'simulate' ? 'Simular' : 'Liquidar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.executeLiquidation();
      }
    });
  }

  executeLiquidation() {
    this.isProcessing = true;

    // Mostrar loading
    Swal.fire({
      title: 'Procesando...',
      html: 'Por favor espere mientras se procesa la liquidación.<br>Este proceso puede tardar varios minutos.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    }).then();

    // Por ahora simulo una llamada con timeout
    setTimeout(() => {
      this.isProcessing = false;

      Swal.fire({
        title: this.calculationMode === 'simulate' ? 'Simulación Completada' : 'Liquidación Completada',
        html: `<strong>Tipo:</strong> ${this.commissionType === 'residual' ? 'Residuales' : 'Pasivo'}<br>` +
          `<strong>Período:</strong> ${this.startDate} al ${this.endDate}<br>` +
          `<strong>Porcentaje:</strong> ${this.percentageToPay}%<br>` +
          `<strong>Días de espera:</strong> ${this.waitingDays} días<br>` +
          `<strong>Modo:</strong> ${this.calculationMode === 'simulate' ? 'Simulación' : 'Cálculo Final'}`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then();
    }, 2000);
  }
}
