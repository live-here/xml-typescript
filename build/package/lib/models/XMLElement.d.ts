import 'reflect-metadata';
import * as Promise from "bluebird";
import { XMLChild } from "./XMLChild";
import { XMLAttribute } from "./XMLAttribute";
import { IXMLElementOptions } from "../interfaces/IXMLElementOptions";
import { ISchemaOptions } from "../interfaces/ISchemaOptions";
export declare class XMLElement {
    private attributes;
    private children;
    private root?;
    static serialize(entity: any): string;
    static serialize(root: string, entity: any): string;
    static serializeAsync(entity: any): Promise<string>;
    static serializeAsync(root: string, entity: any): Promise<string>;
    static getSchema(entities: any[], schemaOptions?: ISchemaOptions): any;
    static getSchema(entity: any, schemaOptions?: ISchemaOptions): any;
    static getSchemaAsync(entities: any[], schemaOptions?: ISchemaOptions): Promise<any>;
    static getSchemaAsync(entity: any, schemaOptions?: ISchemaOptions): Promise<any>;
    static getXMLElement(target: any): XMLElement | undefined;
    static setXMLElement(target: any, element: XMLElement): void;
    static getOrCreateIfNotExists(target: any): XMLElement;
    static annotate(target: any, options: IXMLElementOptions): void;
    private static processSchema;
    private static getRootAndEntity;
    addAttribute(attribute: XMLAttribute): void;
    addChild(child: XMLChild): void;
    private getSchema;
}