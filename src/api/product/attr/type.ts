// 属性的ts类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface CategoryObj {
    id: number | string,
    name: string,
    category1Id?: number,
    category2Id?: number
}

export interface CategoryResponseData extends ResponseData {
    data: CategoryObj[]
}

// 属性值的ts类型

// attrValueList中的属性值对象
export interface AttrValue {
    id?: number,
    valueName: string,
    attrId?: number,
    flag: boolean
}

export type AttrValueList = AttrValue[]

// data中的属性对象
export interface Attr {
    id?: number,
    attrName: string,
    categoryId: number|string,
    categoryLevel: number
    attrValueList: AttrValueList
}
export type AttrList = Attr[]

export interface AttrResponseData extends ResponseData {
    data: Attr[]
}



