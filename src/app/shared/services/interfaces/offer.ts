export class Offer {
    id: string;
    createdAt: string;
    updateAt: string;
    userId: string;
    nft: string;
    porcentaje: string;
    duracion: string;
    descripcion: string;
    
    constructor(id, user, nft){
        this.id = id;
        this.userId = user;
        this.nft = nft;
    }
}
