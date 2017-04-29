import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './templates/app.html'
})

export class AppComponent { 
	name = 'Vocabular';
	private helpVisible : boolean = false;
	private contactVisible : boolean = false;

	onClickContact() : void {
		this.contactVisible = true;
	}

	onClickHelp() : void {
		this.helpVisible = true;
	}

	onDismissHelp() {
		this.helpVisible = false;
	}	
	
	onDismissContact() {
		this.contactVisible = false;
	}	
}
