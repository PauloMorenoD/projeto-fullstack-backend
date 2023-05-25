import { Exclude } from 'class-transformer'

interface Contact {
    id: number
    fullName: string
    email: string
    phone: string
    registerDate: string
}

export class User {
    readonly id: number | bigint
    fullName: string
    email: string

    @Exclude()
    password: string
    phone: string
    registerDate: Date |string
    contacts?:  Contact[] | null
 
}
