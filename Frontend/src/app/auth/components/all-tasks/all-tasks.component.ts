import { Component } from '@angular/core';
import { TaskService } from '../../../shared/services/task.service';
import { ITask } from '../../../shared/interfaces/itask';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.css',
})
export class AllTasksComponent {
  tasks: ITask[] = [];
  title: string = 'All Tasks';
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
    this.taskService.getAllTasks('All').subscribe({
      next: (data) => {
        this.tasks = data.payload;
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
