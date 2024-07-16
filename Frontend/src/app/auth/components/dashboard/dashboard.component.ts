import { Component } from '@angular/core';
import { TaskService } from '../../../shared/services/task.service';
import { ITask } from '../../../shared/interfaces/itask';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  date = new Date();
  tasks: ITask[] = [];
  completedPercentage: number = 0;
  activePercentage: number = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
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
    this.calculatePercentages();
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks('TodayTasks').subscribe({
      next: (data) => {
        this.tasks = data.payload;
        this.calculatePercentages();
      },
      error(err) {
        console.log(err);
      },
    });
  }

  calculatePercentages(): void {
    const totalTasks = this.tasks.length;
    const completedTasks = this.tasks.filter((task) => task.isCompleted).length;
    const activeTasks = totalTasks - completedTasks;

    this.completedPercentage = Math.trunc((completedTasks / totalTasks) * 100);
    this.activePercentage = Math.trunc((activeTasks / totalTasks) * 100);
  }

  onDeleteAll() {
    this.taskService.deleteAll().subscribe(() => {
      this.loadTasks();
    });
  }

  handleTaskChange(e: boolean) {
    this.loadTasks();
  }
}
