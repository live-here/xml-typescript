import 'reflect-metadata';
import { IXMLAttributeOptions } from "../interfaces/IXMLAttributeOptions";
export declare function XMLAttribute(target: any, key: string, descriptor?: TypedPropertyDescriptor<any>): void;
export declare function XMLAttribute(options: IXMLAttributeOptions): Function;
