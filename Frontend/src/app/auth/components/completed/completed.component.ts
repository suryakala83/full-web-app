import { Component } from '@angular/core';
import { TaskService } from '../../../shared/services/task.service';
import { ITask } from '../../../shared/interfaces/itask';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.css',
})
export class CompletedComponent {
  tasks: ITask[] = [];
  title: string = 'Completed';
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.loadTasks$.subscribe({
      next: (value) => {
        if (value == true) {
          this.loadTasks();
        }
      },
      error(err) {
        console.log(err);
      },
    });
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks('Completed').subscribe({
      next: (data) => {
        this.tasks = data.payload;
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
