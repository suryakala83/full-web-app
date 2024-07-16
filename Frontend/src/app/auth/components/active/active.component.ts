import { Component } from '@angular/core';
import { TaskService } from '../../../shared/services/task.service';
import { ITask } from '../../../shared/interfaces/itask';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrl: './active.component.css',
})
export class ActiveComponent {
  tasks: ITask[] = [];
  title: string = 'Active';
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
    this.taskService.getAllTasks('Pending').subscribe({
      next: (data) => {
        this.tasks = data.payload;
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
