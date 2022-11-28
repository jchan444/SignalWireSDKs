declare const moment: any;
declare const Ws: any;
declare const ws: any;
interface Entry {
    content: string;
    id: Number;
    sentAt: string;
}
declare const messages: Entry[];
declare const getTime: () => string;
declare const createMessageObj: (message: string) => void;
declare const send: (message: string) => Promise<void>;
declare const disconnect: () => void;
declare const displayMessages: (messages: Entry[]) => string[];
