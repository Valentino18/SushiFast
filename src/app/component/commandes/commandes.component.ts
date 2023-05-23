import { Component, OnInit } from '@angular/core';
import { Historique } from 'src/app/classes/historique';
import { HistoriquesService } from '../../services/historiques.service';
import {
  FormControl,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {
  
  nbOflesCommandes: number;
  lesHistoriques: Historique[];
  deleteCommande!: FormGroup;

  constructor(private historiquesService: HistoriquesService) {
    this.lesHistoriques = this.historiquesService.getAllHistoriques() ;
    console.log(this.lesHistoriques)
    this.nbOflesCommandes = this.lesHistoriques.length;
  }
  ngOnInit(): void {
    this.deleteCommande = new FormGroup({
      nom: new FormControl('')
    });
  }

  supprimer(dateCommande: any) {
    let storedTotal = JSON.parse(localStorage.getItem('Historique :') || '[]');
    for (let x = 0; x < storedTotal.length; x++) {
      if (storedTotal[x].dateCommande == dateCommande) {
        storedTotal.splice(x, 1);
      }
    }
    storedTotal = JSON.stringify(storedTotal);
    localStorage.setItem('Historique :', storedTotal);
    window.location.reload();
  }
  supprimerAll() {
    localStorage.removeItem('Historique :');
    window.location.reload();
  }

}
