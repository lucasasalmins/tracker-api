import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Query Engine version: 2accb9c7eacdc984874eaeb63377fe705dfd3203
 * Prisma Client JS version: 2.0.0-beta.1
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}


declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export declare type TrueKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string, collectTimestamps?: any): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/


export type Datasources = {
  db?: string
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  datasources?: Datasources

  /**
   * @default "pretty"
   */
  errorFormat?: ErrorFormat

  log?: Array<LogLevel | LogDefinition>

  /**
   * You probably don't want to use this. `__internal` is used by internal tooling.
   */
  __internal?: {
    debug?: boolean
    hooks?: Hooks
    engine?: {
      cwd?: string
      binaryPath?: string
    }
    measurePerformance?: boolean
  }

  /**
   * Useful for pgbouncer
   */
  forceTransactions?: boolean
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends Array<LogLevel | LogDefinition>> = GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]>

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://github.com/prisma/prisma2/blob/master/docs/prisma-client-js/api.md).
 */
export declare class PrismaClient<T extends PrismaClientOptions = {}, U = keyof T extends 'log' ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://github.com/prisma/prisma2/blob/master/docs/prisma-client-js/api.md).
   */
  constructor(optionsArg?: T);
  on<V extends U>(eventType: V, callback: V extends never ? never : (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  connect(): Promise<void>;
  /**
   * @private
   */
  private runDisconnect;
  /**
   * Disconnect from the database
   */
  disconnect(): Promise<any>;
  /**
   * Makes a raw query
   * @example
   * ```
   * // Fetch all entries from the `User` table
   * const result = await prisma.raw`SELECT * FROM User;`
   * // Or
   * const result = await prisma.raw('SELECT * FROM User;')
   * 
   * // With parameters use prisma.raw``, values will be escaped automatically
   * const userId = '1'
   * const result = await prisma.raw`SELECT * FROM User WHERE id = ${userId};`
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma2/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  raw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;

  /**
   * `prisma.entry`: Exposes CRUD operations for the **Entry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Entries
    * const entries = await prisma.entry.findMany()
    * ```
    */
  get entry(): EntryDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const OrderByArg: {
  asc: 'asc',
  desc: 'desc'
};

export declare type OrderByArg = (typeof OrderByArg)[keyof typeof OrderByArg]



/**
 * Model User
 */

export type User = {
  createdAt: number
  email: string
  firstName: string | null
  googleId: string | null
  googleImageUrl: string | null
  id: number
  lastName: string | null
  password: string
  role: string
  updatedAt: number
}

export type UserSelect = {
  createdAt?: boolean
  email?: boolean
  firstName?: boolean
  googleId?: boolean
  googleImageUrl?: boolean
  id?: boolean
  lastName?: boolean
  password?: boolean
  role?: boolean
  updatedAt?: boolean
  Entry?: boolean | FindManyEntryArgs
}

export type UserInclude = {
  Entry?: boolean | FindManyEntryArgs
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs
  ? 'include' extends U
    ? User  & {
      [P in TrueKeys<S['include']>]:
      P extends 'Entry'
      ? Array<EntryGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
      P extends 'Entry'
      ? Array<EntryGetPayload<S['select'][P]>> : never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, UserClient<User | null>, UserClient<UserGetPayload<T> | null>>
  /**
   * Find zero or more Users.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.user.findMany()
   * 
   * // Get first 10 Users
   * const users = await prisma.user.findMany({ first: 10 })
   * 
   * // Only select the `createdAt`
   * const userWithCreatedAtOnly = await prisma.user.findMany({ select: { createdAt: true } })
   * 
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
  /**
   * Create a User.
   * @param {UserCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const user = await prisma.user.create({
   *   data: {
   *     // ... data to create a User
   *   }
   * })
   * 
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, UserClient<User>, UserClient<UserGetPayload<T>>>
  /**
   * Delete a User.
   * @param {UserDeleteArgs} args - Arguments to delete one User.
   * @example
   * // Delete one User
   * const user = await prisma.user.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   * 
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, UserClient<User>, UserClient<UserGetPayload<T>>>
  /**
   * Update one User.
   * @param {UserUpdateArgs} args - Arguments to update one User.
   * @example
   * // Update one User
   * const user = await prisma.user.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provider data here
   *   }
   * })
   * 
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, UserClient<User>, UserClient<UserGetPayload<T>>>
  /**
   * Delete zero or more Users.
   * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await prisma.user.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
   * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const user = await prisma.user.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provider data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one User.
   * @param {UserUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Update or create a User
   * const user = await prisma.user.upsert({
   *   create: {
   *     // ... data to create a User
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the User we want to update
   *   }
   * })
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, UserClient<User>, UserClient<UserGetPayload<T>>>
  /**
   * 
   */
  count(): Promise<number>
}

export declare class UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  Entry<T extends FindManyEntryArgs = {}>(args?: Subset<T, FindManyEntryArgs>): CheckSelect<T, Promise<Array<Entry>>, Promise<Array<EntryGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput | null
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: UserOrderByInput | null
  /**
   * Skip the first `n` Users.
  **/
  skip?: number | null
  /**
   * Get all Users that come after the User you provide with the current order.
  **/
  after?: UserWhereUniqueInput | null
  /**
   * Get all Users that come before the User you provide with the current order.
  **/
  before?: UserWhereUniqueInput | null
  /**
   * Get the first `n` Users.
  **/
  first?: number | null
  /**
   * Get the last `n` Users.
  **/
  last?: number | null
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput | null
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput | null
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
}



/**
 * Model Entry
 */

export type Entry = {
  created_at: number
  id: number
  item: string
  occurred: number
  updatedAt: number
  userId: number
  value: string
}

export type EntrySelect = {
  created_at?: boolean
  id?: boolean
  item?: boolean
  occurred?: boolean
  updatedAt?: boolean
  userId?: boolean
  value?: boolean
  User?: boolean | UserArgs
}

export type EntryInclude = {
  User?: boolean | UserArgs
}

export type EntryGetPayload<
  S extends boolean | null | undefined | EntryArgs,
  U = keyof S
> = S extends true
  ? Entry
  : S extends undefined
  ? never
  : S extends EntryArgs
  ? 'include' extends U
    ? Entry  & {
      [P in TrueKeys<S['include']>]:
      P extends 'User'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Entry ? Entry[P]
: 
      P extends 'User'
      ? UserGetPayload<S['select'][P]> : never
    }
  : Entry
: Entry


export interface EntryDelegate {
  /**
   * Find zero or one Entry.
   * @param {FindOneEntryArgs} args - Arguments to find a Entry
   * @example
   * // Get one Entry
   * const entry = await prisma.entry.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneEntryArgs>(
    args: Subset<T, FindOneEntryArgs>
  ): CheckSelect<T, EntryClient<Entry | null>, EntryClient<EntryGetPayload<T> | null>>
  /**
   * Find zero or more Entries.
   * @param {FindManyEntryArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Entries
   * const entries = await prisma.entry.findMany()
   * 
   * // Get first 10 Entries
   * const entries = await prisma.entry.findMany({ first: 10 })
   * 
   * // Only select the `created_at`
   * const entryWithCreated_atOnly = await prisma.entry.findMany({ select: { created_at: true } })
   * 
  **/
  findMany<T extends FindManyEntryArgs>(
    args?: Subset<T, FindManyEntryArgs>
  ): CheckSelect<T, Promise<Array<Entry>>, Promise<Array<EntryGetPayload<T>>>>
  /**
   * Create a Entry.
   * @param {EntryCreateArgs} args - Arguments to create a Entry.
   * @example
   * // Create one Entry
   * const user = await prisma.entry.create({
   *   data: {
   *     // ... data to create a Entry
   *   }
   * })
   * 
  **/
  create<T extends EntryCreateArgs>(
    args: Subset<T, EntryCreateArgs>
  ): CheckSelect<T, EntryClient<Entry>, EntryClient<EntryGetPayload<T>>>
  /**
   * Delete a Entry.
   * @param {EntryDeleteArgs} args - Arguments to delete one Entry.
   * @example
   * // Delete one Entry
   * const user = await prisma.entry.delete({
   *   where: {
   *     // ... filter to delete one Entry
   *   }
   * })
   * 
  **/
  delete<T extends EntryDeleteArgs>(
    args: Subset<T, EntryDeleteArgs>
  ): CheckSelect<T, EntryClient<Entry>, EntryClient<EntryGetPayload<T>>>
  /**
   * Update one Entry.
   * @param {EntryUpdateArgs} args - Arguments to update one Entry.
   * @example
   * // Update one Entry
   * const entry = await prisma.entry.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provider data here
   *   }
   * })
   * 
  **/
  update<T extends EntryUpdateArgs>(
    args: Subset<T, EntryUpdateArgs>
  ): CheckSelect<T, EntryClient<Entry>, EntryClient<EntryGetPayload<T>>>
  /**
   * Delete zero or more Entries.
   * @param {EntryDeleteManyArgs} args - Arguments to filter Entries to delete.
   * @example
   * // Delete a few Entries
   * const { count } = await prisma.entry.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends EntryDeleteManyArgs>(
    args: Subset<T, EntryDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Entries.
   * @param {EntryUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Entries
   * const entry = await prisma.entry.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provider data here
   *   }
   * })
   * 
  **/
  updateMany<T extends EntryUpdateManyArgs>(
    args: Subset<T, EntryUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Entry.
   * @param {EntryUpsertArgs} args - Arguments to update or create a Entry.
   * @example
   * // Update or create a Entry
   * const entry = await prisma.entry.upsert({
   *   create: {
   *     // ... data to create a Entry
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Entry we want to update
   *   }
   * })
  **/
  upsert<T extends EntryUpsertArgs>(
    args: Subset<T, EntryUpsertArgs>
  ): CheckSelect<T, EntryClient<Entry>, EntryClient<EntryGetPayload<T>>>
  /**
   * 
   */
  count(): Promise<number>
}

export declare class EntryClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  User<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, UserClient<User | null>, UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Entry findOne
 */
export type FindOneEntryArgs = {
  /**
   * Select specific fields to fetch from the Entry
  **/
  select?: EntrySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EntryInclude | null
  /**
   * Filter, which Entry to fetch.
  **/
  where: EntryWhereUniqueInput
}


/**
 * Entry findMany
 */
export type FindManyEntryArgs = {
  /**
   * Select specific fields to fetch from the Entry
  **/
  select?: EntrySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EntryInclude | null
  /**
   * Filter, which Entries to fetch.
  **/
  where?: EntryWhereInput | null
  /**
   * Determine the order of the Entries to fetch.
  **/
  orderBy?: EntryOrderByInput | null
  /**
   * Skip the first `n` Entries.
  **/
  skip?: number | null
  /**
   * Get all Entries that come after the Entry you provide with the current order.
  **/
  after?: EntryWhereUniqueInput | null
  /**
   * Get all Entries that come before the Entry you provide with the current order.
  **/
  before?: EntryWhereUniqueInput | null
  /**
   * Get the first `n` Entries.
  **/
  first?: number | null
  /**
   * Get the last `n` Entries.
  **/
  last?: number | null
}


/**
 * Entry create
 */
export type EntryCreateArgs = {
  /**
   * Select specific fields to fetch from the Entry
  **/
  select?: EntrySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EntryInclude | null
  /**
   * The data needed to create a Entry.
  **/
  data: EntryCreateInput
}


/**
 * Entry update
 */
export type EntryUpdateArgs = {
  /**
   * Select specific fields to fetch from the Entry
  **/
  select?: EntrySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EntryInclude | null
  /**
   * The data needed to update a Entry.
  **/
  data: EntryUpdateInput
  /**
   * Choose, which Entry to update.
  **/
  where: EntryWhereUniqueInput
}


/**
 * Entry updateMany
 */
export type EntryUpdateManyArgs = {
  data: EntryUpdateManyMutationInput
  where?: EntryWhereInput | null
}


/**
 * Entry upsert
 */
export type EntryUpsertArgs = {
  /**
   * Select specific fields to fetch from the Entry
  **/
  select?: EntrySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EntryInclude | null
  /**
   * The filter to search for the Entry to update in case it exists.
  **/
  where: EntryWhereUniqueInput
  /**
   * In case the Entry found by the `where` argument doesn't exist, create a new Entry with this data.
  **/
  create: EntryCreateInput
  /**
   * In case the Entry was found with the provided `where` argument, update it with this data.
  **/
  update: EntryUpdateInput
}


/**
 * Entry delete
 */
export type EntryDeleteArgs = {
  /**
   * Select specific fields to fetch from the Entry
  **/
  select?: EntrySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EntryInclude | null
  /**
   * Filter which Entry to delete.
  **/
  where: EntryWhereUniqueInput
}


/**
 * Entry deleteMany
 */
export type EntryDeleteManyArgs = {
  where?: EntryWhereInput | null
}


/**
 * Entry without action
 */
export type EntryArgs = {
  /**
   * Select specific fields to fetch from the Entry
  **/
  select?: EntrySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: EntryInclude | null
}



/**
 * Deep Input Types
 */


export type EntryWhereInput = {
  created_at?: number | IntFilter | null
  id?: number | IntFilter | null
  item?: string | StringFilter | null
  occurred?: number | IntFilter | null
  updatedAt?: number | IntFilter | null
  userId?: number | IntFilter | null
  value?: string | StringFilter | null
  AND?: Enumerable<EntryWhereInput> | null
  OR?: Enumerable<EntryWhereInput> | null
  NOT?: Enumerable<EntryWhereInput> | null
  User?: UserWhereInput | null
}

export type UserWhereInput = {
  createdAt?: number | IntFilter | null
  email?: string | StringFilter | null
  firstName?: string | NullableStringFilter | null
  googleId?: string | NullableStringFilter | null
  googleImageUrl?: string | NullableStringFilter | null
  id?: number | IntFilter | null
  lastName?: string | NullableStringFilter | null
  password?: string | StringFilter | null
  role?: string | StringFilter | null
  updatedAt?: number | IntFilter | null
  Entry?: EntryFilter | null
  AND?: Enumerable<UserWhereInput> | null
  OR?: Enumerable<UserWhereInput> | null
  NOT?: Enumerable<UserWhereInput> | null
}

export type UserWhereUniqueInput = {
  email?: string | null
  id?: number | null
}

export type EntryWhereUniqueInput = {
  id?: number | null
}

export type EntryCreateWithoutUserInput = {
  created_at: number
  item: string
  occurred: number
  updatedAt: number
  value: string
}

export type EntryCreateManyWithoutUserInput = {
  create?: Enumerable<EntryCreateWithoutUserInput> | null
  connect?: Enumerable<EntryWhereUniqueInput> | null
}

export type UserCreateInput = {
  createdAt: number
  email: string
  firstName?: string | null
  googleId?: string | null
  googleImageUrl?: string | null
  lastName?: string | null
  password: string
  role: string
  updatedAt: number
  Entry?: EntryCreateManyWithoutUserInput | null
}

export type EntryUpdateWithoutUserDataInput = {
  created_at?: number | null
  id?: number | null
  item?: string | null
  occurred?: number | null
  updatedAt?: number | null
  value?: string | null
}

export type EntryUpdateWithWhereUniqueWithoutUserInput = {
  where: EntryWhereUniqueInput
  data: EntryUpdateWithoutUserDataInput
}

export type EntryScalarWhereInput = {
  created_at?: number | IntFilter | null
  id?: number | IntFilter | null
  item?: string | StringFilter | null
  occurred?: number | IntFilter | null
  updatedAt?: number | IntFilter | null
  userId?: number | IntFilter | null
  value?: string | StringFilter | null
  AND?: Enumerable<EntryScalarWhereInput> | null
  OR?: Enumerable<EntryScalarWhereInput> | null
  NOT?: Enumerable<EntryScalarWhereInput> | null
}

export type EntryUpdateManyDataInput = {
  created_at?: number | null
  id?: number | null
  item?: string | null
  occurred?: number | null
  updatedAt?: number | null
  value?: string | null
}

export type EntryUpdateManyWithWhereNestedInput = {
  where: EntryScalarWhereInput
  data: EntryUpdateManyDataInput
}

export type EntryUpsertWithWhereUniqueWithoutUserInput = {
  where: EntryWhereUniqueInput
  update: EntryUpdateWithoutUserDataInput
  create: EntryCreateWithoutUserInput
}

export type EntryUpdateManyWithoutUserInput = {
  create?: Enumerable<EntryCreateWithoutUserInput> | null
  connect?: Enumerable<EntryWhereUniqueInput> | null
  set?: Enumerable<EntryWhereUniqueInput> | null
  disconnect?: Enumerable<EntryWhereUniqueInput> | null
  delete?: Enumerable<EntryWhereUniqueInput> | null
  update?: Enumerable<EntryUpdateWithWhereUniqueWithoutUserInput> | null
  updateMany?: Enumerable<EntryUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<EntryScalarWhereInput> | null
  upsert?: Enumerable<EntryUpsertWithWhereUniqueWithoutUserInput> | null
}

export type UserUpdateInput = {
  createdAt?: number | null
  email?: string | null
  firstName?: string | null
  googleId?: string | null
  googleImageUrl?: string | null
  id?: number | null
  lastName?: string | null
  password?: string | null
  role?: string | null
  updatedAt?: number | null
  Entry?: EntryUpdateManyWithoutUserInput | null
}

export type UserUpdateManyMutationInput = {
  createdAt?: number | null
  email?: string | null
  firstName?: string | null
  googleId?: string | null
  googleImageUrl?: string | null
  id?: number | null
  lastName?: string | null
  password?: string | null
  role?: string | null
  updatedAt?: number | null
}

export type UserCreateWithoutEntryInput = {
  createdAt: number
  email: string
  firstName?: string | null
  googleId?: string | null
  googleImageUrl?: string | null
  lastName?: string | null
  password: string
  role: string
  updatedAt: number
}

export type UserCreateOneWithoutEntryInput = {
  create?: UserCreateWithoutEntryInput | null
  connect?: UserWhereUniqueInput | null
}

export type EntryCreateInput = {
  created_at: number
  item: string
  occurred: number
  updatedAt: number
  value: string
  User: UserCreateOneWithoutEntryInput
}

export type UserUpdateWithoutEntryDataInput = {
  createdAt?: number | null
  email?: string | null
  firstName?: string | null
  googleId?: string | null
  googleImageUrl?: string | null
  id?: number | null
  lastName?: string | null
  password?: string | null
  role?: string | null
  updatedAt?: number | null
}

export type UserUpsertWithoutEntryInput = {
  update: UserUpdateWithoutEntryDataInput
  create: UserCreateWithoutEntryInput
}

export type UserUpdateOneRequiredWithoutEntryInput = {
  create?: UserCreateWithoutEntryInput | null
  connect?: UserWhereUniqueInput | null
  update?: UserUpdateWithoutEntryDataInput | null
  upsert?: UserUpsertWithoutEntryInput | null
}

export type EntryUpdateInput = {
  created_at?: number | null
  id?: number | null
  item?: string | null
  occurred?: number | null
  updatedAt?: number | null
  value?: string | null
  User?: UserUpdateOneRequiredWithoutEntryInput | null
}

export type EntryUpdateManyMutationInput = {
  created_at?: number | null
  id?: number | null
  item?: string | null
  occurred?: number | null
  updatedAt?: number | null
  value?: string | null
}

export type IntFilter = {
  equals?: number | null
  not?: number | IntFilter | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number | null
  lte?: number | null
  gt?: number | null
  gte?: number | null
}

export type StringFilter = {
  equals?: string | null
  not?: string | StringFilter | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
}

export type NullableStringFilter = {
  equals?: string | null
  not?: string | null | NullableStringFilter
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
}

export type EntryFilter = {
  every?: EntryWhereInput | null
  some?: EntryWhereInput | null
  none?: EntryWhereInput | null
}

export type UserOrderByInput = {
  createdAt?: OrderByArg | null
  email?: OrderByArg | null
  firstName?: OrderByArg | null
  googleId?: OrderByArg | null
  googleImageUrl?: OrderByArg | null
  id?: OrderByArg | null
  lastName?: OrderByArg | null
  password?: OrderByArg | null
  role?: OrderByArg | null
  updatedAt?: OrderByArg | null
}

export type EntryOrderByInput = {
  created_at?: OrderByArg | null
  id?: OrderByArg | null
  item?: OrderByArg | null
  occurred?: OrderByArg | null
  updatedAt?: OrderByArg | null
  userId?: OrderByArg | null
  value?: OrderByArg | null
  User?: OrderByArg | null
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
