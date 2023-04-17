import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais.model';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {

  paises!: Pais[];

  constructor(private paisService: PaisService) { }

  ngOnInit() {
    this.getPaises();
  }

  getPaises() {
    this.paisService.obtenerPaises().subscribe(paises => {
      this.paises = paises;
    });
  }

}
