import { Component } from '@angular/core';
import { SecurityAppService } from './services/security-app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular10MaterialFlexLayOut';

  constructor() {
    // const isExpiredTopken = this.authSvc.checkToken();
    // console.log('Token expirado? ->', isExpiredTopken);
    // if (isExpiredTopken){
    //   // expirado
    //   this.authSvc.refreshToken();
    // }
  }

}
