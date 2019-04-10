export declare const HOBBY_NS = "h";
export declare class Hobby {
    readonly h: string;
    private name;
    private description;
    private xmlvalue;
    constructor(name: string, description: string, xmlvalue?: any);
    getName(): string;
    getDescription(): string;
    getXMLValue(): any;
}
