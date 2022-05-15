export class Offer {
    id: string;
    createdAt: string;
    updateAt: string;
    user: string;
    nft: string;
    porcentaje: string;
    duracion: string;
    descripcion: string;
    
    constructor(id, user, nft){
        this.id = id;
        this.user = user;
        this.nft = nft;
    }
}
