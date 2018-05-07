import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  NO_ERRORS_SCHEMA  } from '@angular/core';
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


@NgModule({
  declarations: [
    AppComponent,  
    NavBarComponent,
    HomeComponent,
    PageNotFoundComponent,
    FooterComponent,
    StandingsComponent,
    FixturesComponent,
    CompetitionComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent},
      { path: 'competition/epl', component: CompetitionComponent},
      { path: 'competition/ligue1', component: CompetitionComponent},
      { path: 'competition/bundes', component: CompetitionComponent},
      { path: 'competition/laliga', component: CompetitionComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: "**", component: PageNotFoundComponent}
    ], { useHash: true }),
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
