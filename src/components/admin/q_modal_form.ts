import type {FieldRule} from "@arco-design/web-vue";
import type {optionsFunc, optionsType} from "@/api/index.ts";

export type emitFnType = (val: boolean) => void

export interface formListType {
    label: string
    field: string
    type?: "input" | "textarea" | "select" | "switch" | "radio" | "password"
    validateTrigger?: "focus" | "input" | "change" | "blur" | ("focus" | "input" | "change" | "blur")[];
    rules?: FieldRule<any> | FieldRule<any>[]
    source?: optionsType[] | optionsFunc
    options?: optionsType[]
    autoSize?: boolean | {
        minRows?: number | undefined;
        maxRows?: number | undefined;
    }
    multiple?: boolean
    editDisable?: boolean//选项框是否编辑不可见
}
