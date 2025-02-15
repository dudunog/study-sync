import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SignInService } from '../../shared/services/sign-in/sign-in.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  router = inject(Router);
  signInService = inject(SignInService);

  showAuthFailedMessage = signal(false);

  form = new FormGroup({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
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
    const password = this.form.value.password as string;

    this.signInService.signIn(username, password).subscribe({
      next: () => {
        this.router.navigateByUrl('/my-schedules');
      },
      error: () => {
        this.showAuthFailedMessage.set(true);
      },
    });
  }

  goToSignUp() {
    this.router.navigateByUrl('/sign-up');
  }
}
