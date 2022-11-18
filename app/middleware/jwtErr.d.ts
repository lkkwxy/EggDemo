import { Context } from 'egg';
export default function jwtErr(secret: string): (ctx: Context, next: () => Promise<void>) => Promise<void>;
