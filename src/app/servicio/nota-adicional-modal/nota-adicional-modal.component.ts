import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-nota-adicional-modal',
  templateUrl: './nota-adicional-modal.component.html',
  styleUrls: ['./nota-adicional-modal.component.css']
})
export class NotaAdicionalModalComponent implements OnInit{

  nota!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) { }

  ngOnInit(): void {
    this.nota = this.data;
  }



}
