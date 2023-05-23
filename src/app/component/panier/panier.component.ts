import {
  Component,
  OnInit
} from '@angular/core';
import {
  Commande
} from '../../classes/commande';
import {
  CommandeService
} from '../../services/commande.service';
import {
  FormControl,
  FormGroup
} from '@angular/forms';
import { HistoriquesService } from '../../services/historiques.service';
import { Historique } from 'src/app/classes/historique';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  nbOflesCommandes: number;
  lesCommandes: Commande[];
  deleteArticle!: FormGroup;
  boxeForm!: FormGroup;

  
  constructor(private commandeService: CommandeService, private historiquesService: HistoriquesService) {
    this.lesCommandes = this.commandeService.getAllItems();
    this.nbOflesCommandes = this.lesCommandes.length;
  }

  ngOnInit(): void {
    this.deleteArticle = new FormGroup({
      nom: new FormControl('')
    });
    this.checkAllsushi()
  }

  checkAllsushi() {
    const objets = this.lesCommandes.map(value => value.nom) 
    const panier: Map<string, number> = new Map();
    objets.forEach(objet => (panier.set(objet, (panier.get(objet)  || 0) + 1)))
    objets.forEach(function(objet)     
  { 
    panier.set(objet, (panier.get(objet)  || 0) + 1)
    let test = panier.get(objet)
    if(typeof test == "undefined") {
      /// PARTIE UNDEFINED (possible object null)
    } else {
      if(test >= 10) {
        /// CODE HERE POUR REMOVE LES AUTRES COMMANDE
      }
    }
  })
}

  supprimer(nom: string) {
    let storedNames = JSON.parse(localStorage.getItem('Commande :') || '[]');
    for (let x = 0; x < storedNames.length; x++) {
      if (storedNames[x].nom.includes(nom)) {
        storedNames.splice(x, 1);
      }
    }
    storedNames = JSON.stringify(storedNames);
    localStorage.setItem('Commande :', storedNames);
    window.location.reload();
  }

  supprimerAll() {
    localStorage.removeItem('Commande :');
    window.location.reload();
  }

  addPayment(lesCommandes: Commande[]) {

    let listeCommande: string[] = [], nbItems: number = 0, prixTotal: number = 0, dateCommande,  dateCommandeFormat;

    const timeElapsed = Date.now();
    dateCommande = new Date(timeElapsed);

    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const year = day * 365;

    dateCommandeFormat = dateCommande.toUTCString();

    lesCommandes.forEach(element => {
      listeCommande.push(element.nom)
      nbItems += 1
      prixTotal += element.prix
    });

    function entierAleatoire(min: any, max: any) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let randomPayment = entierAleatoire(1, 2)
    let successPayment = entierAleatoire(1, 2)

    if (successPayment === randomPayment) {
        alert("Payment Success")
        window.location.href = "/commandes"
        let laBoxe = new Historique(listeCommande, nbItems, prixTotal, dateCommande, dateCommandeFormat);
        this.historiquesService.addHistoriques(laBoxe);
        localStorage.removeItem('Commande :');
    } else {
      alert("Payment Failed")
    }
  }
}