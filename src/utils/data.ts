import dayjs from "dayjs";
import reactiveTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn"
import type {TableColumnData} from "@arco-design/web-vue";
dayjs.extend(reactiveTime)
dayjs.locale('zh-cn')


export type dateTemType = "dateTime"|"date"|"time"|"current"|undefined


export function dateTimeFormat(date:string):string{
    return  dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

export function dateFormat(date:string):string{
    return  dayjs(date).format('YYYY-MM-DD')
}

export function timeFormat(date:string):string{
    return  dayjs(date).format('HH:mm:ss')
}

export function  dateCurrentFormat(date:string):string{
return dayjs().to(dayjs(date))
}

export function dataTemFormat(date:string,name?:dateTemType):string{
    if (name==="date"){
        return dateFormat(date)
    }
    if (name==="time"){
        return timeFormat(date)
    }
    if (name==="current"){
        return dateCurrentFormat(date)
    }
    return dateTimeFormat(date)
}