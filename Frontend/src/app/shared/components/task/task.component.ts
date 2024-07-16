import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../interfaces/itask';
import { AddTaskComponent } from '../../../auth/components/add-task/add-task.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Output() taskUpdated = new EventEmitter<boolean>();
  @Input() task!: ITask;
  component: any = AddTaskComponent;

  constructor(
    private taskService: TaskService,
    private modalService: NgbModal
  ) {}

  toggleTaskStatus() {
    this.task.isCompleted = !this.task.isCompleted;
    this.taskService
      .updateTaskCompleteStatus(this.task.id, this.task.isCompleted)
      .subscribe({
        next: (res) => {
          this.taskUpdated.emit(true);
        },
        error(err) {
          console.log(err);
        },
      });
  }

  onEditTask() {
    const modalRef = this.modalService.open(this.component);
    modalRef.componentInstance.task = this.task;
    modalRef.componentInstance.closeModal.subscribe(() => {
      modalRef.close();
    });
  }

  deleteById(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: (data) => {
        this.taskUpdated.emit(true);
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
