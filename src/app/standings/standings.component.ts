import { Component, OnInit } from '@angular/core';
import { SoccerService, RootObject } from '../services/soccer.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {
  competitions: RootObject[]
  constructor(private svc: SoccerService) { }

  ngOnInit() {
   this.svc.getCompetitions().subscribe(result => this.competitions = result);
  }

}
