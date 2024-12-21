import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorStar,
  phosphorTrashSimple,
} from '@ng-icons/phosphor-icons/regular';
import { ActivityCategoryPipe } from '../../shared/pipes/activity-category.pipe';
import * as uuid from 'uuid';

interface Activity {
  id: string;
  name: string | null;
  duration: number | null;
  category: 'class' | 'review' | 'test';
  priority: 'high' | 'medium' | 'low';
}

@Component({
  selector: 'app-create-schedule',
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
  templateUrl: './create-schedule.component.html',
  styleUrl: './create-schedule.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ phosphorTrashSimple, phosphorStar })],
})
export class CreateScheduleComponent {
  createScheduleForm: FormGroup = new FormGroup({});
  activitiesForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createScheduleForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      visibility: ['public', [Validators.required]],
      activities: this.formBuilder.array<Activity>([
        {
          id: '3391badb-7e7c-446b-906b-3d62acfa3bf6',
          name: 'Estudar alguma coisa 1',
          duration: 10,
          category: 'class',
          priority: 'high',
        },
        {
          id: 'd2034a33-85f9-494b-ab72-6f45aba2800b',
          name: 'Estudar outra coisa 2',
          duration: 10,
          category: 'review',
          priority: 'medium',
        },
      ] as Activity[]),
    });

    this.activitiesForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      duration: [null, [Validators.required]],
      category: [null, [Validators.required]],
      priority: [null, [Validators.required]],
    });
  }

  get activities() {
    return this.createScheduleForm.get('activities')?.value;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.activities, event.previousIndex, event.currentIndex);
  }

  deleteSchedule(activityId: string) {
    console.log("activityId:", activityId)
    const activitiesArray = this.createScheduleForm.get(
      'activities'
    ) as FormArray;

    const activityIndex = activitiesArray.controls.findIndex(
      (activity) => activity.value.id === activityId
    );

    console.log("activitiesArray:", activitiesArray)
    console.log("activityIndex:", activityIndex)

    if (activityIndex !== -1) {
      activitiesArray.removeAt(activityIndex);
    }
  }

  submitActivity() {
    if (this.activitiesForm.valid) {
      const activitiesArray = this.createScheduleForm.get('activities')?.value;

      console.log("this.activitiesForm.value:", this.activitiesForm.value)
      activitiesArray.push({
        ...this.activitiesForm.value,
        id: uuid.v4(),
      });

      this.activitiesForm.reset();
    }
  }

  submit() {}
}
