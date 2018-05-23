import { Component, OnInit } from '@angular/core';
import { GameService, IGame, IStudio, INewStudio } from '../services/game.service';
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
  
  studioselection: IStudio;
  showStudio: boolean = true;
  showGame: boolean = true;
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

  ngOnChanges(){
    this.Load();
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
    
    var newStudio: INewStudio = {name: "Ubisoft", site: "ubisoft.com", location: "France"};
    this.svc.addStudio(newStudio).subscribe(s =>{console.log(s);this.Load(); });
    this.studio = false
    
    
  }

  Load(){
    this.svc.getGames().subscribe(s => {
      this.games = s;
    })
    this.svc.getStudios().subscribe(s =>{
      this.studios = s;
    })
  }
}
