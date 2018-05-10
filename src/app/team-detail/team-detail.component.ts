import { Component, OnInit } from '@angular/core';
import { SoccerService, Team, League, Players } from '../services/soccer.service';





@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {
  TeamObject: Team.RootObject;
  id: number = 65;
  competitionid: number = 445;
  standings : League.Standing[];
  Defenders: Players.Player[] =[];
  Midfielders: Players.Player[] =[];
  Attackers: Players.Player[] =[];
  Keepers: Players.Player[] = [];
  players: Players.Player[];
  
  constructor(private svc : SoccerService) { }

  ngOnInit() {
    var games;
    

    this.svc.getCompetition(this.competitionid).subscribe(result1 =>{
      games = result1.numberOfMatchdays;
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
        })
      })
    })

    
    this.svc.getPlayers(this.id).subscribe(result =>{
      this.players = result.players;
      
      
      this.players.forEach(p => {
        if(p.nationality == "England"){
          p.nationalityFlag = "https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/800px-Flag_of_England.svg.png"
        }
        else if(p.nationality == "Belgium"){
          p.nationalityFlag = "http://nationalflagstore.com/wp-content/uploads/2014/07/belgium-flag1.jpg"
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
  }

}
