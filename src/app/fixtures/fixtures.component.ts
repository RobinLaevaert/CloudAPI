import { Component, OnInit, Input } from '@angular/core';
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
  @Input('childMessage') test: string;
  @Input('childMessage1') childMessage1: string;
  @Input('childMessage2') shortComp: string;
  constructor(private svc: SoccerService) { }

  getColor(result:competitionFixtures.Result){
    if(result.homeTeamWon == true){return "green"}
    
  }

  ngOnChanges(){
    if(this.childMessage1 !== undefined && this.test !== undefined){
    this.getFixtures(this.childMessage1,this.test);}
    
  }
  ngOnInit() {
    
  }

  getFixtures(compId, matchday){

    this.svc.getCompetitionTeams(compId).subscribe(result1 =>{
      this.teams = result1.teams;
      this.svc.getCompetitionFixtures(compId,matchday).subscribe(result => {
        this.fixtures = result.fixtures;
        this.fixtures.forEach(s => {
          if(s.result.goalsHomeTeam !== null){
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
          }}
          else{
            s.result.draw = false;
            s.result.homeTeamWon = false;
            s.result.homeTeamColor = "black";
            s.result.awayTeamColor = "black";
          }
          this.teams.forEach(r =>{
            if("FC Bayern München" == s.homeTeamName){
              s.homeTeamCrest = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/512px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png"
              s.homeTeamShortName = "bayern"
              if(r.name == s.awayTeamName){
                s.awayTeamCrest = r.crestUrl;
                s.awayTeamShortName = r.shortName.toLowerCase();
              }
            }
            else if("FC Bayern München" == s.awayTeamName){
              s.awayTeamCrest = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/512px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png"
              s.awayTeamShortName = "bayern"
              if(r.name == s.homeTeamName){
                s.homeTeamCrest = r.crestUrl;
                s.homeTeamShortName = r.shortName.toLowerCase();
                
              } 
            }
            else if(r.name == s.homeTeamName){
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


