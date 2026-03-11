import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.scss'],
  standalone: false,
})
export class SignInComponent {
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
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.errorMessage.set('');
      this.successMessage.set('');
      console.log("FRONTEND: Tentative d'inscription avec :", this.registerForm.value);
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          console.log('FRONTEND: Inscription réussie !');
          this.successMessage.set('Inscription réussie ! Vous allez être redirigé.');
          this.registerForm.reset(); // Vide les champs du formulaire
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err) => {
          console.error("FRONTEND: Erreur lors de l'inscription :", err);
          this.errorMessage.set(err.error.message || "L'inscription a échoué.");
        },
      });
    }
  }
}
