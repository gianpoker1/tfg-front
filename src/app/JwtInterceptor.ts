import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Obtener el token del almacenamiento local
        let token = localStorage.getItem('token');
        //token

        if (token) {
            // Clonar la solicitud y agregar el encabezado de autorización con el token
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }

        const authHeader = request.headers.get('Authorization');
        const extractedToken = authHeader ? authHeader.replace('Bearer ', '') : null;


        
        // Pasar la solicitud modificada al siguiente controlador en la cadena
        return next.handle(request);
    }
}