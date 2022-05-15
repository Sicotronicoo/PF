export class Nft {
    id: string;
    createdAt: string;
    updateAt: string;
    nameNft: string;
    nameCrypto: string;
    web: string;

    constructor(id, nameNft, nameCrypto,web){
        this.id = id;
        this.nameNft = nameNft;
        this.nameCrypto = nameCrypto;
        this.web = web;
    }
}