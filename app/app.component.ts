import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './templates/app.html'
})

export class AppComponent { 
	name = 'Vocabular';

	onClickContact() : void {
		alert("Have feedback or questions? We'd love to hear from you! Please contact vocabular.app@gmail.com");
	}

	onClickHelp() : void {
		alert("help clicked");
	}
}
