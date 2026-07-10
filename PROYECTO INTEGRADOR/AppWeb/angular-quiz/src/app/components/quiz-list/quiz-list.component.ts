import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';
import { Pregunta } from '../../models/quiz.model';
import { QuizFormComponent } from '../quiz-form/quiz-form.component';
import { QuizDetailComponent } from '../quiz-detail/quiz-detail.component';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule, QuizFormComponent, QuizDetailComponent],
  template: `
    <div *ngIf="!showForm && !selectedPregunta">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <h2>Mis Cuestionarios</h2>
        <button class="btn btn-primary" (click)="showForm = true">Crear Pregunta</button>
      </div>

      <div *ngIf="preguntas.length === 0">
        <p>No tienes preguntas creadas. ¡Anímate a crear una!</p>
      </div>

      <div class="grid">
        <div class="card" *ngFor="let p of preguntas" style="margin-bottom: 0;">
          <h3>{{ p.enunciado }}</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">ID Categoría: {{ p.categoria_id }}</p>
          <button class="btn btn-primary" (click)="play(p)">Jugar</button>
        </div>
      </div>
    </div>

    <!-- Formulario de creación -->
    <app-quiz-form *ngIf="showForm" 
      (saved)="onSaved()" 
      (cancel)="showForm = false">
    </app-quiz-form>

    <!-- Vista de detalle/juego -->
    <app-quiz-detail *ngIf="selectedPregunta"
      [pregunta]="selectedPregunta"
      (close)="selectedPregunta = null">
    </app-quiz-detail>
  `
})
export class QuizListComponent implements OnInit {
  supabase = inject(SupabaseService);
  
  preguntas: Pregunta[] = [];
  showForm = false;
  selectedPregunta: Pregunta | null = null;

  ngOnInit() {
    this.loadPreguntas();
  }

  async loadPreguntas() {
    this.preguntas = await this.supabase.getPreguntas();
  }

  onSaved() {
    this.showForm = false;
    this.loadPreguntas();
  }

  play(pregunta: Pregunta) {
    this.selectedPregunta = pregunta;
  }
}
