import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { User } from '../../shared/interfaces/user.interface';
import { UserService } from '../../shared/services/user/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LogoutService } from '../../shared/services/logout/logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyProfileComponent {
  router = inject(Router);
  userService = inject(UserService);
  logoutService = inject(LogoutService);

  userProfile = signal<User>({} as User);

  ngOnInit() {
    this.userService
      .getProfile()
      .subscribe((profile) => this.userProfile.set(profile));
  }

  logout() {
    this.logoutService.logout();

    this.router.navigateByUrl('/sign-in');
  }
}
