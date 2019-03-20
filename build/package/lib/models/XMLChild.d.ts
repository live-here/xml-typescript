import 'es6-shim';
import { IXMLChildOptions } from "../interfaces/IXMLChildOptions";
import { ICustomXMLChildOptions } from "../interfaces/ICustomXMLChildOptions";
import { ISchemaOptions } from "../interfaces/ISchemaOptions";
export declare class XMLChild {
    private options;
    private name;
    static annotate(target: any, key: string, options?: IXMLChildOptions, descriptor?: TypedPropertyDescriptor<any>): void;
    static createXmlChild(options: ICustomXMLChildOptions): XMLChild;
    setSchema(target: any, parentEntity: any, isAsync: boolean | undefined, schemaOptions: ISchemaOptions): any;
    private constructor();
    private resolveImplicitStructure;
    private getImplicitNodeTree;
    private getAttributes;
}
