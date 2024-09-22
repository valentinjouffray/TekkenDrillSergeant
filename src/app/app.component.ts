import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRouterLink,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { home, hammer, list, grid } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import Page from './models/Page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonIcon,
    IonSplitPane,
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonRouterLink,
    IonMenuToggle,
    RouterLink,
  ],
})
export class AppComponent implements OnInit {
  pages: Page[] = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Characters', url: '/characters', icon: 'list' },
    { title: 'Create Drill', url: '/drill-sheet', icon: 'hammer' },
  ];

  ngOnInit(): void {
    addIcons({ home, hammer, list, grid });
  }
}
