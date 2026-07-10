import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-quiz-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="card">
      <h2>Nueva Pregunta</h2>
      <form [formGroup]="quizForm" (ngSubmit)="onSubmit()">
        
        <div class="form-group">
          <label>ID Categoría (Temporalmente texto, luego select)</label>
          <input type="text" formControlName="categoria_id">
        </div>

        <div class="form-group">
          <label>Enunciado</label>
          <input type="text" formControlName="enunciado">
        </div>

        <div class="form-group">
          <label>Opción A</label>
          <input type="text" formControlName="opcionA">
        </div>

        <div class="form-group">
          <label>Opción B</label>
          <input type="text" formControlName="opcionB">
        </div>

        <div class="form-group">
          <label>Opción C</label>
          <input type="text" formControlName="opcionC">
        </div>

        <div class="form-group">
          <label>Respuesta Correcta</label>
          <select formControlName="respuesta">
            <option value="A">Opción A</option>
            <option value="B">Opción B</option>
            <option value="C">Opción C</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary" [disabled]="quizForm.invalid || isSubmitting">
          {{ isSubmitting ? 'Guardando...' : 'Guardar Pregunta' }}
        </button>
        <button type="button" class="btn" style="margin-left: 1rem;" (click)="cancel.emit()">
          Cancelar
        </button>
      </form>
    </div>
  `
})
export class QuizFormComponent {
  @Output() saved = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  fb = inject(FormBuilder);
  supabase = inject(SupabaseService);
  state = inject(StateService);

  isSubmitting = false;

  quizForm = this.fb.group({
    categoria_id: ['', Validators.required],
    enunciado: ['', Validators.required],
    opcionA: ['', Validators.required],
    opcionB: ['', Validators.required],
    opcionC: ['', Validators.required],
    respuesta: ['A', Validators.required]
  });

  async onSubmit() {
    if (this.quizForm.invalid) return;
    
    this.isSubmitting = true;
    const val = this.quizForm.value;
    const userId = this.state.userId;

    if (userId) {
      await this.supabase.createPregunta(val as any, userId);
      this.saved.emit();
    }
    this.isSubmitting = false;
  }
}
