import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import { WordListComponent } from './wordlist.component';
import { WordComponent } from './word.component';
import { HttpModule } from '@angular/http';

@NgModule({
  imports:      [ 
  	BrowserModule,
  	FormsModule,
  	HttpModule,
    ReactiveFormsModule
  ],
  declarations: [
  	AppComponent,
  	WordListComponent,
  	WordComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
