import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class SoccerService {
  httpOptions = {
    headers: new HttpHeaders({
    'X-Auth-Token' : '9a79602abb2645489a5ff6596df5b4fa',
  })};
  private url = 'http://api.football-data.org/v1'
  private flagurl = 'https://restcountries.eu/rest/v2/name/'
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

  getCompetitionTeams(id:number): Observable<competitionTeams.RootObject>{
    return this.http.get<competitionTeams.RootObject>(this.url + `/competitions/${id}/teams`, this.httpOptions);
  }

  getTeam(id:number): Observable<Team.RootObject> {
    return this.http.get<Team.RootObject>(this.url + `/teams/${id}`, this.httpOptions);
  }

  getPlayers(id:number): Observable<Players.RootObject>{
    return this.http.get<Players.RootObject>(this.url + `/teams/${id}/players`, this.httpOptions);
  }

  getFlag(country:string): Observable<FlagRootObject[]>{
    return this.http.get<FlagRootObject[]>(this.flagurl + `${country}?fullText=true&fields=flag`);
  }

  getTeamFixtures(id:number):Observable<TeamFixtures.RootObject>{
    return this.http.get<TeamFixtures.RootObject>(this.url+ `/teams/${id}/fixtures`, this.httpOptions);
  }

  getTeamFromName(name:string): Observable<LookupTeam.RootObject>{
    return this.http.get<LookupTeam.RootObject>(this.url+ `/teams/?name=${name}`, this.httpOptions);
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
    teamShortName: string;
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
    homeTeamShortName: String;
    awayTeamShortName: String;
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
    currentPlace: string;
    currentLeague: string;
    currenPoints: string;
  }

}

export namespace competitionTeams{
  
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

  export interface Fixtures {
    href: string;
  }

  export interface Players {
    href: string;
  }

  export interface Links2 {
    self: Self2;
    fixtures: Fixtures;
    players: Players;
  }

  export interface Team {
    _links: Links2;
    name: string;
    code: string;
    shortName: string;
    squadMarketValue?: any;
    crestUrl: string;
  }

  export interface RootObject {
    _links: Links;
    count: number;
    teams: Team[];
  }

}

export namespace Players {

  export interface Self {
      href: string;
  }

  export interface Team {
      href: string;
  }

  export interface Links {
      self: Self;
      team: Team;
  }

  export interface Player {
      name: string;
      position: string;
      jerseyNumber: number;
      dateOfBirth: string;
      nationality: string;
      contractUntil: string;
      marketValue?: any;
      nationalityFlag: string;
  }

  export interface RootObject {
      _links: Links;
      count: number;
      players: Player[];
  }

}

export interface FlagRootObject {
  flag: string;
}

export namespace TeamFixtures {

  export interface Self {
    href: string;
  }

  export interface Team {
    href: string;
  }

  export interface Links {
    self: Self;
    team: Team;
  }

  export interface Self2 {
    href: string;
  }

  export interface Competition {
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
    competition: Competition;
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
    halfTime: HalfTime;
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
    awayTeamName: string;
    crestHomeTeam: string;
    crestAwayTeam: string;
    result: Result;
    odds: Odds;
  }

  export interface RootObject {
    _links: Links;
    season: string;
    count: number;
    fixtures: Fixture[];
  }

}

export namespace LookupTeam{
  export interface Self {
    href: string;
  }

  export interface Links {
    self: Self;
  }

  export interface Team {
    id: number;
    name: string;
    currentCompetition: number;
    currentLeague: string;
  }

  export interface RootObject {
    _links: Links;
    searchQuery: string;
    count: number;
    teams: Team[];
  }
}


