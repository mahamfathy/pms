import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalInterceptor } from './core/interceptors/global.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
