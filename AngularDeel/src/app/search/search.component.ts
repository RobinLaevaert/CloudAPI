import { Component, OnInit } from '@angular/core';
import { SoccerService, LookupTeam } from '../services/soccer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchResult: LookupTeam.RootObject;
  searchString: string;
  constructor(private svc: SoccerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(s => {
      this.searchString = s.search;
      if(this.searchString != "undefined"){
        this.Search(this.searchString);
      }
    })
  }

  Search(searchString: string){
    this.svc.getTeamFromName(searchString).subscribe(s =>{
      this.searchResult = s;
    })
  }

}
