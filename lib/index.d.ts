export declare const Greeter: (name: string) => string;
interface Dict {
    [key: string]: any;
}
declare global {
    interface Window {
        ahui: string;
    }
    interface String {
        parseUrl(): Dict;
        parseStr(key?: string): Dict;
        addParams(params: Dict, withHost: boolean): string;
        encodeEntities(): string;
    }
}
export {};
