import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Orientation, ActionsLayout } from '@progress/kendo-angular-layout';


@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  public actionsOrientation: Orientation = 'horizontal';
  public actionsLayout: ActionsLayout = 'end';

  constructor(
    private router: Router,
    private heroService: HeroService) {

  }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

  gotoDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }

  public opened = false;

  public close(status) {
      console.log(`Dialog result: ${status}`);
      if(status == "yes") {
        this.heroService.save({id: null, name: "Wolverine", scrollViewItems: []}).subscribe(x => {
          console.log(`${x.name} was added.`);
        });
      }
      this.opened = false;
  }

  public open() {
      this.opened = true;
  }


}
