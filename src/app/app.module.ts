import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from './service/user-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './list/list.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ListComponent,
    HeaderComponent,
    FooterComponent    
  ],
  imports: [
    BrowserModule,    
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  
  ],
  providers: [UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
