import { Component, Input } from '@angular/core';
import { SignInService } from '../../../un-auth/services/sign-in.service';
import { Router } from '@angular/router';
import { navItems } from '../../utilities/constants';
import { AddTaskComponent } from '../../../auth/components/add-task/add-task.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrl: './top-nav-bar.component.css',
})
export class TopNavBarComponent {
  @Input() title: string = 'Dashboard';
  items = navItems;
  selectedItem: string = this.title;
  component: any = AddTaskComponent;

  constructor(
    private signInService: SignInService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  signOut() {
    this.signInService.signOut().subscribe((response) => {
      this.router.navigateByUrl('unauth');
    });
  }

  openAddTaskContainer() {
    const modalRef = this.modalService.open(this.component);
    modalRef.componentInstance.closeModal.subscribe(() => {
      modalRef.close();
    });
  }

  onSelectItem(item: any) {
    this.selectedItem = item.field;
  }
}
