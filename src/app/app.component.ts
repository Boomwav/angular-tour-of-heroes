import { Component } from '@angular/core';

@Component({
  selector: 'my-root',
  template: `
    <h1>{{title}}</h1>
    <div class="header-bar"></div>

    <nav>
      <button routerLink="/dashboard" routerLinkActive="active" kendoButton icon="window" look="outline">Dashboard</button>
      <button routerLink="/heroes" routerLinkActive="active" kendoButton icon="accessibility" look="outline">Heroes</button>
    </nav>

    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tour of Heroes';
}
