import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginStateServiceService } from '../services/login-state-service.service';
import { Subscription } from 'rxjs';
import { RegistroUsuarioModalComponent } from '../registro-usuario-modal/registro-usuario-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  isLoggedIn!: boolean;
  private loginStatusSubscription!: Subscription;


  constructor(private router: Router, 
    protected authService: AuthService, 
    private loginStateService: LoginStateServiceService,
    public dialog: MatDialog
    ){
    this.loginStatusSubscription = this.loginStateService.currentLoginStatus.subscribe(status => this.isLoggedIn = status);
  } 
  

  ngOnDestroy(): void {
    this.loginStatusSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  abrirModalRegistro(): void {
    const dialogRef = this.dialog.open(RegistroUsuarioModalComponent, {
      width: '1000px'
    });
  }

  isAdmin(): boolean{
    return this.authService.isAdmin();
  }

  isTrabajador(): boolean{
    return this.authService.isTrabajador();
  }

  isCliente(): boolean{
    return this.authService.isCliente();
  }
}
