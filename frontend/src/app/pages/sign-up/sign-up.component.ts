import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { SignUpService } from '../../shared/services/sign-up/sign-up.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  router = inject(Router);
  signUpService = inject(SignUpService);

  showAuthFailedMessage = signal(false);

  form = new FormGroup({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const username = this.form.value.username as string;
    const email = this.form.value.email as string;
    const password = this.form.value.password as string;

    this.signUpService.signUp(username, email, password).subscribe({
      next: () => {
        this.router.navigateByUrl('/sign-in');
      },
      error: () => {
        this.showAuthFailedMessage.set(true);
      },
    });
  }

  goToSignIn() {
    this.router.navigateByUrl('/sign-in');
  }
}
