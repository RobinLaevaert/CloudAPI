import { Component, OnInit } from '@angular/core';
import { SoccerService, competitions, League } from '../services/soccer.service';
import "rxjs/add/operator/map";

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {
  competitions: League.RootObject;
  standings : League.Standing[];
  constructor(private svc: SoccerService) { }

  ngOnInit() 
  {
    var games
    this.svc.getCompetition(445).subscribe(result =>{
      games = result.numberOfMatchdays;
      console.log(games);
      this.svc.getCompetitionTable(445,games).subscribe(result => {
        this.standings = result.standing; 
        this.standings.forEach(s => {
          s.winpercentage = +((s.wins/s.playedGames).toFixed(2));
          s.drawpercentage = +((s.draws/s.playedGames).toFixed(2));
          s.losspercentage = +((s.losses/s.playedGames).toFixed(2));
        });
      }) 
    })
  }

  

}
