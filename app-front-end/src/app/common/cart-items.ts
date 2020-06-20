import { Book } from './book'

export class CartItems {
    id:number
    name:string
    price:number
    quantity:number
    imageUrl:string
    stockUnits:number
    constructor(book:Book,quantity:number){
        this.id=book.id
        this.name=book.name
        this.price=book.price
        this.imageUrl=book.imageUrl
        this.quantity=quantity
        this.stockUnits=book.stockUnits
    }
}
