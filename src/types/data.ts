export interface Country{
    id:number;
    name:string;
}

export interface Hotel{
    id:number;
    name:string;
    price:number;
}

export interface BoardType{
    code: "FB" | "HB" | "NB";
    name: string;
}

export interface Meal{
    id:number;
    name:string;
    price:number;
}

export interface CountryMeal{
    lunch: Meal[];
    dinner: Meal[];
}