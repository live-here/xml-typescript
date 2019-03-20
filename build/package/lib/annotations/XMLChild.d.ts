import 'reflect-metadata';
import { IXMLChildOptions } from "../interfaces/IXMLChildOptions";
export declare function XMLChild(target: any, key: string, descriptor?: TypedPropertyDescriptor<any>): void;
export declare function XMLChild(options: IXMLChildOptions): Function;
