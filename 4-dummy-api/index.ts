import axios from "axios";

enum Gender {
    MALE = 'male',
    FEMALE = 'female'
}

enum Currencies {
    CNY = 'CNY',
    SEK = 'SEK',
    INR = 'INR',
    CAD = 'CAD',
    BRL = 'BRL',
    EUR = 'EUR',
    GBP = 'GBP',
    USD = 'USD',
    NZD = 'NZD',
    PKR = 'PKR',
    TRY = 'TRY',
    JPY = 'JPY'
}

enum CardTypes {
    ELO = 'Elo',
    KOREAN_EXPRESS = 'Korean Express',
    MASTERCARD = 'Mastercard',
    AMERICAN_EXPRESS = 'American Express',
    DINERS_CLUB_INTERNATIONAL = 'Diners Club International',
    JCB = 'JCB',
    MAESTRO = 'Maestro',
    VISA = 'Visa',
    NPS = 'NPS',
    DISCOVER = 'Discover',
    CARTE_BANCAIRE = 'Carte Bancaire',
    MIR = 'Mir',
    UNION_PAY = 'UnionPay',
    RU_PAY = 'RuPay',
    BC_CARD = 'BC Card'
}

interface Hair {
    color: string
    type: string
}

interface Coordinates {
    lat: number
    lng: number
}

interface Address {
    address: string
    city: string
    state: string
    stateCode: string
    postalCode: string
    coordinates: Coordinates
    country: string
}

// CardTypes и Currencies можно было конечно string обойтись, но в любом случае дальше в коде будем
// манипулировать с этими данными и их enum понадобится
interface Bank {
    cardExpire: string
    cardNumber: string
    cardType: CardTypes
    currency: Currencies
    iban: string
}

interface Company {
    department: string
    name: string
    title: string
    address: Address
}

interface CryptoWallet {
    coin: string
    wallet: string
    network: string
}

interface User {
    id: number
    firstName: string
    lastName: string
    maidenName: string
    age: number
    gender: Gender
    email: string
    phone: string
    username: string
    password: string
    birthDate: string
    image: string
    bloodGroup: string
    height: number
    weight: number
    eyeColor: string
    hair: Hair
    ip: string
    address: Address
    macAddress: string
    university: string
    bank: Bank
    company: Company
    ein: string
    ssn: string
    userAgent: string
    crypto: CryptoWallet
    role: string
}

interface ResponseGetUser {
    users: User[]
    total: number
    skip: number
    limit: number
}

async function getUsers(): Promise<ResponseGetUser> {
    try {
        const response = await axios.get<ResponseGetUser>('https://dummyjson.com/users')
        return response.data
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
        throw new Error("Unknown error")
    }
}

getUsers()
    .then((res) => console.log(res.users))
    .catch((error) => console.error(error))
