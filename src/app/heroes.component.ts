import {Component, OnInit} from '@angular/core';
import { Hero } from './hero';
import { HeroService} from './hero.service';
import {Router} from '@angular/router';


@Component({
  selector: 'my-heroes',
   templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  // {{}} is interpolation binding syntax, represents values as string inside HTML tags
  // template: '<h1>{{title}}</h1><h2>{{hero.name}} details!</h2>'
  providers: [HeroService]
})



export class HeroesComponent implements OnInit {
  heroes: Hero[];
  hero: Hero = {
    name: 'Windstorm',
    id: 1
  };
  selectedHero: Hero;
  // constructor
  constructor(private heroService: HeroService,
              private router: Router) { }
  // getter
  // to have heroes slowly (2000ms timeout use this.heroService.getHeroesSlowly()
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => {
      return this.heroes = heroes;
    });
  }

  // onInit
  ngOnInit(): void {
    this.getHeroes();
  }
  // selector
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }
  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
  }
}



