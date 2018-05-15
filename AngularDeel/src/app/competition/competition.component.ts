import { Component, OnInit } from '@angular/core';
import { SoccerService } from '../services/soccer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {
  speelronde: number;
  speelrondes: number[] = [];
  maxspeelronde: number;
  competitionID: number;
  competitie: number;
  shortcomp: string;
  constructor(private svc: SoccerService, private router: Router) { }

  ngOnInit() {
    console.log(this.router.url.slice(13).toUpperCase());
    this.svc.getCompetitions().subscribe(result =>{

      result.forEach(s =>{
        if(s.league == this.router.url.slice(13).toUpperCase()){
          this.competitionID = s.id;
          this.competitie = s.id;
        }
      })
      console.log(this.competitionID);
      this.svc.getCompetition(this.competitionID).subscribe(res =>{
        this.speelronde = res.currentMatchday;
        this.maxspeelronde = res.numberOfMatchdays;
        this.shortcomp = res.league.toLowerCase();
        for(var i = 1;i <= this.maxspeelronde; i++){
          this.speelrondes.push(i);
        }
        this.speelrondes.reverse();
      })
    })
    
  }

  ngOnChanges(){
    console.log(this.router.url.slice(13).toUpperCase());
    this.svc.getCompetitions().subscribe(result =>{

      result.forEach(s =>{
        if(s.league == this.router.url.slice(13).toUpperCase()){
          this.competitionID = s.id;
          this.competitie = s.id;
        }
      })
      console.log(this.competitionID);
      this.svc.getCompetition(this.competitionID).subscribe(res =>{
        this.speelronde = res.currentMatchday;
        this.maxspeelronde = res.numberOfMatchdays;
        this.shortcomp = res.league.toLowerCase();
        for(var i = 1;i <= this.maxspeelronde; i++){
          this.speelrondes.push(i);
        }
        this.speelrondes.reverse();
      })
    })
  }

  

}
