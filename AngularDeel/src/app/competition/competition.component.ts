import { Component, OnInit, Input } from '@angular/core';
import { SoccerService } from '../services/soccer.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  constructor(private svc: SoccerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.route.params.subscribe((params) =>{
      this.shortcomp = params.compid;
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


    })
    
  }


  ngOnChanges(){ 
    this.route.params.subscribe((params) =>{
    this.shortcomp = params.compid;
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


  })

  }

}
