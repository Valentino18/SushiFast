import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandesComponent } from './component/commandes/commandes.component';
import { HomeComponent } from './component/home/home.component';
import { PanierComponent } from './component/panier/panier.component';
import { PlateauxComponent } from './component/plateaux/plateaux.component';
import { RgpdComponent } from './component/rgpd/rgpd.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "plateaux", component: PlateauxComponent },
  { path: "panier", component: PanierComponent },
  { path: "commandes", component: CommandesComponent },
  { path: "rgpd", component: RgpdComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
