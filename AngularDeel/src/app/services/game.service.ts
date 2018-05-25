import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

@Injectable()
export class GameService { 
  
  constructor(private http : HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
    'Access-Control-Allow-Origin':"*"
  })};
  private url = 'http://localhost:4300/api/v1'

  getGames(page:number = 0,sort?:string, order?: string):Observable<IRootObject>{
    return this.http.get<IRootObject>(this.url + `/games?page=${page}`);
  }
  getGamebyID(id: number):Observable<IGame>{
    return this.http.get<IGame>(this.url + `/games/${id}`);
  }
  searchGames(searchstring: string,searchType: string, sort: string = "none", dir: string = "asc"): Observable<IRootObject>{
    if(sort == "none"){
      return this.http.get<IRootObject>(this.url + `/games?${searchType}=${searchstring}&dir=${dir}`);
    }
    else{
      return this.http.get<IRootObject>(this.url + `/games?${searchType}=${searchstring}&sort=${sort}&dir=${dir}`);
    }
  }

  ASearch(page?: number,sort?:string, dir?:string, searchstring?:string , searchType?: string) :Observable<IRootObject>{
    if(searchstring == undefined){
      console.log(this.url + `/games?sort=${sort}&dir=${dir}&page=${page}`);
    return this.http.get<IRootObject>(this.url + `/games?sort=${sort}&dir=${dir}&page=${page}`)
    }
    else{
      
      var url1;
      switch(searchType){
        case "title":
        url1 = this.url + `/games?sort=${sort}&dir=${dir}&page=${page}&Title=${searchstring}`;
        break;
        case "category":
        url1 = this.url + `/games?sort=${sort}&dir=${dir}&page=${page}&Category=${searchstring}`;
        break;
        case "price":
        url1 = this.url + `/games?sort=${sort}&dir=${dir}&page=${page}&price=${searchstring}`;
        break;
      }
      return this.http.get<IRootObject>(url1, this.httpOptions);
    }
  }

  getStudios():Observable<IStudio[]>{
    return this.http.get<IStudio[]>(this.url + `/studios`);
  }
  getStudiobyId(id: number): Observable<IStudio>{
    return this.http.get<IStudio>(this.url + `/studios/${id}`);
  }

  addStudio(newStudio: INewStudio): Observable<IStudio>{
    return this.http.post<IStudio>(this.url + `/studios`, newStudio, this.httpOptions);
  }
  addGame(newGame: INewGame): Observable<IGame>{
    return this.http.post<IGame>(this.url + `/games`, newGame, this.httpOptions);
  }
  
  deleteStudio(id):Observable<IStudio>{
    return this.http.delete<IStudio>(this.url + `/studios/${id}`, this.httpOptions);
  }

  deleteGame(id):Observable<IGame>{
    return this.http.delete<IGame>(this.url + `/games/${id}`, this.httpOptions);
  }

  updateStudio(updateStudio: IStudio): Observable<IStudio>{
    return this.http.put<IStudio>(this.url + `/studios`, updateStudio, this.httpOptions);
  }

}

export interface IStudio {
  id: number;
  name: string;
  location: string;
  site: string;
}

export interface INewStudio{
  name: string;
  location: string;
  site: string;
}

export interface IGame {
  id: number;
  title: string;
  category: string;
  price: number;
  cover: string;
  studio: IStudio;
}

export interface INewGame {
  title: string;
  category: string;
  price: number;
  cover: string;
  studio: IStudio;
}

export interface IRootObject{
  games: IGame[];
  pages: number;
}
