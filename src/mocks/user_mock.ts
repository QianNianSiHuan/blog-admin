import {mock,type MockjsRequestOptions} from "mockjs";

export function userMock() {
    mock(/.*?\/api\/user\/login/, function (options: MockjsRequestOptions) {
        return {
            code: 0,
            data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkU5OEQ1RDJFRUQwNkMyMzEzQ0REMzMxRThCRkEyNDIxIiwibmlja19uYW1lIjoi5p6r5p6rIiwicm9sZSI6MSwidXNlcl9pZCI6MjUsImV4cCI6MTcxNjMyODE2OC4yNTk5NDEsImlzcyI6IjEyMzQifQ.vKVyuogE3K0BSsXrs7ptQTr8VSP2qazyr9PwK7kkQlM",
            msg: ""
        }
    })
}