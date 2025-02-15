import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from '../../shared/interfaces/activity.interface';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import * as uuid from 'uuid';
import { SchedulesService } from '../../shared/services/schedules/schedules.service';
import { Schedule } from '../../shared/interfaces/schedule.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ActivityCategoryPipe } from '../../shared/pipes/activity-category.pipe';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  phosphorStar,
  phosphorTrashSimple,
} from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'app-schedule-details',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    CdkDropList,
    CdkDrag,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    NgIcon,
    ActivityCategoryPipe,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './schedule-details.component.html',
  styleUrl: './schedule-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ phosphorTrashSimple, phosphorStar })],
})
export class ScheduleDetailsComponent {
  router = inject(Router);
  scheduleService = inject(SchedulesService);

  showUpdateScheduleFailedMessage = signal(false);

  createScheduleForm: FormGroup = new FormGroup({});
  activitiesForm: FormGroup = new FormGroup({});

  scheduleId = '';
  schedule = signal<Schedule>({} as Schedule);

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createScheduleForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      visibility: ['public', [Validators.required]],
      activities: this.formBuilder.array<Activity>([] as Activity[]),
    });

    this.activitiesForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      duration: [null, [Validators.required]],
      category: [null, [Validators.required]],
      priority: [null, [Validators.required]],
    });

    this.scheduleId = this.route.snapshot.params['id'];
    console.log(this.scheduleId);

    this.scheduleService.getById(this.scheduleId).subscribe((schedule) => {
      this.schedule.set(schedule);

      this.createScheduleForm.setValue({
        title: schedule.title,
        description: schedule.description,
        startDate: schedule.start_date,
        endDate: schedule.end_date,
        visibility: schedule.visibility,
        activities:
          schedule.activities.map(({ schedule, ...activity }) => activity) ??
          [],
      });
    });
  }

  get activities() {
    return this.createScheduleForm.get('activities')?.value;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.activities, event.previousIndex, event.currentIndex);
  }

  deleteSchedule(activityId: string) {
    const activitiesArray = this.createScheduleForm.get(
      'activities'
    ) as FormArray;

    const activityIndex = (activitiesArray.value as Activity[]).findIndex(
      (activity) => activity.id === activityId
    );

    if (activityIndex !== -1) {
      activitiesArray.removeAt(activityIndex);
    }
  }

  removeSchedule() {
    this.scheduleService.delete(this.scheduleId).subscribe({
      next: () => {
        this.router.navigateByUrl('/my-schedules');
      },
      error: () => {
        this.showUpdateScheduleFailedMessage.set(true);
      },
    });
  }

  submitActivity() {
    if (this.activitiesForm.valid) {
      const activitiesArray = this.createScheduleForm.get('activities')?.value;

      activitiesArray.push({
        ...this.activitiesForm.value,
        id: uuid.v4(),
      });

      this.activitiesForm.reset();
    }
  }

  private formatDate(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  submit() {
    if (this.createScheduleForm.invalid) {
      return;
    }

    const title = this.createScheduleForm.value.title as string;
    const description = this.createScheduleForm.value.description as string;
    const startDate = this.formatDate(this.createScheduleForm.value.startDate);
    const endDate = this.formatDate(this.createScheduleForm.value.endDate);
    const visibility = this.createScheduleForm.value.visibility;
    const activities = this.createScheduleForm.value.activities;

    this.scheduleService
      .put(this.scheduleId, {
        title,
        description,
        start_date: startDate,
        end_date: endDate,
        visibility,
        activities,
      })
      .subscribe({
        next: () => {},
        error: () => {
          this.showUpdateScheduleFailedMessage.set(true);
        },
      });
  }
}
