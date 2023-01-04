export interface getAwardList{
    id: number;
    name: string;
    description: string;
    imagen: string;
    initial_stock: number;
    condition_stock: number;
    prizes_awarded: number;
    is_active: boolean;
    created: string;
    modified: string;
    user_register: string;
    user_modify: string;
    category: string;
    game: string;
    is_past: boolean,
    total_awards: number
}