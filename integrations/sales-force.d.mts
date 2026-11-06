export function withSalesForce<T extends (request: Request) => Promise<Response>>(handler:T,options:{brand:string;form:string;page:string;getEnv:()=>Promise<Record<string,string|undefined>>}):T;
