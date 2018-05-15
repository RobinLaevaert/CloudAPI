import { Component, OnInit } from '@angular/core';
import { SoccerService, Team, League, Players, TeamFixtures } from '../services/soccer.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {
  TeamObject: Team.RootObject;
  id: number;
  competitionid: number;
  standings : League.Standing[];
  Defenders: Players.Player[] =[];
  Midfielders: Players.Player[] =[];
  Attackers: Players.Player[] =[];
  Keepers: Players.Player[] = [];
  players: Players.Player[];
  Fixtures: TeamFixtures.Fixture[];
  
  constructor(private svc : SoccerService, private router: Router) { }

  ngOnInit() {
    console.log(this.router.url);
    console.log(this.router.url.slice(6));
    this.svc.getTeamFromName(this.router.url.slice(6)).subscribe(res =>{
      this.id = res.teams[0].id;
      this.competitionid = res.teams[0].currentCompetition;

      this.svc.getTeam(this.id).subscribe(result =>{
        this.TeamObject = result;
        this.svc.getCompetitionTable(this.competitionid,38).subscribe(result => {
          this.standings = result.standing;
          this.TeamObject.currentLeague = result.leagueCaption
          this.standings.forEach(s =>{
            if(s.teamName == this.TeamObject.name){
              this.TeamObject.currenPoints = `${s.points} pts`;
              switch(s.position){
                case 1: 
                  this.TeamObject.currentPlace = "1st"
                break;
                case 2:
                  this.TeamObject.currentPlace = "2nd"
                break;
                default:
                  this.TeamObject.currentPlace = `${s.position}th`
                break;
              }
            }
          })
  
          this.svc.getTeamFixtures(this.id).subscribe(result =>{
            this.Fixtures = result.fixtures;
            this.Fixtures.reverse();
            this.Fixtures.forEach(s => {
              if(+(s._links.competition.href.slice(45)) == this.competitionid){
                this.standings.forEach(r =>{
                  if(s.homeTeamName == r.teamName){s.crestHomeTeam = r.crestURI}
                  if(s.awayTeamName == r.teamName){s.crestAwayTeam = r.crestURI}
                })
              }
              else{
                if(s.homeTeamName == "FC Bayern München"){
                  s.crestHomeTeam = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/512px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png"
                }
                else if(s.homeTeamName == this.TeamObject.name){
                  s.crestHomeTeam = this.TeamObject.crestUrl;
                }
                else{
                  this.svc.getTeam(+(s._links.homeTeam.href.slice(38))).subscribe(res =>{
                    s.crestHomeTeam = res.crestUrl;
                  })
                }
                if(s.awayTeamName == "FC Bayern München"){
                  s.crestAwayTeam = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/512px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png"
                }
                else if(s.awayTeamName == this.TeamObject.name){
                  s.crestAwayTeam = this.TeamObject.crestUrl;
                }
                else{
                  this.svc.getTeam(+(s._links.awayTeam.href.slice(38))).subscribe(res =>{
                  s.crestAwayTeam = res.crestUrl;})
                }
              }
            });
          })
        
        })
      })
      
  
      
      this.svc.getPlayers(this.id).subscribe(result =>{
        this.players = result.players;
        
        this.players.forEach(p => {
          if(p.nationality == "England"){
            p.nationalityFlag = "https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/800px-Flag_of_England.svg.png"
          }
          else if(p.nationality == "Scotland"){
            p.nationalityFlag = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Flag_of_Scotland.svg/1000px-Flag_of_Scotland.svg.png"
          }
          else if(p.nationality == "Wales"){
            p.nationalityFlag = "https://upload.wikimedia.org/wikipedia/commons/5/59/Flag_of_Wales_2.svg"
          }
          else if(p.nationality == "Belgium"){
            p.nationalityFlag = "http://nationalflagstore.com/wp-content/uploads/2014/07/belgium-flag1.jpg"
          }
          else if(p.nationality == "United States"){
            p.nationalityFlag = "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
          }
          else{
            this.svc.getFlag(p.nationality).subscribe(res =>{
              p.nationalityFlag = res[0].flag;        
            })
          }
        });
        
        this.players.forEach(p =>{
          switch(p.position){
            case "Keeper":
              this.Keepers.push(p);
            break;
            case "Right-Back":
              this.Defenders.push(p);
            break;
            case "Centre-Back":
              this.Defenders.push(p);
            break;
            case "Left-Back":
              this.Defenders.push(p);
            break;
            case "Defensive Midfield":
              this.Midfielders.push(p);
            break;
            case "Central Midfield":
              this.Midfielders.push(p);
            break;
            case "Attacking Midfield":
              this.Midfielders.push(p);
            break;
            case "Right Wing":
              this.Attackers.push(p);
            break;
            case "Left Wing":
              this.Attackers.push(p);
            break;
            case "Centre-Forward":
              this.Attackers.push(p);
            break;
          }
        })
      })


    })
    
    /*this.svc.getCompetitions().subscribe(res =>{
      res.forEach(s =>{
        if(s.league == this.router.url.slice(13).toUpperCase()){}
      })
    })*/
    
      //teams = 38
      //competitions = 45
    /*this.svc.getTeamFixtures(this.id).subscribe(result =>{
      this.Fixtures = result.fixtures;
      this.Fixtures.forEach(s => {
        if(+(s._links.competition.href.slice(45)) == this.competitionid){
          
        }
        else{
          this.svc.getTeam(+(s._links.homeTeam.href.slice(38))).subscribe(res =>{
            s.crestHomeTeam = res.crestUrl;
          })
          this.svc.getTeam(+(s._links.awayTeam.href.slice(38))).subscribe(res =>{
            s.crestAwayTeam = res.crestUrl;
          })
        }
      });
    })*/
  }

}
