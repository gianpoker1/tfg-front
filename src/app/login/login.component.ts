import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName!: string;
  password!: string;

  constructor(private authService: AuthService, 
    private router: Router
    ) { }

  onSubmit() {
    this.authService.login(this.userName, this.password).subscribe(result => {
      console.log('Resultado del inicio de sesión:', result);
      if (result) {
        
        this.router.navigate(['/servicios']);
      } else {
        alert('Nombre de usuario o contraseña incorrectos');
      }
    });
  }
}
