import { Component, Input } from '@angular/core';
import { ITask } from '../../interfaces/itask';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  date = new Date();
  @Input() title?: string;
  @Input() tasks?: ITask[];

  constructor(private taskService:TaskService){}

  handleTaskChange(e: boolean) {
    this.taskService.loadTaskOnChange(true);
  }
}
