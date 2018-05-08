import { Component, OnInit } from '@angular/core';
import { SoccerService, competitions, League } from '../services/soccer.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {
  competitions: League.RootObject;
  standings : League.Standing[];
  constructor(private svc: SoccerService) { }

  ngOnInit() {
   this.svc.getCompetitionTable(445).subscribe(result => this.standings = result.standing);
  }

}
