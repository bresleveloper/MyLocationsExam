
import { BaseDataItem } from "./BaseDataItem";
import { Category } from "./category";

export class MyLocation  extends BaseDataItem {
    categories:Category[]
    address:string
    coordinates:Coordinates
}

export class Coordinates  {
    lat:number
    lng:number
}

