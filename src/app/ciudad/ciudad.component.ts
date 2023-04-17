import { Component, OnInit } from '@angular/core';
import { Ciudad } from 'src/app/models/ciudad.model';
import { CiudadService } from 'src/app/services/ciudad.service';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.css']
})
export class CiudadComponent implements OnInit {

  ciudades!: Ciudad[];

  constructor(private ciudadService: CiudadService) { }

  ngOnInit() {
    this.getCiudades();
  }

  getCiudades() {
    this.ciudadService.obtenerCiudades().subscribe(ciudades => {
      this.ciudades = ciudades;
    });
  }

}
