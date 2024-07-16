import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './shared/services/auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
