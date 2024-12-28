import {userMock} from "@/mocks/user_mock.ts";
export function apiMock() {
   const env = import.meta.env
    if (env.VITE_MOCK !== "true"){
        return
    }
    userMock()
}