import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-combo-chart',
  templateUrl: './combo-chart.page.html',
  styleUrls: ['./combo-chart.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ComboChartPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
