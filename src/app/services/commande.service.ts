import { Injectable } from '@angular/core';
import { Commande } from '../classes/commande';

@Injectable({
  providedIn: 'root'
})

export class CommandeService {

  private commande: Commande[];

  constructor() {
    this.commande = [];
  }

  getAllItems() {
    this.commande = JSON.parse(localStorage.getItem('Commande :') || '[]');
    return this.commande;
  }

  addItems(commande: Commande) {
    this.commande.push(commande);
    let tabItems = JSON.stringify(this.commande);
    localStorage.setItem("Commande :", tabItems);
  }
}
