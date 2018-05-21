import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  NO_ERRORS_SCHEMA, Component  } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FooterComponent } from './footer/footer.component';
import { StandingsComponent } from './standings/standings.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { CompetitionComponent } from './competition/competition.component';
import { FormsModule } from '@angular/forms';
import { SoccerService } from './services/soccer.service';
import { HttpClientModule } from '@angular/common/http';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { GamesComponent } from './games/games.component';
import { GameService } from './services/game.service';



@NgModule({
  declarations: [
    AppComponent,  
    NavBarComponent,
    HomeComponent,
    PageNotFoundComponent,
    FooterComponent,
    StandingsComponent,
    FixturesComponent,
    CompetitionComponent,
    TeamDetailComponent,
    GamesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent},
      { path: 'competition/:compid', component: CompetitionComponent},
      { path: 'team/:teamid', component: TeamDetailComponent},
      { path: 'gaming', component:GamesComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: "**", component: PageNotFoundComponent}
    ], { useHash: true }),
    HttpClientModule,
    
  
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [SoccerService, GameService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
