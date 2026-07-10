import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from './services/supabase.service';
import { StateService } from './services/state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div class="container">
      <header style="margin-bottom: 2rem;">
        <h1 style="color: var(--color-primary)">Módulo Quiz</h1>
        <p>Evalúa tus conocimientos.</p>
      </header>

      <!-- Mostrar el contenido solo cuando tengamos la sesión -->
      <ng-container *ngIf="state.isReady(); else loading">
        <router-outlet></router-outlet>
      </ng-container>

      <ng-template #loading>
        <p>Conectando con QuestiaSpace...</p>
      </ng-template>
    </div>
  `
})
export class AppComponent implements OnInit {
  supabaseService = inject(SupabaseService);
  state = inject(StateService);

  ngOnInit() {
    // Escuchar mensajes de la app contenedora para obtener la sesión
    window.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'SESSION_DATA') {
        const session = event.data.payload;
        this.state.setSession(session);
        this.supabaseService.initClient(session.access_token);
      }
    });

    // Solicitar sesión a la app contenedora al iniciar
    window.parent.postMessage({ type: 'REQUEST_SESSION' }, '*');
  }
}
