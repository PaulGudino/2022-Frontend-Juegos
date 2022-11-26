export interface getAwardList{
    id: number;
    name: string;
    description : string;
    imagen : string;
    initial_stock : number;
    current_stock : number;
    prizes_awarded : number;
    is_active : boolean;
    created : string;
    modified : string;
    user_register : string;
    user_modify : string;
    category : string;
    game : string;
}