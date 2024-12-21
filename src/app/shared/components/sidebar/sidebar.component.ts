import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorMapTrifold,
  phosphorTimer,
  phosphorUserCircle,
} from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    NgIcon,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  viewProviders: [
    provideIcons({ phosphorTimer, phosphorMapTrifold, phosphorUserCircle }),
  ],
})
export class SidebarComponent {
  mobileQuery: MediaQueryList;

  fillerNav = [
    {
      name: 'Lugar de estudo',
      icon: 'phosphorTimer',
      path: 'study',
    },
    {
      name: 'Meus cronogramas',
      icon: 'phosphorMapTrifold',
      path: 'my-schedules',
    },
    {
      name: 'Perfil',
      icon: 'phosphorUserCircle',
      path: 'profile',
    },
  ];

  constructor(private router: Router) {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  navItemActivated(navItemPath: string) {
    const currentRouteWithoutSlash = this.router.url.split('/')[1];
    return currentRouteWithoutSlash === navItemPath;
  }

  goToPage(navItemPath: string) {
    return this.router.navigate([navItemPath]);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
