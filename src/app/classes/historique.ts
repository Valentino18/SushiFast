export class Historique {
    constructor(
    public listeCommande:  string[],
    public nbItems: number,
    public prixTotal: number,
    public dateCommande: any,
    public dateCommandeFormat: any
    ) { }
}
