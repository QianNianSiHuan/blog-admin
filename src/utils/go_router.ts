import router from "@/router";

export function goArticle(id:number) {
router.push({
    name:"articleDetail",
    params:{id}
})

}