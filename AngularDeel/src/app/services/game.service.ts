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

  getGames(sort: string = "none", order: string = "asc"):Observable<IGame[]>{
    return this.http.get<IGame[]>(this.url + `/games`);
  }
  getGamebyID(id: number):Observable<IGame>{
    return this.http.get<IGame>(this.url + `/games/${id}`);
  }
  searchGames(searchstring: string,searchType: string, sort: string = "none", dir: string = "asc"): Observable<IGame[]>{
    if(sort == "none"){
      return this.http.get<IGame[]>(this.url + `/games?${searchType}=${searchstring}&dir=${dir}`);
    }
    else{
      return this.http.get<IGame[]>(this.url + `/games?${searchType}=${searchstring}&sort=${sort}&dir=${dir}`);
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