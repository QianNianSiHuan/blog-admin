import router from "@/router";

export function goArticle(id: number) {
    router.push({
        name: "articleDetail",
        params: {id}
    })
}

export function goArticleEdit(id: number) {
    router.push({
        name: "platformArticleEdit",
        params: {id}
    })
}

export function goUser(id: number) {
    router.push({
        name: "userArticle",
        params: {id: id}
    })
}

export function goUserCollect(id: number) {
    router.push({
        name: "userArticleCollect",
        params: {id: id}
    })
}