export const sqls: string[] = ['SELECT', 'DELETE', 'INSERT', 'UPDATE', 'WHERE', 'DROP', 'add'];
export const NoSQL = (v: any): boolean => !sqls.includes(v) && !sqls.find((sql: string) => `${v}`.includes(sql));

export * from './auth';
