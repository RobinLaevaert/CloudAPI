import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SoccerService {


  private url = 'http://api.football-data.org/v1/competitions'
  constructor(private http : HttpClient) { }

 getCompetitions():Observable<RootObject[]>{
    return this.http.get<RootObject[]>(this.url)
  }  
}


export interface Self {
  href: string;
}

export interface Teams {
  href: string;
}

export interface Fixtures {
  href: string;
}

export interface LeagueTable {
  href: string;
}

export interface Links {
  self: Self;
  teams: Teams;
  fixtures: Fixtures;
  leagueTable: LeagueTable;
}

export interface RootObject {
  _links: Links;
  id: number;
  caption: string;
  league: string;
  year: string;
  currentMatchday: number;
  numberOfMatchdays: number;
  numberOfTeams: number;
  numberOfGames: number;
  lastUpdated: Date;
}







