import { Bookcategory } from './bookcategory'

export class Book {
    id :number 
    name :string 
    price:number
    description : string 
    imageUrl :string 
    active : boolean
    stockUnits : number
    createdDate : Date
    lastUpdate : Date
    category:Bookcategory
}
