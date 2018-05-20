import { Component, OnInit } from '@angular/core';
import { GameService, IGame, IStudio } from '../services/game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  games: IGame[];
  studios: IStudio[];
  Title;
  Category;
  Price;
  constructor(private svc: GameService) { }

  ngOnInit() {
    this.svc.getGames().subscribe(s => {
      this.games = s;
    })
    this.svc.getStudios().subscribe(s =>{
      this.studios = s;
    })
  }

  KnopClick(){
    alert("Test" + this.Title + this.Category + this.Price);
  }
}
