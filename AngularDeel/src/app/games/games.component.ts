import { Component, OnInit } from '@angular/core';
import { GameService, IGame, IStudio } from '../services/game.service';
import { Router } from '@angular/router';

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

  game:boolean;
  studio:boolean;
  newTitle: string;
  newCategory: string;
  newPrice: number;
  newCover: string;
  
  
  newName: string;
  newLocation: string;
  newSite: string;
  constructor(private svc: GameService, private router: Router) { }

  ngOnInit() {
    this.svc.getGames().subscribe(s => {
      this.games = s;
    })
    this.svc.getStudios().subscribe(s =>{
      this.studios = s;
    })
  }

  KnopClick(type: string){
    switch(type){
      case "Studio":
      this.studio = true;
      break;
      case "Game":
      this.game = true;
      break;
    }
  }

  addGame(){
    alert(this.newName + " " + this.newCategory + " " + this.newPrice + " " + this.newCover);
    this.game = false;
  }
  addStudio(){
    
    
    
    this.studio = false
  }
}
