import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialsModule } from './angular-materials/angular-materials.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PostService } from '../services/post.service';
import { InterceptorService } from './interceptor.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialsModule,
    HttpClientModule,
    FormsModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    PostService,
    {provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true,
  },
  ]
})
export class AppModule { }