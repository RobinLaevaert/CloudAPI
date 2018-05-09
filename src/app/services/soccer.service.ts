import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class SoccerService {
  httpOptions = {
    headers: new HttpHeaders({
    'X-Auth-Token' : '9a79602abb2645489a5ff6596df5b4fa'
  })};
  private url = 'http://api.football-data.org/v1'
  constructor(private http : HttpClient) { }

  
  getCompetitions():Observable<competitions.RootObject[]>{
    return this.http.get<competitions.RootObject[]>(this.url + '/competitions', this.httpOptions)
  }  

  getCompetition(id:number):Observable<competitions.RootObject>{
    return this.http.get<competitions.RootObject>(this.url + `/competitions/${id}`, this.httpOptions);
  }

  getCompetitionTable(id:number, matchDay:number): Observable<League.RootObject>{  
    return this.http.get<League.RootObject>(this.url + `/competitions/${id}/leagueTable?matchday=${matchDay}`, this.httpOptions);
  }

  getCompetitionFixtures(id:number, matchDay:number): Observable<competitionFixtures.RootObject>{
    return this.http.get<competitionFixtures.RootObject>(this.url + `/competitions/${id}/fixtures?matchday=${matchDay}`, this.httpOptions);
  }

  getTeamFromURL(urlvar): Observable<Team.RootObject>{
    return this.http.get<Team.RootObject>(urlvar, this.httpOptions);
  }
}

export namespace competitions{
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



}

export namespace League{

  export interface Self {
    href: string;
  }

  export interface Competition {
    href: string;
  }

  export interface Links {
    self: Self;
    competition: Competition;
  }

  export interface Team {
    href: string;
  }

  export interface Links2 {
    team: Team;
  }

  export interface Home {
    goals: number;
    goalsAgainst: number;
    wins: number;
    draws: number;
    losses: number;
  }

  export interface Away {
    goals: number;
    goalsAgainst: number;
    wins: number;
    draws: number;
    losses: number;
  }

  export interface Standing {
    _links: Links2;
    position: number;
    teamName: string;
    crestURI: string;
    playedGames: number;
    points: number;
    goals: number;
    goalsAgainst: number;
    goalDifference: number;
    wins: number;
    draws: number;
    losses: number;
    home: Home;
    away: Away;
    winpercentage: number;
    drawpercentage: number;
    losspercentage: number;
  }

  export interface RootObject {
    _links: Links;
    leagueCaption: string;
    matchday: number;
    standing: Standing[];
  }
}

export namespace competitionFixtures{
  
  export interface Self {
    href: string;
  }

  export interface Competition {
    href: string;
  }

  export interface Links {
    self: Self;
    competition: Competition;
  }

  export interface Self2 {
    href: string;
  }

  export interface Competition2 {
    href: string;
  }

  export interface HomeTeam {
    href: string;
  }

  export interface AwayTeam {
    href: string;
  }

  export interface Links2 {
    self: Self2;
    competition: Competition2;
    homeTeam: HomeTeam;
    awayTeam: AwayTeam;
  }

  export interface HalfTime {
    goalsHomeTeam: number;
    goalsAwayTeam: number;
  }

  export interface Result {
    goalsHomeTeam?: number;
    goalsAwayTeam?: number;
    draw: boolean;
    homeTeamWon: boolean;
    halfTime: HalfTime;
    homeTeamColor: string;
    awayTeamColor: string;
  }

  export interface Odds {
    homeWin: number;
    draw: number;
    awayWin: number;
  }

  export interface Fixture {
    _links: Links2;
    date: Date;
    status: string;
    matchday: number;
    homeTeamName: string;
    homeTeamCrest:string;
    awayTeamCrest:string;
    awayTeamName: string;
    result: Result;
    odds: Odds;
  }

  export interface RootObject {
    _links: Links;
    count: number;
    fixtures: Fixture[];
  }

}

export namespace Team{
  export interface Self {
    href: string;
  }

  export interface Fixtures {
    href: string;
  }

  export interface Players {
    href: string;
  }

  export interface Links {
    self: Self;
    fixtures: Fixtures;
    players: Players;
  }

  export interface RootObject {
    _links: Links;
    name: string;
    code: string;
    shortName: string;
    squadMarketValue?: any;
    crestUrl: string;
  }

}

