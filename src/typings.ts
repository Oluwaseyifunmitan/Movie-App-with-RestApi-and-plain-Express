interface MovieInterface{
    title: string,
    description : string,
    image: string,
    price: number,
    id: string
}

interface UserInterface{
    fullname: string,
   username: string,
   email: string, // no duplicates allowed.
   password: string
}