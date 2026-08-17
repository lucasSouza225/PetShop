import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ToastService, ToastMessage } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 9999;">
      <div *ngFor="let toast of toasts$ | async"
           class="toast show"
           role="alert"
           [ngClass]="{
             'bg-success': toast.type === 'success',
             'bg-danger': toast.type === 'error',
             'bg-warning': toast.type === 'warning',
             'bg-info': toast.type === 'info'
           }">
        <div class="toast-header"
             [ngClass]="{
               'text-white bg-success': toast.type === 'success',
               'text-white bg-danger': toast.type === 'error',
               'text-dark bg-warning': toast.type === 'warning',
               'text-white bg-info': toast.type === 'info'
             }">
          <i class="fas"
             [ngClass]="{
               'fa-check-circle': toast.type === 'success',
               'fa-exclamation-circle': toast.type === 'error',
               'fa-exclamation-triangle': toast.type === 'warning',
               'fa-info-circle': toast.type === 'info'
             }"></i>
          <strong class="ms-2 me-auto">{{ toast.title }}</strong>
          <button type="button" class="btn-close" (click)="removeToast(toast.id)"></button>
        </div>
        <div class="toast-body text-white">
          {{ toast.message }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .toast-container { max-width: 400px; }
    .toast { border-radius: 12px; box-shadow: 0 8px 25px rgba(0,0,0,0.15); margin-bottom: 10px; min-width: 300px; }
    .toast-header { border-radius: 12px 12px 0 0; }
    .toast-header .btn-close { filter: brightness(0) invert(1); }
    .toast-body { border-radius: 0 0 12px 12px; padding: 12px 16px; }
  `]
})
export class ToastComponent implements OnInit {
  toasts$!: Observable<ToastMessage[]>;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toasts$ = this.toastService.toasts$;
  }

  removeToast(id: number) {
    this.toastService.remove(id);
  }
}
