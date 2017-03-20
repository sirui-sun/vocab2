import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import { WordListComponent } from './wordlist.component';
import { WordComponent } from './word.component';
// import { DefinitionModal } from './word.component';
import { HttpModule } from '@angular/http';

@NgModule({
  imports:      [ 
  	BrowserModule,
  	FormsModule,
  	HttpModule
  ],
  declarations: [
  	AppComponent,
  	WordListComponent,
  	WordComponent,
  	// DefinitionModal
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
