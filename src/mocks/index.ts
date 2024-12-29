import {userMock} from "@/mocks/user_mock.ts";
export function apiMock() {
   const env = import.meta.env
    console.log(env.VITE_MOCK)
    if (env.VITE_MOCK !== "true"){
        return
    }
    console.log(6666)
    userMock()
}