import { IXMLAttributeOptions } from "../interfaces/IXMLAttributeOptions";
import { ICustomXMLAttributeOptions } from "../interfaces/ICustomXMLAttributeOptions";
export declare class XMLAttribute {
    private options;
    private name;
    static annotate(target: any, key: string, options?: IXMLAttributeOptions, descriptor?: TypedPropertyDescriptor<any>): void;
    static createAttribute(options: ICustomXMLAttributeOptions): XMLAttribute;
    setSchema(target: any, entity: any): void;
    private constructor();
}
