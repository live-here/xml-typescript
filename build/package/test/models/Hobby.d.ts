export declare const HOBBY_NS = "h";
export declare class Hobby {
    readonly h: string;
    private name;
    private description;
    constructor(name: string, description: string);
    getName(): string;
    getDescription(): string;
}
