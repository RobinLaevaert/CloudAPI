import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-apipost',
  templateUrl: './apipost.component.html',
  styleUrls: ['./apipost.component.scss']
})
export class ApipostComponent implements OnInit {

  param;
  game:boolean;
  studio:boolean;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) =>{
      this.param = params.type;
      if(!(this.param == "studio" || this.param == "game")){
        this.router.navigate(['NotFound']);
      }
      switch(this.param){
        case "studio":
        this.game = false;
        this.studio = true;
        break;
        case "game":
        this.game = true;
        this.studio = false;
        break;
      }
    })
  }

}
