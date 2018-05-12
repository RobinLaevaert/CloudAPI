import { Component, OnInit, Input } from '@angular/core';
import { SoccerService, competitions, League, competitionTeams } from '../services/soccer.service';
import "rxjs/add/operator/map";

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {
  competitions: League.RootObject;
  standings : League.Standing[];
  teams: competitionTeams.Team[];
  competitionid: number = 445;
  constructor(private svc: SoccerService) { }
  @Input('childMessage') MatchDay: string;
  @Input('childMessage1') compID: string;
  @Input('childMessage2') shortComp: string;
  ngOnInit() 
  {
    
  }

  ngOnChanges(){
    if(this.compID !== undefined && this.MatchDay !== undefined){
    this.getStandings(this.compID,this.MatchDay);}
  }

  getStandings(competitionid, MatchDay){
    var games
    this.svc.getCompetitionTeams(competitionid).subscribe(result1 =>{
      this.teams = result1.teams;
        games = this.MatchDay;
        this.svc.getCompetitionTable(competitionid,games).subscribe(result => {
          this.standings = result.standing; 
          this.standings.forEach(s => {
            s.winpercentage = +(((s.wins/s.playedGames)*100).toFixed(2));
            s.drawpercentage = +(((s.draws/s.playedGames)*100).toFixed(2));
            s.losspercentage = +(((s.losses/s.playedGames)*100).toFixed(2));
            this.teams.forEach(r =>{
              if(r.name == s.teamName){
                s.teamShortName = r.shortName.toLowerCase();
              }
            })
            if(s.teamName == "FC Bayern München"){
              s.crestURI = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/512px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png"
            }
          });
        }) 
      
    })
  }

  
}
