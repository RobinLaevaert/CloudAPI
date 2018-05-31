import { Component, OnInit } from '@angular/core';
import { GameService, IGame, IStudio, INewStudio, INewGame, IUpdateGame } from '../services/game.service';
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

  mdbtooltipURL : string = "https://vignette.wikia.nocookie.net/yogscast/images/0/0c/Witcher_3_cover_art.jpg/revision/latest?cb=20160705080448";

  game:boolean;
  studio:boolean;
  newTitle: string;
  newCategory: string;
  newPrice: number;
  newCover: string;
  
  studioselection;
  showStudio: boolean = true;
  showGame: boolean = true;
  newName: string;
  newLocation: string;
  newSite: string;

  updateStudio: boolean = false;
  updateStudioID;
  updateStudioName;
  updateStudioLocation;
  updateStudioSite;

  updateGame: boolean = false;
  updateGameID;
  updateGameTitle;
  updateGameCategory;
  updateGamePrice;
  updateGameCover;
  updateGameStudio: IStudio;

  Sorting = ["ID","Title", "Category", "Price"];
  SortSelection = this.Sorting[0];
  Direction = ["Ascending", "Descending"];
  Direction1 = ["asc", "desc"];
  DirectionSelection = this.Direction[0];
  Searches = ["Title", "Category", "Price"]
  SearchSelection = this.Searches[0];
  SearchGame: string;

  SearchBar: boolean = false;
  hasSearched: boolean = false;

  public html: string = '<img src=this.mdbtooltipURL>';
  
  pageNumber : number = 0;
  numberOfPages: number;



  constructor(private svc: GameService, private router: Router) { }

  ngOnInit() {
    this.svc.getGames().subscribe(s => {
      this.games = s.games;
      this.numberOfPages = s.pages;
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
      this.clearUpdateAndAdd();    
      this.studio = true;
      break;
      case "Game":
      this.clearUpdateAndAdd();    
      this.game = true;
      break;
    }
  }

  addGame(){
    
    var newStudio: IStudio = { id: this.studioselection, name: null, location: null, site: null};
    //alert(this.newTitle + " " + this.newCategory + " " + this.newPrice + " " + this.newCover + " " + newStudio.id);
    var newGame: INewGame = {title: this.newTitle, category: this.newCategory, price: this.newPrice, cover: this.newCover, studio:newStudio};
    this.svc.addGame(newGame).subscribe(s => {console.log(s); this.Load(); this.game = false;});this.Load();
    
  }
  addStudio(){
    var newStudio: INewStudio = {name: "Ubisoft", site: "ubisoft.com", location: "France"};
    this.svc.addStudio(newStudio).subscribe(s =>{console.log(s);this.Load(); this.game = false;});
    
  }

  

  delete(id, type){
    switch(type){
      case 'studio':
      this.svc.deleteStudio(id).subscribe(s => {
        this.Load();
      });
      break;
      case 'game':
      this.svc.deleteGame(id).subscribe(s => {
        this.Load();
      });
      break;
    }
    
    
  }
  update(id, type, arrayID){
    switch(type){
      case 'studio':  
      this.clearUpdateAndAdd();    
      this.updateStudioID = id;
      this.updateStudioLocation = this.studios[arrayID].location;
      this.updateStudioName = this.studios[arrayID].name;
      this.updateStudioSite = this.studios[arrayID].site;
      this.updateStudio = true;
      break;
      case 'game':
      this.clearUpdateAndAdd();    
      this.updateGameID = id;
      this.updateGameCategory = this.games[arrayID].category;
      this.updateGameCover = this.games[arrayID].cover;
      this.updateGameTitle = this.games[arrayID].title;
      this.updateGameStudio = this.games[arrayID].studio;
      this.updateGamePrice = this.games[arrayID].price;
      this.updateGame = true;
      break;
    }
  }

  put(type){
    switch(type){
      case 'studio':
      var trueId = this.updateStudioID;     
      var updateStudio: IStudio = {id: trueId, name: this.updateStudioName, site: this.updateStudioSite, location: this.updateStudioLocation};
      this.svc.updateStudio(updateStudio).subscribe(s => {
        this.updateStudio = false;
        this.Load();
      })
      
      break;
      case 'game':
      //var updategamestudio1 : INewStudio = {name: this.updateGameStudio.name, site:this.updateGameStudio.site, location: this.updateGameStudio.location};
      var updateGame: IGame = {id: this.updateGameID, title: this.updateGameTitle, category: this.updateGameCategory, cover: this.updateGameCover, price: this.updateGamePrice, studio: this.updateGameStudio};
      this.svc.updateGame(updateGame).subscribe(s =>{
        this.updateGame = false;
        this.Load()
      })
      break;
    }
  }

  clearUpdateAndAdd(){ 
    this.updateGame = false;
    this.updateStudio = false;
    this.game = false;
    this.studio = false;
  }

  changeImage(coverURL: string){
    this.mdbtooltipURL = coverURL;
  }

  nextPage(){
    if(this.pageNumber == this.numberOfPages-1){

    }
    else{
      this.pageNumber++;
      this.Load();
    }
  }
  previousPage(){
    if(this.pageNumber == 0){

    }
    else{
      this.pageNumber --
      this.Load();
    }

  }

  Search(){
    this.pageNumber = 0;
    this.hasSearched = true;
    this.SearchLoad();
  }

  SearchLoad(){
    if(this.SearchGame != undefined){
      this.svc.ASearch( this.pageNumber,this.SortSelection.toLowerCase(),this.Direction1[this.Direction.indexOf(this.DirectionSelection)],this.SearchGame, this.SearchSelection.toLowerCase()).subscribe(s =>{
        this.games = s.games;
        this.numberOfPages = s.pages;
      })
    }
    else{
      this.svc.ASearch(this.pageNumber,this.SortSelection.toLowerCase(),this.Direction1[this.Direction.indexOf(this.DirectionSelection)]).subscribe(s =>{
        this.games = s.games;
        this.numberOfPages = s.pages;
      })
    }
  }

  Load(){
    if(this.hasSearched != true){
    this.svc.getGames(this.pageNumber).subscribe(s => {
      this.games = s.games;
      this.numberOfPages = s.pages;
    })
    this.svc.getStudios().subscribe(s =>{
      this.studios = s;
      
    })
    }
    else {this.SearchLoad();
    }
  }

  openSearchBar(){
    this.SearchBar = true;
  }

  closeSearchBar(){
    this.SearchBar = false;
    this.hasSearched = false;
    this.pageNumber = 0;
    this.Load();
  }
}
