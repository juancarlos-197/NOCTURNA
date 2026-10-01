import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private toastsSignal = signal<ToastMessage[]>([]);
  public toasts = this.toastsSignal.asReadonly();

  public show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', title?: string, duration = 4000) {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, type, title, message, duration };
    
    this.toastsSignal.update(list => [...list, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, duration);
    }
  }

  public success(message: string, title = 'Éxito') {
    this.show(message, 'success', title);
  }

  public error(message: string, title = 'Error') {
    this.show(message, 'error', title);
  }

  public info(message: string, title = 'Información') {
    this.show(message, 'info', title);
  }

  public warning(message: string, title = 'Atención') {
    this.show(message, 'warning', title);
  }

  public dismiss(id: string) {
    this.toastsSignal.update(list => list.filter(t => t.id !== id));
  }
}
