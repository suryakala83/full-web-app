import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'signin',
    pathMatch:'full'
  },
  {
    path:'signin',
    component:SignInComponent
  },
  {
    path:'unauth/signup',
    component:SignInComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnAuthRoutingModule { }
