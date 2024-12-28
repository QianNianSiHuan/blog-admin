interface jwtPayload{
    userID: number
    username: string
    role: 1
    iss: string
    exp: 1735826708
}


export function parseToken(token:string) :jwtPayload{
    const payloadString:string = token.split(".")[1].replace(/-/g,'+').replace(/_/g,'/')
    return JSON.parse(window.atob(payloadString))
}