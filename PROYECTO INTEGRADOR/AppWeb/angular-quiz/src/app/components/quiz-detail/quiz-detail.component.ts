import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pregunta } from '../../models/quiz.model';

@Component({
  selector: 'app-quiz-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" *ngIf="pregunta">
      <h2>{{ pregunta.enunciado }}</h2>
      
      <div class="grid" style="margin-top: 1.5rem;">
        <button class="btn" [ngClass]="getBtnClass('A')" (click)="selectOption('A')" [disabled]="hasAnswered">
          {{ pregunta.opcionA }}
        </button>
        <button class="btn" [ngClass]="getBtnClass('B')" (click)="selectOption('B')" [disabled]="hasAnswered">
          {{ pregunta.opcionB }}
        </button>
        <button class="btn" [ngClass]="getBtnClass('C')" (click)="selectOption('C')" [disabled]="hasAnswered">
          {{ pregunta.opcionC }}
        </button>
      </div>

      <div *ngIf="hasAnswered" style="margin-top: 1.5rem;">
        <p *ngIf="isCorrect" style="color: green; font-weight: bold;">¡Correcto!</p>
        <p *ngIf="!isCorrect" style="color: red; font-weight: bold;">
          Incorrecto. La respuesta era la {{ pregunta.respuesta }}.
        </p>
        
        <button class="btn btn-primary" (click)="close.emit()" style="margin-top: 1rem;">
          Volver a la lista
        </button>
      </div>
    </div>
  `
})
export class QuizDetailComponent {
  @Input() pregunta!: Pregunta;
  @Output() close = new EventEmitter<void>();

  selectedOption: string | null = null;
  hasAnswered = false;
  isCorrect = false;

  selectOption(opt: string) {
    if (this.hasAnswered) return;
    this.selectedOption = opt;
    this.hasAnswered = true;
    this.isCorrect = opt === this.pregunta.respuesta;
  }

  getBtnClass(opt: string) {
    if (!this.hasAnswered) return '';
    if (opt === this.pregunta.respuesta) return 'btn-primary'; // Correcta en primary
    if (opt === this.selectedOption && !this.isCorrect) return 'btn-danger'; // Placeholder para rojo
    return '';
  }
}
