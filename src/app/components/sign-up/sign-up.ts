import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.scss'],
  standalone: false,
})
export class SignUpComponent {
  registerForm: FormGroup;
  errorMessage = signal('');
  successMessage = signal('');

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      hasFamily: [false],
      familyName: [''],
      adminEmail: [''],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.errorMessage.set('');
      this.successMessage.set('');
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.successMessage.set('Inscription réussie !');
          this.registerForm.reset();
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err: HttpErrorResponse) => {
          console.error("FRONTEND: Erreur lors de l'inscription :", err);
          this.errorMessage.set(err.error.message || "L'inscription a échoué.");
        },
      });
    }
  }
}
