import { Component, OnInit } from '@angular/core';
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

  ngOnInit() 
  {
    var games
    this.svc.getCompetitionTeams(this.competitionid).subscribe(result1 =>{
      this.teams = result1.teams;
      this.svc.getCompetition(this.competitionid).subscribe(result =>{
        games = result.numberOfMatchdays;
        this.svc.getCompetitionTable(this.competitionid,games).subscribe(result => {
          this.standings = result.standing; 
          this.standings.forEach(s => {
            s.winpercentage = +((s.wins/s.playedGames).toFixed(2));
            s.drawpercentage = +((s.draws/s.playedGames).toFixed(2));
            s.losspercentage = +((s.losses/s.playedGames).toFixed(2));
            this.teams.forEach(r =>{
              if(r.name == s.teamName){
                s.teamShortName = r.shortName.toLowerCase();
              }
            })
          });
        }) 
      })
    })
  }
}
