import { Component, OnInit } from '@angular/core';
import { Provincia } from 'src/app/models/provincia.model';
import { ProvinciaService } from 'src/app/services/provincia.service';

@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.css']
})
export class ProvinciaComponent implements OnInit {

  provincias!: Provincia[];

  constructor(private provinciaService: ProvinciaService) { }

  ngOnInit() {
    this.getProvincias();
  }

  getProvincias() {
    this.provinciaService.obtenerProvincias().subscribe(provincias => {
      this.provincias = provincias;
    });
  }

}