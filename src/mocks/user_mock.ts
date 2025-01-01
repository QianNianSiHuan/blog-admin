import {mock,type MockjsRequestOptions} from "mockjs";

export function userMock() {
    console.log("userMockStart")
    mock(/.*?\/api\/user\/login/, function (options: MockjsRequestOptions) {
        console.log("userMockStart1")
        return {
            code: 0,
            data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkU5OEQ1RDJFRUQwNkMyMzEzQ0REMzMxRThCRkEyNDIxIiwibmlja19uYW1lIjoi5p6r5p6rIiwicm9sZSI6MSwidXNlcl9pZCI6MjUsImV4cCI6MTcxNjMyODE2OC4yNTk5NDEsImlzcyI6IjEyMzQifQ.vKVyuogE3K0BSsXrs7ptQTr8VSP2qazyr9PwK7kkQlM",
            msg: "成功"
        }
    })

    mock(/.*?\/api\/user\/detail/,function (options: MockjsRequestOptions){
        return {
            code: 0,
            data: {
                "id": 1,
                "createdAt": "2024-12-25T21:10:56.772+08:00",
                "username": "admin",
                "nickname": "",
                "avatar": "",
                "abstract": "",
                "registerSource": 3,
                "codeAge": 1,
                "role": 1,
                "userID": 1,
                "likeTags": null,
                "updateUsernameTime": null,
                "openCollect": false,
                "openFollow": false,
                "openFans": false,
                "homeStyleID": 0
            },
            msg: ""
        }
    })
}