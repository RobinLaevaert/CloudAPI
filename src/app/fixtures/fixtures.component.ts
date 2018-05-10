import { Component, OnInit } from '@angular/core';
import { SoccerService, competitionFixtures, competitionTeams } from '../services/soccer.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.scss']
})
export class FixturesComponent implements OnInit {
  fixtures : competitionFixtures.Fixture[];
  id: number = 445;
  matchday : number = 37;
  teams : competitionTeams.Team[];
  constructor(private svc: SoccerService) { }

  getColor(result:competitionFixtures.Result){
    if(result.homeTeamWon == true){return "green"}
    
  }

  ngOnInit() {
    this.svc.getCompetitionTeams(this.id).subscribe(result1 =>{
      this.teams = result1.teams;
      this.svc.getCompetitionFixtures(this.id,this.matchday).subscribe(result => {
        this.fixtures = result.fixtures;
        this.fixtures.forEach(s => {
          if(s.result.goalsHomeTeam == s.result.goalsAwayTeam){
            s.result.draw = true;
            s.result.homeTeamWon = false;
            s.result.homeTeamColor = "orange";
            s.result.awayTeamColor = "orange";
          }
          else if(s.result.goalsHomeTeam>s.result.goalsAwayTeam){
            s.result.draw = false;
            s.result.homeTeamWon = true;
            s.result.homeTeamColor = "green";
            s.result.awayTeamColor = "red";
          }
          else if(s.result.goalsHomeTeam<s.result.goalsAwayTeam){
            s.result.draw = false;
            s.result.homeTeamWon = false;
            s.result.homeTeamColor = "green";
            s.result.awayTeamColor = "red";
          }
          this.teams.forEach(r =>{
            if(r.name == s.homeTeamName){
              s.homeTeamCrest = r.crestUrl;
              s.homeTeamShortName = r.shortName.toLowerCase();
              
            } 
            else if(r.name == s.awayTeamName){
              s.awayTeamCrest = r.crestUrl;
              s.awayTeamShortName = r.shortName.toLowerCase();
            }
          })
          
        })
      }) 

    })
    
  }
}
