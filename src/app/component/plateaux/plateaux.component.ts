import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SushiService } from 'src/app/config/sushi-shop.service';
import { CommandeService } from '../../services/commande.service';
import { Commande } from '../../classes/commande';

@Component({
  selector: 'app-plateaux',
  templateUrl: './plateaux.component.html',
  styleUrls: ['./plateaux.component.css']
})
export class PlateauxComponent implements OnInit {

  sushi: any;
  boxeForm!: FormGroup;

  constructor(private commandeService:CommandeService, public sushiService: SushiService) { }
  
  ngOnInit() {
    this.displayAllsushis();
    this.boxeForm = new FormGroup({});
  }

  get formControls() { return this.boxeForm.controls; }

  displayAllsushis() {
    return this.sushiService.getAllsushis().subscribe(value => {
      this.sushi = value;
    })
  }

  addPanier(nom: string, prix: number, image: string) { 
    alert("un item ajouté")
    let laBoxe = new Commande(nom, prix, image);
    this.commandeService.addItems(laBoxe);
  }

}
