export interface getAwardList{
    id: number;
    name: string;
    description : string;
    imagen : string;
    initial_stock : number;
    current_stock : number;
    prizes_awared : number;
    is_active : boolean;
    category : string;
    juego : string;
    user_register : string;
    user_modify : string;
}