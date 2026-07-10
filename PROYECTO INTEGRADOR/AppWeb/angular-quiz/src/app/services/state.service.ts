import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // Signals para manejar el estado global en Angular 17+
  session = signal<any>(null);
  isReady = signal<boolean>(false);

  setSession(sessionData: any) {
    this.session.set(sessionData);
    this.isReady.set(true);
  }

  get userId(): string | null {
    const s = this.session();
    return s?.user?.id || null;
  }
}
