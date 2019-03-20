export declare const DEFAULT_ATTRIBUTE_PROPERTY = "@";
export declare function ns(namepsace: string, value: string): string;
export declare function createCustomGetter(_options: {
    restrictTo?: any[];
    getter?: (entity: any) => any;
    value?: any;
}): (entity: any) => any;
