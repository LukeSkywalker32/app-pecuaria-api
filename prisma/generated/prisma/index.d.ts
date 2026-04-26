
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Farm
 * 
 */
export type Farm = $Result.DefaultSelection<Prisma.$FarmPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Animal
 * 
 */
export type Animal = $Result.DefaultSelection<Prisma.$AnimalPayload>
/**
 * Model EarTagHistory
 * 
 */
export type EarTagHistory = $Result.DefaultSelection<Prisma.$EarTagHistoryPayload>
/**
 * Model Pasture
 * 
 */
export type Pasture = $Result.DefaultSelection<Prisma.$PasturePayload>
/**
 * Model Estrus
 * 
 */
export type Estrus = $Result.DefaultSelection<Prisma.$EstrusPayload>
/**
 * Model Pregnancy
 * 
 */
export type Pregnancy = $Result.DefaultSelection<Prisma.$PregnancyPayload>
/**
 * Model Attempt
 * 
 */
export type Attempt = $Result.DefaultSelection<Prisma.$AttemptPayload>
/**
 * Model Ultrasound
 * 
 */
export type Ultrasound = $Result.DefaultSelection<Prisma.$UltrasoundPayload>
/**
 * Model Birth
 * 
 */
export type Birth = $Result.DefaultSelection<Prisma.$BirthPayload>
/**
 * Model Vaccination
 * 
 */
export type Vaccination = $Result.DefaultSelection<Prisma.$VaccinationPayload>
/**
 * Model Management
 * 
 */
export type Management = $Result.DefaultSelection<Prisma.$ManagementPayload>
/**
 * Model Mortality
 * 
 */
export type Mortality = $Result.DefaultSelection<Prisma.$MortalityPayload>
/**
 * Model PasswordResetToken
 * 
 */
export type PasswordResetToken = $Result.DefaultSelection<Prisma.$PasswordResetTokenPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Permission: {
  admin: 'admin',
  owner: 'owner',
  farmmanager: 'farmmanager',
  veterinarian: 'veterinarian'
};

export type Permission = (typeof Permission)[keyof typeof Permission]

}

export type Permission = $Enums.Permission

export const Permission: typeof $Enums.Permission

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Farms
 * const farms = await prisma.farm.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Farms
   * const farms = await prisma.farm.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList | "$transaction">) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>
  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.farm`: Exposes CRUD operations for the **Farm** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Farms
    * const farms = await prisma.farm.findMany()
    * ```
    */
  get farm(): Prisma.FarmDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.animal`: Exposes CRUD operations for the **Animal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Animals
    * const animals = await prisma.animal.findMany()
    * ```
    */
  get animal(): Prisma.AnimalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.earTagHistory`: Exposes CRUD operations for the **EarTagHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EarTagHistories
    * const earTagHistories = await prisma.earTagHistory.findMany()
    * ```
    */
  get earTagHistory(): Prisma.EarTagHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pasture`: Exposes CRUD operations for the **Pasture** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pastures
    * const pastures = await prisma.pasture.findMany()
    * ```
    */
  get pasture(): Prisma.PastureDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.estrus`: Exposes CRUD operations for the **Estrus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Estruses
    * const estruses = await prisma.estrus.findMany()
    * ```
    */
  get estrus(): Prisma.EstrusDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pregnancy`: Exposes CRUD operations for the **Pregnancy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pregnancies
    * const pregnancies = await prisma.pregnancy.findMany()
    * ```
    */
  get pregnancy(): Prisma.PregnancyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attempt`: Exposes CRUD operations for the **Attempt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attempts
    * const attempts = await prisma.attempt.findMany()
    * ```
    */
  get attempt(): Prisma.AttemptDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ultrasound`: Exposes CRUD operations for the **Ultrasound** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ultrasounds
    * const ultrasounds = await prisma.ultrasound.findMany()
    * ```
    */
  get ultrasound(): Prisma.UltrasoundDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.birth`: Exposes CRUD operations for the **Birth** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Births
    * const births = await prisma.birth.findMany()
    * ```
    */
  get birth(): Prisma.BirthDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vaccination`: Exposes CRUD operations for the **Vaccination** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vaccinations
    * const vaccinations = await prisma.vaccination.findMany()
    * ```
    */
  get vaccination(): Prisma.VaccinationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.management`: Exposes CRUD operations for the **Management** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Managements
    * const managements = await prisma.management.findMany()
    * ```
    */
  get management(): Prisma.ManagementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mortality`: Exposes CRUD operations for the **Mortality** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mortalities
    * const mortalities = await prisma.mortality.findMany()
    * ```
    */
  get mortality(): Prisma.MortalityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passwordResetToken`: Exposes CRUD operations for the **PasswordResetToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordResetTokens
    * const passwordResetTokens = await prisma.passwordResetToken.findMany()
    * ```
    */
  get passwordResetToken(): Prisma.PasswordResetTokenDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Farm: 'Farm',
    User: 'User',
    Animal: 'Animal',
    EarTagHistory: 'EarTagHistory',
    Pasture: 'Pasture',
    Estrus: 'Estrus',
    Pregnancy: 'Pregnancy',
    Attempt: 'Attempt',
    Ultrasound: 'Ultrasound',
    Birth: 'Birth',
    Vaccination: 'Vaccination',
    Management: 'Management',
    Mortality: 'Mortality',
    PasswordResetToken: 'PasswordResetToken'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "farm" | "user" | "animal" | "earTagHistory" | "pasture" | "estrus" | "pregnancy" | "attempt" | "ultrasound" | "birth" | "vaccination" | "management" | "mortality" | "passwordResetToken"
      txIsolationLevel: never
    }
    model: {
      Farm: {
        payload: Prisma.$FarmPayload<ExtArgs>
        fields: Prisma.FarmFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FarmFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FarmFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          findFirst: {
            args: Prisma.FarmFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FarmFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          findMany: {
            args: Prisma.FarmFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>[]
          }
          create: {
            args: Prisma.FarmCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          createMany: {
            args: Prisma.FarmCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FarmDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          update: {
            args: Prisma.FarmUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          deleteMany: {
            args: Prisma.FarmDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FarmUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FarmUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          aggregate: {
            args: Prisma.FarmAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFarm>
          }
          groupBy: {
            args: Prisma.FarmGroupByArgs<ExtArgs>
            result: $Utils.Optional<FarmGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.FarmFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.FarmAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.FarmCountArgs<ExtArgs>
            result: $Utils.Optional<FarmCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Animal: {
        payload: Prisma.$AnimalPayload<ExtArgs>
        fields: Prisma.AnimalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnimalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnimalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>
          }
          findFirst: {
            args: Prisma.AnimalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnimalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>
          }
          findMany: {
            args: Prisma.AnimalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>[]
          }
          create: {
            args: Prisma.AnimalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>
          }
          createMany: {
            args: Prisma.AnimalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AnimalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>
          }
          update: {
            args: Prisma.AnimalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>
          }
          deleteMany: {
            args: Prisma.AnimalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnimalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AnimalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimalPayload>
          }
          aggregate: {
            args: Prisma.AnimalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnimal>
          }
          groupBy: {
            args: Prisma.AnimalGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnimalGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.AnimalFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.AnimalAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.AnimalCountArgs<ExtArgs>
            result: $Utils.Optional<AnimalCountAggregateOutputType> | number
          }
        }
      }
      EarTagHistory: {
        payload: Prisma.$EarTagHistoryPayload<ExtArgs>
        fields: Prisma.EarTagHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EarTagHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EarTagHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EarTagHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EarTagHistoryPayload>
          }
          findFirst: {
            args: Prisma.EarTagHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EarTagHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EarTagHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EarTagHistoryPayload>
          }
          findMany: {
            args: Prisma.EarTagHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EarTagHistoryPayload>[]
          }
          create: {
            args: Prisma.EarTagHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EarTagHistoryPayload>
          }
          createMany: {
            args: Prisma.EarTagHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EarTagHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EarTagHistoryPayload>
          }
          update: {
            args: Prisma.EarTagHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EarTagHistoryPayload>
          }
          deleteMany: {
            args: Prisma.EarTagHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EarTagHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EarTagHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EarTagHistoryPayload>
          }
          aggregate: {
            args: Prisma.EarTagHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEarTagHistory>
          }
          groupBy: {
            args: Prisma.EarTagHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<EarTagHistoryGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.EarTagHistoryFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.EarTagHistoryAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.EarTagHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<EarTagHistoryCountAggregateOutputType> | number
          }
        }
      }
      Pasture: {
        payload: Prisma.$PasturePayload<ExtArgs>
        fields: Prisma.PastureFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PastureFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasturePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PastureFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasturePayload>
          }
          findFirst: {
            args: Prisma.PastureFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasturePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PastureFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasturePayload>
          }
          findMany: {
            args: Prisma.PastureFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasturePayload>[]
          }
          create: {
            args: Prisma.PastureCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasturePayload>
          }
          createMany: {
            args: Prisma.PastureCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PastureDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasturePayload>
          }
          update: {
            args: Prisma.PastureUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasturePayload>
          }
          deleteMany: {
            args: Prisma.PastureDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PastureUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PastureUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasturePayload>
          }
          aggregate: {
            args: Prisma.PastureAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasture>
          }
          groupBy: {
            args: Prisma.PastureGroupByArgs<ExtArgs>
            result: $Utils.Optional<PastureGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.PastureFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.PastureAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.PastureCountArgs<ExtArgs>
            result: $Utils.Optional<PastureCountAggregateOutputType> | number
          }
        }
      }
      Estrus: {
        payload: Prisma.$EstrusPayload<ExtArgs>
        fields: Prisma.EstrusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EstrusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstrusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EstrusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstrusPayload>
          }
          findFirst: {
            args: Prisma.EstrusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstrusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EstrusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstrusPayload>
          }
          findMany: {
            args: Prisma.EstrusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstrusPayload>[]
          }
          create: {
            args: Prisma.EstrusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstrusPayload>
          }
          createMany: {
            args: Prisma.EstrusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EstrusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstrusPayload>
          }
          update: {
            args: Prisma.EstrusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstrusPayload>
          }
          deleteMany: {
            args: Prisma.EstrusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EstrusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EstrusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EstrusPayload>
          }
          aggregate: {
            args: Prisma.EstrusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEstrus>
          }
          groupBy: {
            args: Prisma.EstrusGroupByArgs<ExtArgs>
            result: $Utils.Optional<EstrusGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.EstrusFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.EstrusAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.EstrusCountArgs<ExtArgs>
            result: $Utils.Optional<EstrusCountAggregateOutputType> | number
          }
        }
      }
      Pregnancy: {
        payload: Prisma.$PregnancyPayload<ExtArgs>
        fields: Prisma.PregnancyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PregnancyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PregnancyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PregnancyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PregnancyPayload>
          }
          findFirst: {
            args: Prisma.PregnancyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PregnancyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PregnancyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PregnancyPayload>
          }
          findMany: {
            args: Prisma.PregnancyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PregnancyPayload>[]
          }
          create: {
            args: Prisma.PregnancyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PregnancyPayload>
          }
          createMany: {
            args: Prisma.PregnancyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PregnancyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PregnancyPayload>
          }
          update: {
            args: Prisma.PregnancyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PregnancyPayload>
          }
          deleteMany: {
            args: Prisma.PregnancyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PregnancyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PregnancyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PregnancyPayload>
          }
          aggregate: {
            args: Prisma.PregnancyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePregnancy>
          }
          groupBy: {
            args: Prisma.PregnancyGroupByArgs<ExtArgs>
            result: $Utils.Optional<PregnancyGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.PregnancyFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.PregnancyAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.PregnancyCountArgs<ExtArgs>
            result: $Utils.Optional<PregnancyCountAggregateOutputType> | number
          }
        }
      }
      Attempt: {
        payload: Prisma.$AttemptPayload<ExtArgs>
        fields: Prisma.AttemptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttemptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttemptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttemptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttemptPayload>
          }
          findFirst: {
            args: Prisma.AttemptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttemptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttemptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttemptPayload>
          }
          findMany: {
            args: Prisma.AttemptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttemptPayload>[]
          }
          create: {
            args: Prisma.AttemptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttemptPayload>
          }
          createMany: {
            args: Prisma.AttemptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AttemptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttemptPayload>
          }
          update: {
            args: Prisma.AttemptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttemptPayload>
          }
          deleteMany: {
            args: Prisma.AttemptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttemptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AttemptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttemptPayload>
          }
          aggregate: {
            args: Prisma.AttemptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttempt>
          }
          groupBy: {
            args: Prisma.AttemptGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttemptGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.AttemptFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.AttemptAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.AttemptCountArgs<ExtArgs>
            result: $Utils.Optional<AttemptCountAggregateOutputType> | number
          }
        }
      }
      Ultrasound: {
        payload: Prisma.$UltrasoundPayload<ExtArgs>
        fields: Prisma.UltrasoundFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UltrasoundFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UltrasoundPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UltrasoundFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UltrasoundPayload>
          }
          findFirst: {
            args: Prisma.UltrasoundFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UltrasoundPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UltrasoundFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UltrasoundPayload>
          }
          findMany: {
            args: Prisma.UltrasoundFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UltrasoundPayload>[]
          }
          create: {
            args: Prisma.UltrasoundCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UltrasoundPayload>
          }
          createMany: {
            args: Prisma.UltrasoundCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UltrasoundDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UltrasoundPayload>
          }
          update: {
            args: Prisma.UltrasoundUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UltrasoundPayload>
          }
          deleteMany: {
            args: Prisma.UltrasoundDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UltrasoundUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UltrasoundUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UltrasoundPayload>
          }
          aggregate: {
            args: Prisma.UltrasoundAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUltrasound>
          }
          groupBy: {
            args: Prisma.UltrasoundGroupByArgs<ExtArgs>
            result: $Utils.Optional<UltrasoundGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UltrasoundFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UltrasoundAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UltrasoundCountArgs<ExtArgs>
            result: $Utils.Optional<UltrasoundCountAggregateOutputType> | number
          }
        }
      }
      Birth: {
        payload: Prisma.$BirthPayload<ExtArgs>
        fields: Prisma.BirthFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BirthFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BirthPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BirthFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BirthPayload>
          }
          findFirst: {
            args: Prisma.BirthFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BirthPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BirthFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BirthPayload>
          }
          findMany: {
            args: Prisma.BirthFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BirthPayload>[]
          }
          create: {
            args: Prisma.BirthCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BirthPayload>
          }
          createMany: {
            args: Prisma.BirthCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BirthDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BirthPayload>
          }
          update: {
            args: Prisma.BirthUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BirthPayload>
          }
          deleteMany: {
            args: Prisma.BirthDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BirthUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BirthUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BirthPayload>
          }
          aggregate: {
            args: Prisma.BirthAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBirth>
          }
          groupBy: {
            args: Prisma.BirthGroupByArgs<ExtArgs>
            result: $Utils.Optional<BirthGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.BirthFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.BirthAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.BirthCountArgs<ExtArgs>
            result: $Utils.Optional<BirthCountAggregateOutputType> | number
          }
        }
      }
      Vaccination: {
        payload: Prisma.$VaccinationPayload<ExtArgs>
        fields: Prisma.VaccinationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VaccinationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VaccinationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VaccinationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VaccinationPayload>
          }
          findFirst: {
            args: Prisma.VaccinationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VaccinationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VaccinationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VaccinationPayload>
          }
          findMany: {
            args: Prisma.VaccinationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VaccinationPayload>[]
          }
          create: {
            args: Prisma.VaccinationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VaccinationPayload>
          }
          createMany: {
            args: Prisma.VaccinationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.VaccinationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VaccinationPayload>
          }
          update: {
            args: Prisma.VaccinationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VaccinationPayload>
          }
          deleteMany: {
            args: Prisma.VaccinationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VaccinationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VaccinationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VaccinationPayload>
          }
          aggregate: {
            args: Prisma.VaccinationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVaccination>
          }
          groupBy: {
            args: Prisma.VaccinationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VaccinationGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.VaccinationFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.VaccinationAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.VaccinationCountArgs<ExtArgs>
            result: $Utils.Optional<VaccinationCountAggregateOutputType> | number
          }
        }
      }
      Management: {
        payload: Prisma.$ManagementPayload<ExtArgs>
        fields: Prisma.ManagementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ManagementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ManagementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagementPayload>
          }
          findFirst: {
            args: Prisma.ManagementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ManagementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagementPayload>
          }
          findMany: {
            args: Prisma.ManagementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagementPayload>[]
          }
          create: {
            args: Prisma.ManagementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagementPayload>
          }
          createMany: {
            args: Prisma.ManagementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ManagementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagementPayload>
          }
          update: {
            args: Prisma.ManagementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagementPayload>
          }
          deleteMany: {
            args: Prisma.ManagementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ManagementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ManagementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagementPayload>
          }
          aggregate: {
            args: Prisma.ManagementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateManagement>
          }
          groupBy: {
            args: Prisma.ManagementGroupByArgs<ExtArgs>
            result: $Utils.Optional<ManagementGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ManagementFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ManagementAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ManagementCountArgs<ExtArgs>
            result: $Utils.Optional<ManagementCountAggregateOutputType> | number
          }
        }
      }
      Mortality: {
        payload: Prisma.$MortalityPayload<ExtArgs>
        fields: Prisma.MortalityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MortalityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MortalityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MortalityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MortalityPayload>
          }
          findFirst: {
            args: Prisma.MortalityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MortalityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MortalityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MortalityPayload>
          }
          findMany: {
            args: Prisma.MortalityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MortalityPayload>[]
          }
          create: {
            args: Prisma.MortalityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MortalityPayload>
          }
          createMany: {
            args: Prisma.MortalityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MortalityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MortalityPayload>
          }
          update: {
            args: Prisma.MortalityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MortalityPayload>
          }
          deleteMany: {
            args: Prisma.MortalityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MortalityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MortalityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MortalityPayload>
          }
          aggregate: {
            args: Prisma.MortalityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMortality>
          }
          groupBy: {
            args: Prisma.MortalityGroupByArgs<ExtArgs>
            result: $Utils.Optional<MortalityGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.MortalityFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.MortalityAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.MortalityCountArgs<ExtArgs>
            result: $Utils.Optional<MortalityCountAggregateOutputType> | number
          }
        }
      }
      PasswordResetToken: {
        payload: Prisma.$PasswordResetTokenPayload<ExtArgs>
        fields: Prisma.PasswordResetTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordResetTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findFirst: {
            args: Prisma.PasswordResetTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findMany: {
            args: Prisma.PasswordResetTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          create: {
            args: Prisma.PasswordResetTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          createMany: {
            args: Prisma.PasswordResetTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PasswordResetTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          update: {
            args: Prisma.PasswordResetTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          deleteMany: {
            args: Prisma.PasswordResetTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordResetTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PasswordResetTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          aggregate: {
            args: Prisma.PasswordResetTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordResetToken>
          }
          groupBy: {
            args: Prisma.PasswordResetTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.PasswordResetTokenFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.PasswordResetTokenAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.PasswordResetTokenCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    farm?: FarmOmit
    user?: UserOmit
    animal?: AnimalOmit
    earTagHistory?: EarTagHistoryOmit
    pasture?: PastureOmit
    estrus?: EstrusOmit
    pregnancy?: PregnancyOmit
    attempt?: AttemptOmit
    ultrasound?: UltrasoundOmit
    birth?: BirthOmit
    vaccination?: VaccinationOmit
    management?: ManagementOmit
    mortality?: MortalityOmit
    passwordResetToken?: PasswordResetTokenOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList | '$transaction'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type FarmCountOutputType
   */

  export type FarmCountOutputType = {
    users: number
    animals: number
    pastures: number
  }

  export type FarmCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | FarmCountOutputTypeCountUsersArgs
    animals?: boolean | FarmCountOutputTypeCountAnimalsArgs
    pastures?: boolean | FarmCountOutputTypeCountPasturesArgs
  }

  // Custom InputTypes
  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmCountOutputType
     */
    select?: FarmCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeCountAnimalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnimalWhereInput
  }

  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeCountPasturesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PastureWhereInput
  }


  /**
   * Count Type AnimalCountOutputType
   */

  export type AnimalCountOutputType = {
    earTagHistory: number
  }

  export type AnimalCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    earTagHistory?: boolean | AnimalCountOutputTypeCountEarTagHistoryArgs
  }

  // Custom InputTypes
  /**
   * AnimalCountOutputType without action
   */
  export type AnimalCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimalCountOutputType
     */
    select?: AnimalCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AnimalCountOutputType without action
   */
  export type AnimalCountOutputTypeCountEarTagHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EarTagHistoryWhereInput
  }


  /**
   * Count Type PregnancyCountOutputType
   */

  export type PregnancyCountOutputType = {
    attempts: number
  }

  export type PregnancyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attempts?: boolean | PregnancyCountOutputTypeCountAttemptsArgs
  }

  // Custom InputTypes
  /**
   * PregnancyCountOutputType without action
   */
  export type PregnancyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PregnancyCountOutputType
     */
    select?: PregnancyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PregnancyCountOutputType without action
   */
  export type PregnancyCountOutputTypeCountAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttemptWhereInput
  }


  /**
   * Count Type AttemptCountOutputType
   */

  export type AttemptCountOutputType = {
    ultrasounds: number
  }

  export type AttemptCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ultrasounds?: boolean | AttemptCountOutputTypeCountUltrasoundsArgs
  }

  // Custom InputTypes
  /**
   * AttemptCountOutputType without action
   */
  export type AttemptCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttemptCountOutputType
     */
    select?: AttemptCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AttemptCountOutputType without action
   */
  export type AttemptCountOutputTypeCountUltrasoundsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UltrasoundWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Farm
   */

  export type AggregateFarm = {
    _count: FarmCountAggregateOutputType | null
    _min: FarmMinAggregateOutputType | null
    _max: FarmMaxAggregateOutputType | null
  }

  export type FarmMinAggregateOutputType = {
    id: string | null
    name: string | null
    location: string | null
    cnpj: string | null
    logoUrl: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FarmMaxAggregateOutputType = {
    id: string | null
    name: string | null
    location: string | null
    cnpj: string | null
    logoUrl: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FarmCountAggregateOutputType = {
    id: number
    name: number
    location: number
    cnpj: number
    logoUrl: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FarmMinAggregateInputType = {
    id?: true
    name?: true
    location?: true
    cnpj?: true
    logoUrl?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FarmMaxAggregateInputType = {
    id?: true
    name?: true
    location?: true
    cnpj?: true
    logoUrl?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FarmCountAggregateInputType = {
    id?: true
    name?: true
    location?: true
    cnpj?: true
    logoUrl?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FarmAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Farm to aggregate.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Farms
    **/
    _count?: true | FarmCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FarmMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FarmMaxAggregateInputType
  }

  export type GetFarmAggregateType<T extends FarmAggregateArgs> = {
        [P in keyof T & keyof AggregateFarm]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFarm[P]>
      : GetScalarType<T[P], AggregateFarm[P]>
  }




  export type FarmGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FarmWhereInput
    orderBy?: FarmOrderByWithAggregationInput | FarmOrderByWithAggregationInput[]
    by: FarmScalarFieldEnum[] | FarmScalarFieldEnum
    having?: FarmScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FarmCountAggregateInputType | true
    _min?: FarmMinAggregateInputType
    _max?: FarmMaxAggregateInputType
  }

  export type FarmGroupByOutputType = {
    id: string
    name: string
    location: string
    cnpj: string | null
    logoUrl: string | null
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: FarmCountAggregateOutputType | null
    _min: FarmMinAggregateOutputType | null
    _max: FarmMaxAggregateOutputType | null
  }

  type GetFarmGroupByPayload<T extends FarmGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FarmGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FarmGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FarmGroupByOutputType[P]>
            : GetScalarType<T[P], FarmGroupByOutputType[P]>
        }
      >
    >


  export type FarmSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    cnpj?: boolean
    logoUrl?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Farm$usersArgs<ExtArgs>
    animals?: boolean | Farm$animalsArgs<ExtArgs>
    pastures?: boolean | Farm$pasturesArgs<ExtArgs>
    _count?: boolean | FarmCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["farm"]>



  export type FarmSelectScalar = {
    id?: boolean
    name?: boolean
    location?: boolean
    cnpj?: boolean
    logoUrl?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FarmOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "location" | "cnpj" | "logoUrl" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["farm"]>
  export type FarmInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Farm$usersArgs<ExtArgs>
    animals?: boolean | Farm$animalsArgs<ExtArgs>
    pastures?: boolean | Farm$pasturesArgs<ExtArgs>
    _count?: boolean | FarmCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $FarmPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Farm"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      animals: Prisma.$AnimalPayload<ExtArgs>[]
      pastures: Prisma.$PasturePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      location: string
      cnpj: string | null
      logoUrl: string | null
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["farm"]>
    composites: {}
  }

  type FarmGetPayload<S extends boolean | null | undefined | FarmDefaultArgs> = $Result.GetResult<Prisma.$FarmPayload, S>

  type FarmCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FarmFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FarmCountAggregateInputType | true
    }

  export interface FarmDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Farm'], meta: { name: 'Farm' } }
    /**
     * Find zero or one Farm that matches the filter.
     * @param {FarmFindUniqueArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FarmFindUniqueArgs>(args: SelectSubset<T, FarmFindUniqueArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Farm that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FarmFindUniqueOrThrowArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FarmFindUniqueOrThrowArgs>(args: SelectSubset<T, FarmFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Farm that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmFindFirstArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FarmFindFirstArgs>(args?: SelectSubset<T, FarmFindFirstArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Farm that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmFindFirstOrThrowArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FarmFindFirstOrThrowArgs>(args?: SelectSubset<T, FarmFindFirstOrThrowArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Farms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Farms
     * const farms = await prisma.farm.findMany()
     * 
     * // Get first 10 Farms
     * const farms = await prisma.farm.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const farmWithIdOnly = await prisma.farm.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FarmFindManyArgs>(args?: SelectSubset<T, FarmFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Farm.
     * @param {FarmCreateArgs} args - Arguments to create a Farm.
     * @example
     * // Create one Farm
     * const Farm = await prisma.farm.create({
     *   data: {
     *     // ... data to create a Farm
     *   }
     * })
     * 
     */
    create<T extends FarmCreateArgs>(args: SelectSubset<T, FarmCreateArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Farms.
     * @param {FarmCreateManyArgs} args - Arguments to create many Farms.
     * @example
     * // Create many Farms
     * const farm = await prisma.farm.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FarmCreateManyArgs>(args?: SelectSubset<T, FarmCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Farm.
     * @param {FarmDeleteArgs} args - Arguments to delete one Farm.
     * @example
     * // Delete one Farm
     * const Farm = await prisma.farm.delete({
     *   where: {
     *     // ... filter to delete one Farm
     *   }
     * })
     * 
     */
    delete<T extends FarmDeleteArgs>(args: SelectSubset<T, FarmDeleteArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Farm.
     * @param {FarmUpdateArgs} args - Arguments to update one Farm.
     * @example
     * // Update one Farm
     * const farm = await prisma.farm.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FarmUpdateArgs>(args: SelectSubset<T, FarmUpdateArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Farms.
     * @param {FarmDeleteManyArgs} args - Arguments to filter Farms to delete.
     * @example
     * // Delete a few Farms
     * const { count } = await prisma.farm.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FarmDeleteManyArgs>(args?: SelectSubset<T, FarmDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Farms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Farms
     * const farm = await prisma.farm.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FarmUpdateManyArgs>(args: SelectSubset<T, FarmUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Farm.
     * @param {FarmUpsertArgs} args - Arguments to update or create a Farm.
     * @example
     * // Update or create a Farm
     * const farm = await prisma.farm.upsert({
     *   create: {
     *     // ... data to create a Farm
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Farm we want to update
     *   }
     * })
     */
    upsert<T extends FarmUpsertArgs>(args: SelectSubset<T, FarmUpsertArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Farms that matches the filter.
     * @param {FarmFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const farm = await prisma.farm.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: FarmFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Farm.
     * @param {FarmAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const farm = await prisma.farm.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: FarmAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Farms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmCountArgs} args - Arguments to filter Farms to count.
     * @example
     * // Count the number of Farms
     * const count = await prisma.farm.count({
     *   where: {
     *     // ... the filter for the Farms we want to count
     *   }
     * })
    **/
    count<T extends FarmCountArgs>(
      args?: Subset<T, FarmCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FarmCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Farm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FarmAggregateArgs>(args: Subset<T, FarmAggregateArgs>): Prisma.PrismaPromise<GetFarmAggregateType<T>>

    /**
     * Group by Farm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FarmGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FarmGroupByArgs['orderBy'] }
        : { orderBy?: FarmGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FarmGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFarmGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Farm model
   */
  readonly fields: FarmFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Farm.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FarmClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Farm$usersArgs<ExtArgs> = {}>(args?: Subset<T, Farm$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    animals<T extends Farm$animalsArgs<ExtArgs> = {}>(args?: Subset<T, Farm$animalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pastures<T extends Farm$pasturesArgs<ExtArgs> = {}>(args?: Subset<T, Farm$pasturesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Farm model
   */
  interface FarmFieldRefs {
    readonly id: FieldRef<"Farm", 'String'>
    readonly name: FieldRef<"Farm", 'String'>
    readonly location: FieldRef<"Farm", 'String'>
    readonly cnpj: FieldRef<"Farm", 'String'>
    readonly logoUrl: FieldRef<"Farm", 'String'>
    readonly active: FieldRef<"Farm", 'Boolean'>
    readonly createdAt: FieldRef<"Farm", 'DateTime'>
    readonly updatedAt: FieldRef<"Farm", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Farm findUnique
   */
  export type FarmFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm findUniqueOrThrow
   */
  export type FarmFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm findFirst
   */
  export type FarmFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Farms.
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Farms.
     */
    distinct?: FarmScalarFieldEnum | FarmScalarFieldEnum[]
  }

  /**
   * Farm findFirstOrThrow
   */
  export type FarmFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Farms.
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Farms.
     */
    distinct?: FarmScalarFieldEnum | FarmScalarFieldEnum[]
  }

  /**
   * Farm findMany
   */
  export type FarmFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farms to fetch.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Farms.
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Farms.
     */
    distinct?: FarmScalarFieldEnum | FarmScalarFieldEnum[]
  }

  /**
   * Farm create
   */
  export type FarmCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * The data needed to create a Farm.
     */
    data: XOR<FarmCreateInput, FarmUncheckedCreateInput>
  }

  /**
   * Farm createMany
   */
  export type FarmCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Farms.
     */
    data: FarmCreateManyInput | FarmCreateManyInput[]
  }

  /**
   * Farm update
   */
  export type FarmUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * The data needed to update a Farm.
     */
    data: XOR<FarmUpdateInput, FarmUncheckedUpdateInput>
    /**
     * Choose, which Farm to update.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm updateMany
   */
  export type FarmUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Farms.
     */
    data: XOR<FarmUpdateManyMutationInput, FarmUncheckedUpdateManyInput>
    /**
     * Filter which Farms to update
     */
    where?: FarmWhereInput
    /**
     * Limit how many Farms to update.
     */
    limit?: number
  }

  /**
   * Farm upsert
   */
  export type FarmUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * The filter to search for the Farm to update in case it exists.
     */
    where: FarmWhereUniqueInput
    /**
     * In case the Farm found by the `where` argument doesn't exist, create a new Farm with this data.
     */
    create: XOR<FarmCreateInput, FarmUncheckedCreateInput>
    /**
     * In case the Farm was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FarmUpdateInput, FarmUncheckedUpdateInput>
  }

  /**
   * Farm delete
   */
  export type FarmDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter which Farm to delete.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm deleteMany
   */
  export type FarmDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Farms to delete
     */
    where?: FarmWhereInput
    /**
     * Limit how many Farms to delete.
     */
    limit?: number
  }

  /**
   * Farm findRaw
   */
  export type FarmFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Farm aggregateRaw
   */
  export type FarmAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Farm.users
   */
  export type Farm$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Farm.animals
   */
  export type Farm$animalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    where?: AnimalWhereInput
    orderBy?: AnimalOrderByWithRelationInput | AnimalOrderByWithRelationInput[]
    cursor?: AnimalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnimalScalarFieldEnum | AnimalScalarFieldEnum[]
  }

  /**
   * Farm.pastures
   */
  export type Farm$pasturesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pasture
     */
    select?: PastureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pasture
     */
    omit?: PastureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PastureInclude<ExtArgs> | null
    where?: PastureWhereInput
    orderBy?: PastureOrderByWithRelationInput | PastureOrderByWithRelationInput[]
    cursor?: PastureWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PastureScalarFieldEnum | PastureScalarFieldEnum[]
  }

  /**
   * Farm without action
   */
  export type FarmDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Farm
     */
    omit?: FarmOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    fullName: string | null
    email: string | null
    phone: string | null
    password: string | null
    role: $Enums.Permission | null
    active: boolean | null
    crv: string | null
    crmv: string | null
    graduationDate: Date | null
    resetPasswordToken: string | null
    resetPasswordExpires: Date | null
    farmId: string | null
    lastLogin: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    fullName: string | null
    email: string | null
    phone: string | null
    password: string | null
    role: $Enums.Permission | null
    active: boolean | null
    crv: string | null
    crmv: string | null
    graduationDate: Date | null
    resetPasswordToken: string | null
    resetPasswordExpires: Date | null
    farmId: string | null
    lastLogin: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    fullName: number
    email: number
    phone: number
    password: number
    role: number
    active: number
    crv: number
    crmv: number
    graduationDate: number
    specialties: number
    resetPasswordToken: number
    resetPasswordExpires: number
    farmId: number
    lastLogin: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    fullName?: true
    email?: true
    phone?: true
    password?: true
    role?: true
    active?: true
    crv?: true
    crmv?: true
    graduationDate?: true
    resetPasswordToken?: true
    resetPasswordExpires?: true
    farmId?: true
    lastLogin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    fullName?: true
    email?: true
    phone?: true
    password?: true
    role?: true
    active?: true
    crv?: true
    crmv?: true
    graduationDate?: true
    resetPasswordToken?: true
    resetPasswordExpires?: true
    farmId?: true
    lastLogin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    fullName?: true
    email?: true
    phone?: true
    password?: true
    role?: true
    active?: true
    crv?: true
    crmv?: true
    graduationDate?: true
    specialties?: true
    resetPasswordToken?: true
    resetPasswordExpires?: true
    farmId?: true
    lastLogin?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    fullName: string
    email: string
    phone: string | null
    password: string
    role: $Enums.Permission
    active: boolean
    crv: string | null
    crmv: string | null
    graduationDate: Date | null
    specialties: string[]
    resetPasswordToken: string | null
    resetPasswordExpires: Date | null
    farmId: string
    lastLogin: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    role?: boolean
    active?: boolean
    crv?: boolean
    crmv?: boolean
    graduationDate?: boolean
    specialties?: boolean
    resetPasswordToken?: boolean
    resetPasswordExpires?: boolean
    farmId?: boolean
    lastLogin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    fullName?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    role?: boolean
    active?: boolean
    crv?: boolean
    crmv?: boolean
    graduationDate?: boolean
    specialties?: boolean
    resetPasswordToken?: boolean
    resetPasswordExpires?: boolean
    farmId?: boolean
    lastLogin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fullName" | "email" | "phone" | "password" | "role" | "active" | "crv" | "crmv" | "graduationDate" | "specialties" | "resetPasswordToken" | "resetPasswordExpires" | "farmId" | "lastLogin" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      farm: Prisma.$FarmPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fullName: string
      email: string
      phone: string | null
      password: string
      role: $Enums.Permission
      active: boolean
      crv: string | null
      crmv: string | null
      graduationDate: Date | null
      specialties: string[]
      resetPasswordToken: string | null
      resetPasswordExpires: Date | null
      farmId: string
      lastLogin: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * @param {UserFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const user = await prisma.user.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: UserFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a User.
     * @param {UserAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const user = await prisma.user.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UserAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    farm<T extends FarmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FarmDefaultArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Permission'>
    readonly active: FieldRef<"User", 'Boolean'>
    readonly crv: FieldRef<"User", 'String'>
    readonly crmv: FieldRef<"User", 'String'>
    readonly graduationDate: FieldRef<"User", 'DateTime'>
    readonly specialties: FieldRef<"User", 'String[]'>
    readonly resetPasswordToken: FieldRef<"User", 'String'>
    readonly resetPasswordExpires: FieldRef<"User", 'DateTime'>
    readonly farmId: FieldRef<"User", 'String'>
    readonly lastLogin: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User findRaw
   */
  export type UserFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User aggregateRaw
   */
  export type UserAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Animal
   */

  export type AggregateAnimal = {
    _count: AnimalCountAggregateOutputType | null
    _min: AnimalMinAggregateOutputType | null
    _max: AnimalMaxAggregateOutputType | null
  }

  export type AnimalMinAggregateOutputType = {
    id: string | null
    chipId: string | null
    currentEarTag: string | null
    name: string | null
    breed: string | null
    gender: string | null
    birthDate: Date | null
    sireId: string | null
    damId: string | null
    pastureId: string | null
    pastureName: string | null
    status: string | null
    deathDate: Date | null
    farmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AnimalMaxAggregateOutputType = {
    id: string | null
    chipId: string | null
    currentEarTag: string | null
    name: string | null
    breed: string | null
    gender: string | null
    birthDate: Date | null
    sireId: string | null
    damId: string | null
    pastureId: string | null
    pastureName: string | null
    status: string | null
    deathDate: Date | null
    farmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AnimalCountAggregateOutputType = {
    id: number
    chipId: number
    currentEarTag: number
    name: number
    breed: number
    gender: number
    birthDate: number
    sireId: number
    damId: number
    pastureId: number
    pastureName: number
    status: number
    deathDate: number
    farmId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AnimalMinAggregateInputType = {
    id?: true
    chipId?: true
    currentEarTag?: true
    name?: true
    breed?: true
    gender?: true
    birthDate?: true
    sireId?: true
    damId?: true
    pastureId?: true
    pastureName?: true
    status?: true
    deathDate?: true
    farmId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AnimalMaxAggregateInputType = {
    id?: true
    chipId?: true
    currentEarTag?: true
    name?: true
    breed?: true
    gender?: true
    birthDate?: true
    sireId?: true
    damId?: true
    pastureId?: true
    pastureName?: true
    status?: true
    deathDate?: true
    farmId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AnimalCountAggregateInputType = {
    id?: true
    chipId?: true
    currentEarTag?: true
    name?: true
    breed?: true
    gender?: true
    birthDate?: true
    sireId?: true
    damId?: true
    pastureId?: true
    pastureName?: true
    status?: true
    deathDate?: true
    farmId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AnimalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Animal to aggregate.
     */
    where?: AnimalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Animals to fetch.
     */
    orderBy?: AnimalOrderByWithRelationInput | AnimalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnimalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Animals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Animals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Animals
    **/
    _count?: true | AnimalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnimalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnimalMaxAggregateInputType
  }

  export type GetAnimalAggregateType<T extends AnimalAggregateArgs> = {
        [P in keyof T & keyof AggregateAnimal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnimal[P]>
      : GetScalarType<T[P], AggregateAnimal[P]>
  }




  export type AnimalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnimalWhereInput
    orderBy?: AnimalOrderByWithAggregationInput | AnimalOrderByWithAggregationInput[]
    by: AnimalScalarFieldEnum[] | AnimalScalarFieldEnum
    having?: AnimalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnimalCountAggregateInputType | true
    _min?: AnimalMinAggregateInputType
    _max?: AnimalMaxAggregateInputType
  }

  export type AnimalGroupByOutputType = {
    id: string
    chipId: string
    currentEarTag: string | null
    name: string
    breed: string
    gender: string
    birthDate: Date
    sireId: string | null
    damId: string | null
    pastureId: string | null
    pastureName: string | null
    status: string
    deathDate: Date | null
    farmId: string
    createdAt: Date
    updatedAt: Date
    _count: AnimalCountAggregateOutputType | null
    _min: AnimalMinAggregateOutputType | null
    _max: AnimalMaxAggregateOutputType | null
  }

  type GetAnimalGroupByPayload<T extends AnimalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnimalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnimalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnimalGroupByOutputType[P]>
            : GetScalarType<T[P], AnimalGroupByOutputType[P]>
        }
      >
    >


  export type AnimalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chipId?: boolean
    currentEarTag?: boolean
    name?: boolean
    breed?: boolean
    gender?: boolean
    birthDate?: boolean
    sireId?: boolean
    damId?: boolean
    pastureId?: boolean
    pastureName?: boolean
    status?: boolean
    deathDate?: boolean
    farmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    earTagHistory?: boolean | Animal$earTagHistoryArgs<ExtArgs>
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    _count?: boolean | AnimalCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["animal"]>



  export type AnimalSelectScalar = {
    id?: boolean
    chipId?: boolean
    currentEarTag?: boolean
    name?: boolean
    breed?: boolean
    gender?: boolean
    birthDate?: boolean
    sireId?: boolean
    damId?: boolean
    pastureId?: boolean
    pastureName?: boolean
    status?: boolean
    deathDate?: boolean
    farmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AnimalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "chipId" | "currentEarTag" | "name" | "breed" | "gender" | "birthDate" | "sireId" | "damId" | "pastureId" | "pastureName" | "status" | "deathDate" | "farmId" | "createdAt" | "updatedAt", ExtArgs["result"]["animal"]>
  export type AnimalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    earTagHistory?: boolean | Animal$earTagHistoryArgs<ExtArgs>
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    _count?: boolean | AnimalCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AnimalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Animal"
    objects: {
      earTagHistory: Prisma.$EarTagHistoryPayload<ExtArgs>[]
      farm: Prisma.$FarmPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      chipId: string
      currentEarTag: string | null
      name: string
      breed: string
      gender: string
      birthDate: Date
      sireId: string | null
      damId: string | null
      pastureId: string | null
      pastureName: string | null
      status: string
      deathDate: Date | null
      farmId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["animal"]>
    composites: {}
  }

  type AnimalGetPayload<S extends boolean | null | undefined | AnimalDefaultArgs> = $Result.GetResult<Prisma.$AnimalPayload, S>

  type AnimalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnimalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnimalCountAggregateInputType | true
    }

  export interface AnimalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Animal'], meta: { name: 'Animal' } }
    /**
     * Find zero or one Animal that matches the filter.
     * @param {AnimalFindUniqueArgs} args - Arguments to find a Animal
     * @example
     * // Get one Animal
     * const animal = await prisma.animal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnimalFindUniqueArgs>(args: SelectSubset<T, AnimalFindUniqueArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Animal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnimalFindUniqueOrThrowArgs} args - Arguments to find a Animal
     * @example
     * // Get one Animal
     * const animal = await prisma.animal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnimalFindUniqueOrThrowArgs>(args: SelectSubset<T, AnimalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Animal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalFindFirstArgs} args - Arguments to find a Animal
     * @example
     * // Get one Animal
     * const animal = await prisma.animal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnimalFindFirstArgs>(args?: SelectSubset<T, AnimalFindFirstArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Animal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalFindFirstOrThrowArgs} args - Arguments to find a Animal
     * @example
     * // Get one Animal
     * const animal = await prisma.animal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnimalFindFirstOrThrowArgs>(args?: SelectSubset<T, AnimalFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Animals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Animals
     * const animals = await prisma.animal.findMany()
     * 
     * // Get first 10 Animals
     * const animals = await prisma.animal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const animalWithIdOnly = await prisma.animal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnimalFindManyArgs>(args?: SelectSubset<T, AnimalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Animal.
     * @param {AnimalCreateArgs} args - Arguments to create a Animal.
     * @example
     * // Create one Animal
     * const Animal = await prisma.animal.create({
     *   data: {
     *     // ... data to create a Animal
     *   }
     * })
     * 
     */
    create<T extends AnimalCreateArgs>(args: SelectSubset<T, AnimalCreateArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Animals.
     * @param {AnimalCreateManyArgs} args - Arguments to create many Animals.
     * @example
     * // Create many Animals
     * const animal = await prisma.animal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnimalCreateManyArgs>(args?: SelectSubset<T, AnimalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Animal.
     * @param {AnimalDeleteArgs} args - Arguments to delete one Animal.
     * @example
     * // Delete one Animal
     * const Animal = await prisma.animal.delete({
     *   where: {
     *     // ... filter to delete one Animal
     *   }
     * })
     * 
     */
    delete<T extends AnimalDeleteArgs>(args: SelectSubset<T, AnimalDeleteArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Animal.
     * @param {AnimalUpdateArgs} args - Arguments to update one Animal.
     * @example
     * // Update one Animal
     * const animal = await prisma.animal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnimalUpdateArgs>(args: SelectSubset<T, AnimalUpdateArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Animals.
     * @param {AnimalDeleteManyArgs} args - Arguments to filter Animals to delete.
     * @example
     * // Delete a few Animals
     * const { count } = await prisma.animal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnimalDeleteManyArgs>(args?: SelectSubset<T, AnimalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Animals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Animals
     * const animal = await prisma.animal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnimalUpdateManyArgs>(args: SelectSubset<T, AnimalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Animal.
     * @param {AnimalUpsertArgs} args - Arguments to update or create a Animal.
     * @example
     * // Update or create a Animal
     * const animal = await prisma.animal.upsert({
     *   create: {
     *     // ... data to create a Animal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Animal we want to update
     *   }
     * })
     */
    upsert<T extends AnimalUpsertArgs>(args: SelectSubset<T, AnimalUpsertArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Animals that matches the filter.
     * @param {AnimalFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const animal = await prisma.animal.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: AnimalFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Animal.
     * @param {AnimalAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const animal = await prisma.animal.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: AnimalAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Animals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalCountArgs} args - Arguments to filter Animals to count.
     * @example
     * // Count the number of Animals
     * const count = await prisma.animal.count({
     *   where: {
     *     // ... the filter for the Animals we want to count
     *   }
     * })
    **/
    count<T extends AnimalCountArgs>(
      args?: Subset<T, AnimalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnimalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Animal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnimalAggregateArgs>(args: Subset<T, AnimalAggregateArgs>): Prisma.PrismaPromise<GetAnimalAggregateType<T>>

    /**
     * Group by Animal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnimalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnimalGroupByArgs['orderBy'] }
        : { orderBy?: AnimalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnimalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnimalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Animal model
   */
  readonly fields: AnimalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Animal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnimalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    earTagHistory<T extends Animal$earTagHistoryArgs<ExtArgs> = {}>(args?: Subset<T, Animal$earTagHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EarTagHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    farm<T extends FarmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FarmDefaultArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Animal model
   */
  interface AnimalFieldRefs {
    readonly id: FieldRef<"Animal", 'String'>
    readonly chipId: FieldRef<"Animal", 'String'>
    readonly currentEarTag: FieldRef<"Animal", 'String'>
    readonly name: FieldRef<"Animal", 'String'>
    readonly breed: FieldRef<"Animal", 'String'>
    readonly gender: FieldRef<"Animal", 'String'>
    readonly birthDate: FieldRef<"Animal", 'DateTime'>
    readonly sireId: FieldRef<"Animal", 'String'>
    readonly damId: FieldRef<"Animal", 'String'>
    readonly pastureId: FieldRef<"Animal", 'String'>
    readonly pastureName: FieldRef<"Animal", 'String'>
    readonly status: FieldRef<"Animal", 'String'>
    readonly deathDate: FieldRef<"Animal", 'DateTime'>
    readonly farmId: FieldRef<"Animal", 'String'>
    readonly createdAt: FieldRef<"Animal", 'DateTime'>
    readonly updatedAt: FieldRef<"Animal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Animal findUnique
   */
  export type AnimalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * Filter, which Animal to fetch.
     */
    where: AnimalWhereUniqueInput
  }

  /**
   * Animal findUniqueOrThrow
   */
  export type AnimalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * Filter, which Animal to fetch.
     */
    where: AnimalWhereUniqueInput
  }

  /**
   * Animal findFirst
   */
  export type AnimalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * Filter, which Animal to fetch.
     */
    where?: AnimalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Animals to fetch.
     */
    orderBy?: AnimalOrderByWithRelationInput | AnimalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Animals.
     */
    cursor?: AnimalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Animals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Animals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Animals.
     */
    distinct?: AnimalScalarFieldEnum | AnimalScalarFieldEnum[]
  }

  /**
   * Animal findFirstOrThrow
   */
  export type AnimalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * Filter, which Animal to fetch.
     */
    where?: AnimalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Animals to fetch.
     */
    orderBy?: AnimalOrderByWithRelationInput | AnimalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Animals.
     */
    cursor?: AnimalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Animals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Animals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Animals.
     */
    distinct?: AnimalScalarFieldEnum | AnimalScalarFieldEnum[]
  }

  /**
   * Animal findMany
   */
  export type AnimalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * Filter, which Animals to fetch.
     */
    where?: AnimalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Animals to fetch.
     */
    orderBy?: AnimalOrderByWithRelationInput | AnimalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Animals.
     */
    cursor?: AnimalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Animals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Animals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Animals.
     */
    distinct?: AnimalScalarFieldEnum | AnimalScalarFieldEnum[]
  }

  /**
   * Animal create
   */
  export type AnimalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * The data needed to create a Animal.
     */
    data: XOR<AnimalCreateInput, AnimalUncheckedCreateInput>
  }

  /**
   * Animal createMany
   */
  export type AnimalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Animals.
     */
    data: AnimalCreateManyInput | AnimalCreateManyInput[]
  }

  /**
   * Animal update
   */
  export type AnimalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * The data needed to update a Animal.
     */
    data: XOR<AnimalUpdateInput, AnimalUncheckedUpdateInput>
    /**
     * Choose, which Animal to update.
     */
    where: AnimalWhereUniqueInput
  }

  /**
   * Animal updateMany
   */
  export type AnimalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Animals.
     */
    data: XOR<AnimalUpdateManyMutationInput, AnimalUncheckedUpdateManyInput>
    /**
     * Filter which Animals to update
     */
    where?: AnimalWhereInput
    /**
     * Limit how many Animals to update.
     */
    limit?: number
  }

  /**
   * Animal upsert
   */
  export type AnimalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * The filter to search for the Animal to update in case it exists.
     */
    where: AnimalWhereUniqueInput
    /**
     * In case the Animal found by the `where` argument doesn't exist, create a new Animal with this data.
     */
    create: XOR<AnimalCreateInput, AnimalUncheckedCreateInput>
    /**
     * In case the Animal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnimalUpdateInput, AnimalUncheckedUpdateInput>
  }

  /**
   * Animal delete
   */
  export type AnimalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
    /**
     * Filter which Animal to delete.
     */
    where: AnimalWhereUniqueInput
  }

  /**
   * Animal deleteMany
   */
  export type AnimalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Animals to delete
     */
    where?: AnimalWhereInput
    /**
     * Limit how many Animals to delete.
     */
    limit?: number
  }

  /**
   * Animal findRaw
   */
  export type AnimalFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Animal aggregateRaw
   */
  export type AnimalAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Animal.earTagHistory
   */
  export type Animal$earTagHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EarTagHistory
     */
    select?: EarTagHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EarTagHistory
     */
    omit?: EarTagHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EarTagHistoryInclude<ExtArgs> | null
    where?: EarTagHistoryWhereInput
    orderBy?: EarTagHistoryOrderByWithRelationInput | EarTagHistoryOrderByWithRelationInput[]
    cursor?: EarTagHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EarTagHistoryScalarFieldEnum | EarTagHistoryScalarFieldEnum[]
  }

  /**
   * Animal without action
   */
  export type AnimalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Animal
     */
    select?: AnimalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Animal
     */
    omit?: AnimalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimalInclude<ExtArgs> | null
  }


  /**
   * Model EarTagHistory
   */

  export type AggregateEarTagHistory = {
    _count: EarTagHistoryCountAggregateOutputType | null
    _min: EarTagHistoryMinAggregateOutputType | null
    _max: EarTagHistoryMaxAggregateOutputType | null
  }

  export type EarTagHistoryMinAggregateOutputType = {
    id: string | null
    earTagNumber: string | null
    animalId: string | null
    placementDate: Date | null
    removalDate: Date | null
    reason: string | null
    farmId: string | null
    createdAt: Date | null
  }

  export type EarTagHistoryMaxAggregateOutputType = {
    id: string | null
    earTagNumber: string | null
    animalId: string | null
    placementDate: Date | null
    removalDate: Date | null
    reason: string | null
    farmId: string | null
    createdAt: Date | null
  }

  export type EarTagHistoryCountAggregateOutputType = {
    id: number
    earTagNumber: number
    animalId: number
    placementDate: number
    removalDate: number
    reason: number
    farmId: number
    createdAt: number
    _all: number
  }


  export type EarTagHistoryMinAggregateInputType = {
    id?: true
    earTagNumber?: true
    animalId?: true
    placementDate?: true
    removalDate?: true
    reason?: true
    farmId?: true
    createdAt?: true
  }

  export type EarTagHistoryMaxAggregateInputType = {
    id?: true
    earTagNumber?: true
    animalId?: true
    placementDate?: true
    removalDate?: true
    reason?: true
    farmId?: true
    createdAt?: true
  }

  export type EarTagHistoryCountAggregateInputType = {
    id?: true
    earTagNumber?: true
    animalId?: true
    placementDate?: true
    removalDate?: true
    reason?: true
    farmId?: true
    createdAt?: true
    _all?: true
  }

  export type EarTagHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EarTagHistory to aggregate.
     */
    where?: EarTagHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EarTagHistories to fetch.
     */
    orderBy?: EarTagHistoryOrderByWithRelationInput | EarTagHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EarTagHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EarTagHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EarTagHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EarTagHistories
    **/
    _count?: true | EarTagHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EarTagHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EarTagHistoryMaxAggregateInputType
  }

  export type GetEarTagHistoryAggregateType<T extends EarTagHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateEarTagHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEarTagHistory[P]>
      : GetScalarType<T[P], AggregateEarTagHistory[P]>
  }




  export type EarTagHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EarTagHistoryWhereInput
    orderBy?: EarTagHistoryOrderByWithAggregationInput | EarTagHistoryOrderByWithAggregationInput[]
    by: EarTagHistoryScalarFieldEnum[] | EarTagHistoryScalarFieldEnum
    having?: EarTagHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EarTagHistoryCountAggregateInputType | true
    _min?: EarTagHistoryMinAggregateInputType
    _max?: EarTagHistoryMaxAggregateInputType
  }

  export type EarTagHistoryGroupByOutputType = {
    id: string
    earTagNumber: string
    animalId: string
    placementDate: Date
    removalDate: Date | null
    reason: string | null
    farmId: string
    createdAt: Date
    _count: EarTagHistoryCountAggregateOutputType | null
    _min: EarTagHistoryMinAggregateOutputType | null
    _max: EarTagHistoryMaxAggregateOutputType | null
  }

  type GetEarTagHistoryGroupByPayload<T extends EarTagHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EarTagHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EarTagHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EarTagHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], EarTagHistoryGroupByOutputType[P]>
        }
      >
    >


  export type EarTagHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    earTagNumber?: boolean
    animalId?: boolean
    placementDate?: boolean
    removalDate?: boolean
    reason?: boolean
    farmId?: boolean
    createdAt?: boolean
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["earTagHistory"]>



  export type EarTagHistorySelectScalar = {
    id?: boolean
    earTagNumber?: boolean
    animalId?: boolean
    placementDate?: boolean
    removalDate?: boolean
    reason?: boolean
    farmId?: boolean
    createdAt?: boolean
  }

  export type EarTagHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "earTagNumber" | "animalId" | "placementDate" | "removalDate" | "reason" | "farmId" | "createdAt", ExtArgs["result"]["earTagHistory"]>
  export type EarTagHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    animal?: boolean | AnimalDefaultArgs<ExtArgs>
  }

  export type $EarTagHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EarTagHistory"
    objects: {
      animal: Prisma.$AnimalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      earTagNumber: string
      animalId: string
      placementDate: Date
      removalDate: Date | null
      reason: string | null
      farmId: string
      createdAt: Date
    }, ExtArgs["result"]["earTagHistory"]>
    composites: {}
  }

  type EarTagHistoryGetPayload<S extends boolean | null | undefined | EarTagHistoryDefaultArgs> = $Result.GetResult<Prisma.$EarTagHistoryPayload, S>

  type EarTagHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EarTagHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EarTagHistoryCountAggregateInputType | true
    }

  export interface EarTagHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EarTagHistory'], meta: { name: 'EarTagHistory' } }
    /**
     * Find zero or one EarTagHistory that matches the filter.
     * @param {EarTagHistoryFindUniqueArgs} args - Arguments to find a EarTagHistory
     * @example
     * // Get one EarTagHistory
     * const earTagHistory = await prisma.earTagHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EarTagHistoryFindUniqueArgs>(args: SelectSubset<T, EarTagHistoryFindUniqueArgs<ExtArgs>>): Prisma__EarTagHistoryClient<$Result.GetResult<Prisma.$EarTagHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EarTagHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EarTagHistoryFindUniqueOrThrowArgs} args - Arguments to find a EarTagHistory
     * @example
     * // Get one EarTagHistory
     * const earTagHistory = await prisma.earTagHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EarTagHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, EarTagHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EarTagHistoryClient<$Result.GetResult<Prisma.$EarTagHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EarTagHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EarTagHistoryFindFirstArgs} args - Arguments to find a EarTagHistory
     * @example
     * // Get one EarTagHistory
     * const earTagHistory = await prisma.earTagHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EarTagHistoryFindFirstArgs>(args?: SelectSubset<T, EarTagHistoryFindFirstArgs<ExtArgs>>): Prisma__EarTagHistoryClient<$Result.GetResult<Prisma.$EarTagHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EarTagHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EarTagHistoryFindFirstOrThrowArgs} args - Arguments to find a EarTagHistory
     * @example
     * // Get one EarTagHistory
     * const earTagHistory = await prisma.earTagHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EarTagHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, EarTagHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__EarTagHistoryClient<$Result.GetResult<Prisma.$EarTagHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EarTagHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EarTagHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EarTagHistories
     * const earTagHistories = await prisma.earTagHistory.findMany()
     * 
     * // Get first 10 EarTagHistories
     * const earTagHistories = await prisma.earTagHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const earTagHistoryWithIdOnly = await prisma.earTagHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EarTagHistoryFindManyArgs>(args?: SelectSubset<T, EarTagHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EarTagHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EarTagHistory.
     * @param {EarTagHistoryCreateArgs} args - Arguments to create a EarTagHistory.
     * @example
     * // Create one EarTagHistory
     * const EarTagHistory = await prisma.earTagHistory.create({
     *   data: {
     *     // ... data to create a EarTagHistory
     *   }
     * })
     * 
     */
    create<T extends EarTagHistoryCreateArgs>(args: SelectSubset<T, EarTagHistoryCreateArgs<ExtArgs>>): Prisma__EarTagHistoryClient<$Result.GetResult<Prisma.$EarTagHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EarTagHistories.
     * @param {EarTagHistoryCreateManyArgs} args - Arguments to create many EarTagHistories.
     * @example
     * // Create many EarTagHistories
     * const earTagHistory = await prisma.earTagHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EarTagHistoryCreateManyArgs>(args?: SelectSubset<T, EarTagHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a EarTagHistory.
     * @param {EarTagHistoryDeleteArgs} args - Arguments to delete one EarTagHistory.
     * @example
     * // Delete one EarTagHistory
     * const EarTagHistory = await prisma.earTagHistory.delete({
     *   where: {
     *     // ... filter to delete one EarTagHistory
     *   }
     * })
     * 
     */
    delete<T extends EarTagHistoryDeleteArgs>(args: SelectSubset<T, EarTagHistoryDeleteArgs<ExtArgs>>): Prisma__EarTagHistoryClient<$Result.GetResult<Prisma.$EarTagHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EarTagHistory.
     * @param {EarTagHistoryUpdateArgs} args - Arguments to update one EarTagHistory.
     * @example
     * // Update one EarTagHistory
     * const earTagHistory = await prisma.earTagHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EarTagHistoryUpdateArgs>(args: SelectSubset<T, EarTagHistoryUpdateArgs<ExtArgs>>): Prisma__EarTagHistoryClient<$Result.GetResult<Prisma.$EarTagHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EarTagHistories.
     * @param {EarTagHistoryDeleteManyArgs} args - Arguments to filter EarTagHistories to delete.
     * @example
     * // Delete a few EarTagHistories
     * const { count } = await prisma.earTagHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EarTagHistoryDeleteManyArgs>(args?: SelectSubset<T, EarTagHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EarTagHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EarTagHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EarTagHistories
     * const earTagHistory = await prisma.earTagHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EarTagHistoryUpdateManyArgs>(args: SelectSubset<T, EarTagHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EarTagHistory.
     * @param {EarTagHistoryUpsertArgs} args - Arguments to update or create a EarTagHistory.
     * @example
     * // Update or create a EarTagHistory
     * const earTagHistory = await prisma.earTagHistory.upsert({
     *   create: {
     *     // ... data to create a EarTagHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EarTagHistory we want to update
     *   }
     * })
     */
    upsert<T extends EarTagHistoryUpsertArgs>(args: SelectSubset<T, EarTagHistoryUpsertArgs<ExtArgs>>): Prisma__EarTagHistoryClient<$Result.GetResult<Prisma.$EarTagHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EarTagHistories that matches the filter.
     * @param {EarTagHistoryFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const earTagHistory = await prisma.earTagHistory.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: EarTagHistoryFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a EarTagHistory.
     * @param {EarTagHistoryAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const earTagHistory = await prisma.earTagHistory.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: EarTagHistoryAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of EarTagHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EarTagHistoryCountArgs} args - Arguments to filter EarTagHistories to count.
     * @example
     * // Count the number of EarTagHistories
     * const count = await prisma.earTagHistory.count({
     *   where: {
     *     // ... the filter for the EarTagHistories we want to count
     *   }
     * })
    **/
    count<T extends EarTagHistoryCountArgs>(
      args?: Subset<T, EarTagHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EarTagHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EarTagHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EarTagHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EarTagHistoryAggregateArgs>(args: Subset<T, EarTagHistoryAggregateArgs>): Prisma.PrismaPromise<GetEarTagHistoryAggregateType<T>>

    /**
     * Group by EarTagHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EarTagHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EarTagHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EarTagHistoryGroupByArgs['orderBy'] }
        : { orderBy?: EarTagHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EarTagHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEarTagHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EarTagHistory model
   */
  readonly fields: EarTagHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EarTagHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EarTagHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    animal<T extends AnimalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnimalDefaultArgs<ExtArgs>>): Prisma__AnimalClient<$Result.GetResult<Prisma.$AnimalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EarTagHistory model
   */
  interface EarTagHistoryFieldRefs {
    readonly id: FieldRef<"EarTagHistory", 'String'>
    readonly earTagNumber: FieldRef<"EarTagHistory", 'String'>
    readonly animalId: FieldRef<"EarTagHistory", 'String'>
    readonly placementDate: FieldRef<"EarTagHistory", 'DateTime'>
    readonly removalDate: FieldRef<"EarTagHistory", 'DateTime'>
    readonly reason: FieldRef<"EarTagHistory", 'String'>
    readonly farmId: FieldRef<"EarTagHistory", 'String'>
    readonly createdAt: FieldRef<"EarTagHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EarTagHistory findUnique
   */
  export type EarTagHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EarTagHistory
     */
    select?: EarTagHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EarTagHistory
     */
    omit?: EarTagHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EarTagHistoryInclude<ExtArgs> | null
    /**
     * Filter, which EarTagHistory to fetch.
     */
    where: EarTagHistoryWhereUniqueInput
  }

  /**
   * EarTagHistory findUniqueOrThrow
   */
  export type EarTagHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EarTagHistory
     */
    select?: EarTagHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EarTagHistory
     */
    omit?: EarTagHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EarTagHistoryInclude<ExtArgs> | null
    /**
     * Filter, which EarTagHistory to fetch.
     */
    where: EarTagHistoryWhereUniqueInput
  }

  /**
   * EarTagHistory findFirst
   */
  export type EarTagHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EarTagHistory
     */
    select?: EarTagHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EarTagHistory
     */
    omit?: EarTagHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EarTagHistoryInclude<ExtArgs> | null
    /**
     * Filter, which EarTagHistory to fetch.
     */
    where?: EarTagHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EarTagHistories to fetch.
     */
    orderBy?: EarTagHistoryOrderByWithRelationInput | EarTagHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EarTagHistories.
     */
    cursor?: EarTagHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EarTagHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EarTagHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EarTagHistories.
     */
    distinct?: EarTagHistoryScalarFieldEnum | EarTagHistoryScalarFieldEnum[]
  }

  /**
   * EarTagHistory findFirstOrThrow
   */
  export type EarTagHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EarTagHistory
     */
    select?: EarTagHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EarTagHistory
     */
    omit?: EarTagHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EarTagHistoryInclude<ExtArgs> | null
    /**
     * Filter, which EarTagHistory to fetch.
     */
    where?: EarTagHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EarTagHistories to fetch.
     */
    orderBy?: EarTagHistoryOrderByWithRelationInput | EarTagHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EarTagHistories.
     */
    cursor?: EarTagHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EarTagHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EarTagHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EarTagHistories.
     */
    distinct?: EarTagHistoryScalarFieldEnum | EarTagHistoryScalarFieldEnum[]
  }

  /**
   * EarTagHistory findMany
   */
  export type EarTagHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EarTagHistory
     */
    select?: EarTagHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EarTagHistory
     */
    omit?: EarTagHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EarTagHistoryInclude<ExtArgs> | null
    /**
     * Filter, which EarTagHistories to fetch.
     */
    where?: EarTagHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EarTagHistories to fetch.
     */
    orderBy?: EarTagHistoryOrderByWithRelationInput | EarTagHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EarTagHistories.
     */
    cursor?: EarTagHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EarTagHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EarTagHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EarTagHistories.
     */
    distinct?: EarTagHistoryScalarFieldEnum | EarTagHistoryScalarFieldEnum[]
  }

  /**
   * EarTagHistory create
   */
  export type EarTagHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EarTagHistory
     */
    select?: EarTagHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EarTagHistory
     */
    omit?: EarTagHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EarTagHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a EarTagHistory.
     */
    data: XOR<EarTagHistoryCreateInput, EarTagHistoryUncheckedCreateInput>
  }

  /**
   * EarTagHistory createMany
   */
  export type EarTagHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EarTagHistories.
     */
    data: EarTagHistoryCreateManyInput | EarTagHistoryCreateManyInput[]
  }

  /**
   * EarTagHistory update
   */
  export type EarTagHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EarTagHistory
     */
    select?: EarTagHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EarTagHistory
     */
    omit?: EarTagHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EarTagHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a EarTagHistory.
     */
    data: XOR<EarTagHistoryUpdateInput, EarTagHistoryUncheckedUpdateInput>
    /**
     * Choose, which EarTagHistory to update.
     */
    where: EarTagHistoryWhereUniqueInput
  }

  /**
   * EarTagHistory updateMany
   */
  export type EarTagHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EarTagHistories.
     */
    data: XOR<EarTagHistoryUpdateManyMutationInput, EarTagHistoryUncheckedUpdateManyInput>
    /**
     * Filter which EarTagHistories to update
     */
    where?: EarTagHistoryWhereInput
    /**
     * Limit how many EarTagHistories to update.
     */
    limit?: number
  }

  /**
   * EarTagHistory upsert
   */
  export type EarTagHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EarTagHistory
     */
    select?: EarTagHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EarTagHistory
     */
    omit?: EarTagHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EarTagHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the EarTagHistory to update in case it exists.
     */
    where: EarTagHistoryWhereUniqueInput
    /**
     * In case the EarTagHistory found by the `where` argument doesn't exist, create a new EarTagHistory with this data.
     */
    create: XOR<EarTagHistoryCreateInput, EarTagHistoryUncheckedCreateInput>
    /**
     * In case the EarTagHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EarTagHistoryUpdateInput, EarTagHistoryUncheckedUpdateInput>
  }

  /**
   * EarTagHistory delete
   */
  export type EarTagHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EarTagHistory
     */
    select?: EarTagHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EarTagHistory
     */
    omit?: EarTagHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EarTagHistoryInclude<ExtArgs> | null
    /**
     * Filter which EarTagHistory to delete.
     */
    where: EarTagHistoryWhereUniqueInput
  }

  /**
   * EarTagHistory deleteMany
   */
  export type EarTagHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EarTagHistories to delete
     */
    where?: EarTagHistoryWhereInput
    /**
     * Limit how many EarTagHistories to delete.
     */
    limit?: number
  }

  /**
   * EarTagHistory findRaw
   */
  export type EarTagHistoryFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * EarTagHistory aggregateRaw
   */
  export type EarTagHistoryAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * EarTagHistory without action
   */
  export type EarTagHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EarTagHistory
     */
    select?: EarTagHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EarTagHistory
     */
    omit?: EarTagHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EarTagHistoryInclude<ExtArgs> | null
  }


  /**
   * Model Pasture
   */

  export type AggregatePasture = {
    _count: PastureCountAggregateOutputType | null
    _avg: PastureAvgAggregateOutputType | null
    _sum: PastureSumAggregateOutputType | null
    _min: PastureMinAggregateOutputType | null
    _max: PastureMaxAggregateOutputType | null
  }

  export type PastureAvgAggregateOutputType = {
    hectares: number | null
    animalCapacity: number | null
    currentAnimals: number | null
  }

  export type PastureSumAggregateOutputType = {
    hectares: number | null
    animalCapacity: number | null
    currentAnimals: number | null
  }

  export type PastureMinAggregateOutputType = {
    id: string | null
    name: string | null
    hectares: number | null
    type: string | null
    animalCapacity: number | null
    currentAnimals: number | null
    active: boolean | null
    farmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PastureMaxAggregateOutputType = {
    id: string | null
    name: string | null
    hectares: number | null
    type: string | null
    animalCapacity: number | null
    currentAnimals: number | null
    active: boolean | null
    farmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PastureCountAggregateOutputType = {
    id: number
    name: number
    hectares: number
    type: number
    animalCapacity: number
    currentAnimals: number
    active: number
    farmId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PastureAvgAggregateInputType = {
    hectares?: true
    animalCapacity?: true
    currentAnimals?: true
  }

  export type PastureSumAggregateInputType = {
    hectares?: true
    animalCapacity?: true
    currentAnimals?: true
  }

  export type PastureMinAggregateInputType = {
    id?: true
    name?: true
    hectares?: true
    type?: true
    animalCapacity?: true
    currentAnimals?: true
    active?: true
    farmId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PastureMaxAggregateInputType = {
    id?: true
    name?: true
    hectares?: true
    type?: true
    animalCapacity?: true
    currentAnimals?: true
    active?: true
    farmId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PastureCountAggregateInputType = {
    id?: true
    name?: true
    hectares?: true
    type?: true
    animalCapacity?: true
    currentAnimals?: true
    active?: true
    farmId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PastureAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pasture to aggregate.
     */
    where?: PastureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pastures to fetch.
     */
    orderBy?: PastureOrderByWithRelationInput | PastureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PastureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pastures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pastures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pastures
    **/
    _count?: true | PastureCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PastureAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PastureSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PastureMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PastureMaxAggregateInputType
  }

  export type GetPastureAggregateType<T extends PastureAggregateArgs> = {
        [P in keyof T & keyof AggregatePasture]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasture[P]>
      : GetScalarType<T[P], AggregatePasture[P]>
  }




  export type PastureGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PastureWhereInput
    orderBy?: PastureOrderByWithAggregationInput | PastureOrderByWithAggregationInput[]
    by: PastureScalarFieldEnum[] | PastureScalarFieldEnum
    having?: PastureScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PastureCountAggregateInputType | true
    _avg?: PastureAvgAggregateInputType
    _sum?: PastureSumAggregateInputType
    _min?: PastureMinAggregateInputType
    _max?: PastureMaxAggregateInputType
  }

  export type PastureGroupByOutputType = {
    id: string
    name: string
    hectares: number
    type: string
    animalCapacity: number
    currentAnimals: number
    active: boolean
    farmId: string
    createdAt: Date
    updatedAt: Date
    _count: PastureCountAggregateOutputType | null
    _avg: PastureAvgAggregateOutputType | null
    _sum: PastureSumAggregateOutputType | null
    _min: PastureMinAggregateOutputType | null
    _max: PastureMaxAggregateOutputType | null
  }

  type GetPastureGroupByPayload<T extends PastureGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PastureGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PastureGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PastureGroupByOutputType[P]>
            : GetScalarType<T[P], PastureGroupByOutputType[P]>
        }
      >
    >


  export type PastureSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    hectares?: boolean
    type?: boolean
    animalCapacity?: boolean
    currentAnimals?: boolean
    active?: boolean
    farmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pasture"]>



  export type PastureSelectScalar = {
    id?: boolean
    name?: boolean
    hectares?: boolean
    type?: boolean
    animalCapacity?: boolean
    currentAnimals?: boolean
    active?: boolean
    farmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PastureOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "hectares" | "type" | "animalCapacity" | "currentAnimals" | "active" | "farmId" | "createdAt" | "updatedAt", ExtArgs["result"]["pasture"]>
  export type PastureInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }

  export type $PasturePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pasture"
    objects: {
      farm: Prisma.$FarmPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      hectares: number
      type: string
      animalCapacity: number
      currentAnimals: number
      active: boolean
      farmId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pasture"]>
    composites: {}
  }

  type PastureGetPayload<S extends boolean | null | undefined | PastureDefaultArgs> = $Result.GetResult<Prisma.$PasturePayload, S>

  type PastureCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PastureFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PastureCountAggregateInputType | true
    }

  export interface PastureDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pasture'], meta: { name: 'Pasture' } }
    /**
     * Find zero or one Pasture that matches the filter.
     * @param {PastureFindUniqueArgs} args - Arguments to find a Pasture
     * @example
     * // Get one Pasture
     * const pasture = await prisma.pasture.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PastureFindUniqueArgs>(args: SelectSubset<T, PastureFindUniqueArgs<ExtArgs>>): Prisma__PastureClient<$Result.GetResult<Prisma.$PasturePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pasture that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PastureFindUniqueOrThrowArgs} args - Arguments to find a Pasture
     * @example
     * // Get one Pasture
     * const pasture = await prisma.pasture.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PastureFindUniqueOrThrowArgs>(args: SelectSubset<T, PastureFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PastureClient<$Result.GetResult<Prisma.$PasturePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pasture that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PastureFindFirstArgs} args - Arguments to find a Pasture
     * @example
     * // Get one Pasture
     * const pasture = await prisma.pasture.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PastureFindFirstArgs>(args?: SelectSubset<T, PastureFindFirstArgs<ExtArgs>>): Prisma__PastureClient<$Result.GetResult<Prisma.$PasturePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pasture that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PastureFindFirstOrThrowArgs} args - Arguments to find a Pasture
     * @example
     * // Get one Pasture
     * const pasture = await prisma.pasture.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PastureFindFirstOrThrowArgs>(args?: SelectSubset<T, PastureFindFirstOrThrowArgs<ExtArgs>>): Prisma__PastureClient<$Result.GetResult<Prisma.$PasturePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pastures that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PastureFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pastures
     * const pastures = await prisma.pasture.findMany()
     * 
     * // Get first 10 Pastures
     * const pastures = await prisma.pasture.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pastureWithIdOnly = await prisma.pasture.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PastureFindManyArgs>(args?: SelectSubset<T, PastureFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pasture.
     * @param {PastureCreateArgs} args - Arguments to create a Pasture.
     * @example
     * // Create one Pasture
     * const Pasture = await prisma.pasture.create({
     *   data: {
     *     // ... data to create a Pasture
     *   }
     * })
     * 
     */
    create<T extends PastureCreateArgs>(args: SelectSubset<T, PastureCreateArgs<ExtArgs>>): Prisma__PastureClient<$Result.GetResult<Prisma.$PasturePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pastures.
     * @param {PastureCreateManyArgs} args - Arguments to create many Pastures.
     * @example
     * // Create many Pastures
     * const pasture = await prisma.pasture.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PastureCreateManyArgs>(args?: SelectSubset<T, PastureCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Pasture.
     * @param {PastureDeleteArgs} args - Arguments to delete one Pasture.
     * @example
     * // Delete one Pasture
     * const Pasture = await prisma.pasture.delete({
     *   where: {
     *     // ... filter to delete one Pasture
     *   }
     * })
     * 
     */
    delete<T extends PastureDeleteArgs>(args: SelectSubset<T, PastureDeleteArgs<ExtArgs>>): Prisma__PastureClient<$Result.GetResult<Prisma.$PasturePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pasture.
     * @param {PastureUpdateArgs} args - Arguments to update one Pasture.
     * @example
     * // Update one Pasture
     * const pasture = await prisma.pasture.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PastureUpdateArgs>(args: SelectSubset<T, PastureUpdateArgs<ExtArgs>>): Prisma__PastureClient<$Result.GetResult<Prisma.$PasturePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pastures.
     * @param {PastureDeleteManyArgs} args - Arguments to filter Pastures to delete.
     * @example
     * // Delete a few Pastures
     * const { count } = await prisma.pasture.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PastureDeleteManyArgs>(args?: SelectSubset<T, PastureDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pastures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PastureUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pastures
     * const pasture = await prisma.pasture.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PastureUpdateManyArgs>(args: SelectSubset<T, PastureUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Pasture.
     * @param {PastureUpsertArgs} args - Arguments to update or create a Pasture.
     * @example
     * // Update or create a Pasture
     * const pasture = await prisma.pasture.upsert({
     *   create: {
     *     // ... data to create a Pasture
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pasture we want to update
     *   }
     * })
     */
    upsert<T extends PastureUpsertArgs>(args: SelectSubset<T, PastureUpsertArgs<ExtArgs>>): Prisma__PastureClient<$Result.GetResult<Prisma.$PasturePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pastures that matches the filter.
     * @param {PastureFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const pasture = await prisma.pasture.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: PastureFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Pasture.
     * @param {PastureAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const pasture = await prisma.pasture.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: PastureAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Pastures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PastureCountArgs} args - Arguments to filter Pastures to count.
     * @example
     * // Count the number of Pastures
     * const count = await prisma.pasture.count({
     *   where: {
     *     // ... the filter for the Pastures we want to count
     *   }
     * })
    **/
    count<T extends PastureCountArgs>(
      args?: Subset<T, PastureCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PastureCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pasture.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PastureAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PastureAggregateArgs>(args: Subset<T, PastureAggregateArgs>): Prisma.PrismaPromise<GetPastureAggregateType<T>>

    /**
     * Group by Pasture.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PastureGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PastureGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PastureGroupByArgs['orderBy'] }
        : { orderBy?: PastureGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PastureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPastureGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pasture model
   */
  readonly fields: PastureFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pasture.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PastureClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    farm<T extends FarmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FarmDefaultArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pasture model
   */
  interface PastureFieldRefs {
    readonly id: FieldRef<"Pasture", 'String'>
    readonly name: FieldRef<"Pasture", 'String'>
    readonly hectares: FieldRef<"Pasture", 'Float'>
    readonly type: FieldRef<"Pasture", 'String'>
    readonly animalCapacity: FieldRef<"Pasture", 'Int'>
    readonly currentAnimals: FieldRef<"Pasture", 'Int'>
    readonly active: FieldRef<"Pasture", 'Boolean'>
    readonly farmId: FieldRef<"Pasture", 'String'>
    readonly createdAt: FieldRef<"Pasture", 'DateTime'>
    readonly updatedAt: FieldRef<"Pasture", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pasture findUnique
   */
  export type PastureFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pasture
     */
    select?: PastureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pasture
     */
    omit?: PastureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PastureInclude<ExtArgs> | null
    /**
     * Filter, which Pasture to fetch.
     */
    where: PastureWhereUniqueInput
  }

  /**
   * Pasture findUniqueOrThrow
   */
  export type PastureFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pasture
     */
    select?: PastureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pasture
     */
    omit?: PastureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PastureInclude<ExtArgs> | null
    /**
     * Filter, which Pasture to fetch.
     */
    where: PastureWhereUniqueInput
  }

  /**
   * Pasture findFirst
   */
  export type PastureFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pasture
     */
    select?: PastureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pasture
     */
    omit?: PastureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PastureInclude<ExtArgs> | null
    /**
     * Filter, which Pasture to fetch.
     */
    where?: PastureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pastures to fetch.
     */
    orderBy?: PastureOrderByWithRelationInput | PastureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pastures.
     */
    cursor?: PastureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pastures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pastures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pastures.
     */
    distinct?: PastureScalarFieldEnum | PastureScalarFieldEnum[]
  }

  /**
   * Pasture findFirstOrThrow
   */
  export type PastureFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pasture
     */
    select?: PastureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pasture
     */
    omit?: PastureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PastureInclude<ExtArgs> | null
    /**
     * Filter, which Pasture to fetch.
     */
    where?: PastureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pastures to fetch.
     */
    orderBy?: PastureOrderByWithRelationInput | PastureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pastures.
     */
    cursor?: PastureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pastures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pastures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pastures.
     */
    distinct?: PastureScalarFieldEnum | PastureScalarFieldEnum[]
  }

  /**
   * Pasture findMany
   */
  export type PastureFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pasture
     */
    select?: PastureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pasture
     */
    omit?: PastureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PastureInclude<ExtArgs> | null
    /**
     * Filter, which Pastures to fetch.
     */
    where?: PastureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pastures to fetch.
     */
    orderBy?: PastureOrderByWithRelationInput | PastureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pastures.
     */
    cursor?: PastureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pastures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pastures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pastures.
     */
    distinct?: PastureScalarFieldEnum | PastureScalarFieldEnum[]
  }

  /**
   * Pasture create
   */
  export type PastureCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pasture
     */
    select?: PastureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pasture
     */
    omit?: PastureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PastureInclude<ExtArgs> | null
    /**
     * The data needed to create a Pasture.
     */
    data: XOR<PastureCreateInput, PastureUncheckedCreateInput>
  }

  /**
   * Pasture createMany
   */
  export type PastureCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pastures.
     */
    data: PastureCreateManyInput | PastureCreateManyInput[]
  }

  /**
   * Pasture update
   */
  export type PastureUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pasture
     */
    select?: PastureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pasture
     */
    omit?: PastureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PastureInclude<ExtArgs> | null
    /**
     * The data needed to update a Pasture.
     */
    data: XOR<PastureUpdateInput, PastureUncheckedUpdateInput>
    /**
     * Choose, which Pasture to update.
     */
    where: PastureWhereUniqueInput
  }

  /**
   * Pasture updateMany
   */
  export type PastureUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pastures.
     */
    data: XOR<PastureUpdateManyMutationInput, PastureUncheckedUpdateManyInput>
    /**
     * Filter which Pastures to update
     */
    where?: PastureWhereInput
    /**
     * Limit how many Pastures to update.
     */
    limit?: number
  }

  /**
   * Pasture upsert
   */
  export type PastureUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pasture
     */
    select?: PastureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pasture
     */
    omit?: PastureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PastureInclude<ExtArgs> | null
    /**
     * The filter to search for the Pasture to update in case it exists.
     */
    where: PastureWhereUniqueInput
    /**
     * In case the Pasture found by the `where` argument doesn't exist, create a new Pasture with this data.
     */
    create: XOR<PastureCreateInput, PastureUncheckedCreateInput>
    /**
     * In case the Pasture was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PastureUpdateInput, PastureUncheckedUpdateInput>
  }

  /**
   * Pasture delete
   */
  export type PastureDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pasture
     */
    select?: PastureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pasture
     */
    omit?: PastureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PastureInclude<ExtArgs> | null
    /**
     * Filter which Pasture to delete.
     */
    where: PastureWhereUniqueInput
  }

  /**
   * Pasture deleteMany
   */
  export type PastureDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pastures to delete
     */
    where?: PastureWhereInput
    /**
     * Limit how many Pastures to delete.
     */
    limit?: number
  }

  /**
   * Pasture findRaw
   */
  export type PastureFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Pasture aggregateRaw
   */
  export type PastureAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Pasture without action
   */
  export type PastureDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pasture
     */
    select?: PastureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pasture
     */
    omit?: PastureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PastureInclude<ExtArgs> | null
  }


  /**
   * Model Estrus
   */

  export type AggregateEstrus = {
    _count: EstrusCountAggregateOutputType | null
    _min: EstrusMinAggregateOutputType | null
    _max: EstrusMaxAggregateOutputType | null
  }

  export type EstrusMinAggregateOutputType = {
    id: string | null
    animalId: string | null
    date: Date | null
    intensity: string | null
    detectedBy: string | null
    nextEstrus: Date | null
    farmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EstrusMaxAggregateOutputType = {
    id: string | null
    animalId: string | null
    date: Date | null
    intensity: string | null
    detectedBy: string | null
    nextEstrus: Date | null
    farmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EstrusCountAggregateOutputType = {
    id: number
    animalId: number
    date: number
    intensity: number
    detectedBy: number
    nextEstrus: number
    farmId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EstrusMinAggregateInputType = {
    id?: true
    animalId?: true
    date?: true
    intensity?: true
    detectedBy?: true
    nextEstrus?: true
    farmId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EstrusMaxAggregateInputType = {
    id?: true
    animalId?: true
    date?: true
    intensity?: true
    detectedBy?: true
    nextEstrus?: true
    farmId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EstrusCountAggregateInputType = {
    id?: true
    animalId?: true
    date?: true
    intensity?: true
    detectedBy?: true
    nextEstrus?: true
    farmId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EstrusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Estrus to aggregate.
     */
    where?: EstrusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Estruses to fetch.
     */
    orderBy?: EstrusOrderByWithRelationInput | EstrusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EstrusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Estruses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Estruses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Estruses
    **/
    _count?: true | EstrusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EstrusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EstrusMaxAggregateInputType
  }

  export type GetEstrusAggregateType<T extends EstrusAggregateArgs> = {
        [P in keyof T & keyof AggregateEstrus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEstrus[P]>
      : GetScalarType<T[P], AggregateEstrus[P]>
  }




  export type EstrusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EstrusWhereInput
    orderBy?: EstrusOrderByWithAggregationInput | EstrusOrderByWithAggregationInput[]
    by: EstrusScalarFieldEnum[] | EstrusScalarFieldEnum
    having?: EstrusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EstrusCountAggregateInputType | true
    _min?: EstrusMinAggregateInputType
    _max?: EstrusMaxAggregateInputType
  }

  export type EstrusGroupByOutputType = {
    id: string
    animalId: string
    date: Date
    intensity: string
    detectedBy: string
    nextEstrus: Date
    farmId: string
    createdAt: Date
    updatedAt: Date
    _count: EstrusCountAggregateOutputType | null
    _min: EstrusMinAggregateOutputType | null
    _max: EstrusMaxAggregateOutputType | null
  }

  type GetEstrusGroupByPayload<T extends EstrusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EstrusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EstrusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EstrusGroupByOutputType[P]>
            : GetScalarType<T[P], EstrusGroupByOutputType[P]>
        }
      >
    >


  export type EstrusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    animalId?: boolean
    date?: boolean
    intensity?: boolean
    detectedBy?: boolean
    nextEstrus?: boolean
    farmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["estrus"]>



  export type EstrusSelectScalar = {
    id?: boolean
    animalId?: boolean
    date?: boolean
    intensity?: boolean
    detectedBy?: boolean
    nextEstrus?: boolean
    farmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EstrusOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "animalId" | "date" | "intensity" | "detectedBy" | "nextEstrus" | "farmId" | "createdAt" | "updatedAt", ExtArgs["result"]["estrus"]>

  export type $EstrusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Estrus"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      animalId: string
      date: Date
      intensity: string
      detectedBy: string
      nextEstrus: Date
      farmId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["estrus"]>
    composites: {}
  }

  type EstrusGetPayload<S extends boolean | null | undefined | EstrusDefaultArgs> = $Result.GetResult<Prisma.$EstrusPayload, S>

  type EstrusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EstrusFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EstrusCountAggregateInputType | true
    }

  export interface EstrusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Estrus'], meta: { name: 'Estrus' } }
    /**
     * Find zero or one Estrus that matches the filter.
     * @param {EstrusFindUniqueArgs} args - Arguments to find a Estrus
     * @example
     * // Get one Estrus
     * const estrus = await prisma.estrus.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EstrusFindUniqueArgs>(args: SelectSubset<T, EstrusFindUniqueArgs<ExtArgs>>): Prisma__EstrusClient<$Result.GetResult<Prisma.$EstrusPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Estrus that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EstrusFindUniqueOrThrowArgs} args - Arguments to find a Estrus
     * @example
     * // Get one Estrus
     * const estrus = await prisma.estrus.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EstrusFindUniqueOrThrowArgs>(args: SelectSubset<T, EstrusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EstrusClient<$Result.GetResult<Prisma.$EstrusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Estrus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstrusFindFirstArgs} args - Arguments to find a Estrus
     * @example
     * // Get one Estrus
     * const estrus = await prisma.estrus.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EstrusFindFirstArgs>(args?: SelectSubset<T, EstrusFindFirstArgs<ExtArgs>>): Prisma__EstrusClient<$Result.GetResult<Prisma.$EstrusPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Estrus that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstrusFindFirstOrThrowArgs} args - Arguments to find a Estrus
     * @example
     * // Get one Estrus
     * const estrus = await prisma.estrus.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EstrusFindFirstOrThrowArgs>(args?: SelectSubset<T, EstrusFindFirstOrThrowArgs<ExtArgs>>): Prisma__EstrusClient<$Result.GetResult<Prisma.$EstrusPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Estruses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstrusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Estruses
     * const estruses = await prisma.estrus.findMany()
     * 
     * // Get first 10 Estruses
     * const estruses = await prisma.estrus.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const estrusWithIdOnly = await prisma.estrus.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EstrusFindManyArgs>(args?: SelectSubset<T, EstrusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EstrusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Estrus.
     * @param {EstrusCreateArgs} args - Arguments to create a Estrus.
     * @example
     * // Create one Estrus
     * const Estrus = await prisma.estrus.create({
     *   data: {
     *     // ... data to create a Estrus
     *   }
     * })
     * 
     */
    create<T extends EstrusCreateArgs>(args: SelectSubset<T, EstrusCreateArgs<ExtArgs>>): Prisma__EstrusClient<$Result.GetResult<Prisma.$EstrusPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Estruses.
     * @param {EstrusCreateManyArgs} args - Arguments to create many Estruses.
     * @example
     * // Create many Estruses
     * const estrus = await prisma.estrus.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EstrusCreateManyArgs>(args?: SelectSubset<T, EstrusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Estrus.
     * @param {EstrusDeleteArgs} args - Arguments to delete one Estrus.
     * @example
     * // Delete one Estrus
     * const Estrus = await prisma.estrus.delete({
     *   where: {
     *     // ... filter to delete one Estrus
     *   }
     * })
     * 
     */
    delete<T extends EstrusDeleteArgs>(args: SelectSubset<T, EstrusDeleteArgs<ExtArgs>>): Prisma__EstrusClient<$Result.GetResult<Prisma.$EstrusPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Estrus.
     * @param {EstrusUpdateArgs} args - Arguments to update one Estrus.
     * @example
     * // Update one Estrus
     * const estrus = await prisma.estrus.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EstrusUpdateArgs>(args: SelectSubset<T, EstrusUpdateArgs<ExtArgs>>): Prisma__EstrusClient<$Result.GetResult<Prisma.$EstrusPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Estruses.
     * @param {EstrusDeleteManyArgs} args - Arguments to filter Estruses to delete.
     * @example
     * // Delete a few Estruses
     * const { count } = await prisma.estrus.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EstrusDeleteManyArgs>(args?: SelectSubset<T, EstrusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Estruses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstrusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Estruses
     * const estrus = await prisma.estrus.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EstrusUpdateManyArgs>(args: SelectSubset<T, EstrusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Estrus.
     * @param {EstrusUpsertArgs} args - Arguments to update or create a Estrus.
     * @example
     * // Update or create a Estrus
     * const estrus = await prisma.estrus.upsert({
     *   create: {
     *     // ... data to create a Estrus
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Estrus we want to update
     *   }
     * })
     */
    upsert<T extends EstrusUpsertArgs>(args: SelectSubset<T, EstrusUpsertArgs<ExtArgs>>): Prisma__EstrusClient<$Result.GetResult<Prisma.$EstrusPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Estruses that matches the filter.
     * @param {EstrusFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const estrus = await prisma.estrus.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: EstrusFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Estrus.
     * @param {EstrusAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const estrus = await prisma.estrus.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: EstrusAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Estruses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstrusCountArgs} args - Arguments to filter Estruses to count.
     * @example
     * // Count the number of Estruses
     * const count = await prisma.estrus.count({
     *   where: {
     *     // ... the filter for the Estruses we want to count
     *   }
     * })
    **/
    count<T extends EstrusCountArgs>(
      args?: Subset<T, EstrusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EstrusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Estrus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstrusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EstrusAggregateArgs>(args: Subset<T, EstrusAggregateArgs>): Prisma.PrismaPromise<GetEstrusAggregateType<T>>

    /**
     * Group by Estrus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstrusGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EstrusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EstrusGroupByArgs['orderBy'] }
        : { orderBy?: EstrusGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EstrusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEstrusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Estrus model
   */
  readonly fields: EstrusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Estrus.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EstrusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Estrus model
   */
  interface EstrusFieldRefs {
    readonly id: FieldRef<"Estrus", 'String'>
    readonly animalId: FieldRef<"Estrus", 'String'>
    readonly date: FieldRef<"Estrus", 'DateTime'>
    readonly intensity: FieldRef<"Estrus", 'String'>
    readonly detectedBy: FieldRef<"Estrus", 'String'>
    readonly nextEstrus: FieldRef<"Estrus", 'DateTime'>
    readonly farmId: FieldRef<"Estrus", 'String'>
    readonly createdAt: FieldRef<"Estrus", 'DateTime'>
    readonly updatedAt: FieldRef<"Estrus", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Estrus findUnique
   */
  export type EstrusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estrus
     */
    select?: EstrusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estrus
     */
    omit?: EstrusOmit<ExtArgs> | null
    /**
     * Filter, which Estrus to fetch.
     */
    where: EstrusWhereUniqueInput
  }

  /**
   * Estrus findUniqueOrThrow
   */
  export type EstrusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estrus
     */
    select?: EstrusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estrus
     */
    omit?: EstrusOmit<ExtArgs> | null
    /**
     * Filter, which Estrus to fetch.
     */
    where: EstrusWhereUniqueInput
  }

  /**
   * Estrus findFirst
   */
  export type EstrusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estrus
     */
    select?: EstrusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estrus
     */
    omit?: EstrusOmit<ExtArgs> | null
    /**
     * Filter, which Estrus to fetch.
     */
    where?: EstrusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Estruses to fetch.
     */
    orderBy?: EstrusOrderByWithRelationInput | EstrusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Estruses.
     */
    cursor?: EstrusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Estruses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Estruses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Estruses.
     */
    distinct?: EstrusScalarFieldEnum | EstrusScalarFieldEnum[]
  }

  /**
   * Estrus findFirstOrThrow
   */
  export type EstrusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estrus
     */
    select?: EstrusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estrus
     */
    omit?: EstrusOmit<ExtArgs> | null
    /**
     * Filter, which Estrus to fetch.
     */
    where?: EstrusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Estruses to fetch.
     */
    orderBy?: EstrusOrderByWithRelationInput | EstrusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Estruses.
     */
    cursor?: EstrusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Estruses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Estruses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Estruses.
     */
    distinct?: EstrusScalarFieldEnum | EstrusScalarFieldEnum[]
  }

  /**
   * Estrus findMany
   */
  export type EstrusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estrus
     */
    select?: EstrusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estrus
     */
    omit?: EstrusOmit<ExtArgs> | null
    /**
     * Filter, which Estruses to fetch.
     */
    where?: EstrusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Estruses to fetch.
     */
    orderBy?: EstrusOrderByWithRelationInput | EstrusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Estruses.
     */
    cursor?: EstrusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Estruses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Estruses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Estruses.
     */
    distinct?: EstrusScalarFieldEnum | EstrusScalarFieldEnum[]
  }

  /**
   * Estrus create
   */
  export type EstrusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estrus
     */
    select?: EstrusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estrus
     */
    omit?: EstrusOmit<ExtArgs> | null
    /**
     * The data needed to create a Estrus.
     */
    data: XOR<EstrusCreateInput, EstrusUncheckedCreateInput>
  }

  /**
   * Estrus createMany
   */
  export type EstrusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Estruses.
     */
    data: EstrusCreateManyInput | EstrusCreateManyInput[]
  }

  /**
   * Estrus update
   */
  export type EstrusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estrus
     */
    select?: EstrusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estrus
     */
    omit?: EstrusOmit<ExtArgs> | null
    /**
     * The data needed to update a Estrus.
     */
    data: XOR<EstrusUpdateInput, EstrusUncheckedUpdateInput>
    /**
     * Choose, which Estrus to update.
     */
    where: EstrusWhereUniqueInput
  }

  /**
   * Estrus updateMany
   */
  export type EstrusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Estruses.
     */
    data: XOR<EstrusUpdateManyMutationInput, EstrusUncheckedUpdateManyInput>
    /**
     * Filter which Estruses to update
     */
    where?: EstrusWhereInput
    /**
     * Limit how many Estruses to update.
     */
    limit?: number
  }

  /**
   * Estrus upsert
   */
  export type EstrusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estrus
     */
    select?: EstrusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estrus
     */
    omit?: EstrusOmit<ExtArgs> | null
    /**
     * The filter to search for the Estrus to update in case it exists.
     */
    where: EstrusWhereUniqueInput
    /**
     * In case the Estrus found by the `where` argument doesn't exist, create a new Estrus with this data.
     */
    create: XOR<EstrusCreateInput, EstrusUncheckedCreateInput>
    /**
     * In case the Estrus was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EstrusUpdateInput, EstrusUncheckedUpdateInput>
  }

  /**
   * Estrus delete
   */
  export type EstrusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estrus
     */
    select?: EstrusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estrus
     */
    omit?: EstrusOmit<ExtArgs> | null
    /**
     * Filter which Estrus to delete.
     */
    where: EstrusWhereUniqueInput
  }

  /**
   * Estrus deleteMany
   */
  export type EstrusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Estruses to delete
     */
    where?: EstrusWhereInput
    /**
     * Limit how many Estruses to delete.
     */
    limit?: number
  }

  /**
   * Estrus findRaw
   */
  export type EstrusFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Estrus aggregateRaw
   */
  export type EstrusAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Estrus without action
   */
  export type EstrusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Estrus
     */
    select?: EstrusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Estrus
     */
    omit?: EstrusOmit<ExtArgs> | null
  }


  /**
   * Model Pregnancy
   */

  export type AggregatePregnancy = {
    _count: PregnancyCountAggregateOutputType | null
    _min: PregnancyMinAggregateOutputType | null
    _max: PregnancyMaxAggregateOutputType | null
  }

  export type PregnancyMinAggregateOutputType = {
    id: string | null
    animalId: string | null
    currentStatus: string | null
    currentStatusDate: Date | null
    farmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PregnancyMaxAggregateOutputType = {
    id: string | null
    animalId: string | null
    currentStatus: string | null
    currentStatusDate: Date | null
    farmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PregnancyCountAggregateOutputType = {
    id: number
    animalId: number
    currentStatus: number
    currentStatusDate: number
    farmId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PregnancyMinAggregateInputType = {
    id?: true
    animalId?: true
    currentStatus?: true
    currentStatusDate?: true
    farmId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PregnancyMaxAggregateInputType = {
    id?: true
    animalId?: true
    currentStatus?: true
    currentStatusDate?: true
    farmId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PregnancyCountAggregateInputType = {
    id?: true
    animalId?: true
    currentStatus?: true
    currentStatusDate?: true
    farmId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PregnancyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pregnancy to aggregate.
     */
    where?: PregnancyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pregnancies to fetch.
     */
    orderBy?: PregnancyOrderByWithRelationInput | PregnancyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PregnancyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pregnancies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pregnancies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pregnancies
    **/
    _count?: true | PregnancyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PregnancyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PregnancyMaxAggregateInputType
  }

  export type GetPregnancyAggregateType<T extends PregnancyAggregateArgs> = {
        [P in keyof T & keyof AggregatePregnancy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePregnancy[P]>
      : GetScalarType<T[P], AggregatePregnancy[P]>
  }




  export type PregnancyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PregnancyWhereInput
    orderBy?: PregnancyOrderByWithAggregationInput | PregnancyOrderByWithAggregationInput[]
    by: PregnancyScalarFieldEnum[] | PregnancyScalarFieldEnum
    having?: PregnancyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PregnancyCountAggregateInputType | true
    _min?: PregnancyMinAggregateInputType
    _max?: PregnancyMaxAggregateInputType
  }

  export type PregnancyGroupByOutputType = {
    id: string
    animalId: string
    currentStatus: string
    currentStatusDate: Date
    farmId: string
    createdAt: Date
    updatedAt: Date
    _count: PregnancyCountAggregateOutputType | null
    _min: PregnancyMinAggregateOutputType | null
    _max: PregnancyMaxAggregateOutputType | null
  }

  type GetPregnancyGroupByPayload<T extends PregnancyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PregnancyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PregnancyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PregnancyGroupByOutputType[P]>
            : GetScalarType<T[P], PregnancyGroupByOutputType[P]>
        }
      >
    >


  export type PregnancySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    animalId?: boolean
    currentStatus?: boolean
    currentStatusDate?: boolean
    farmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    attempts?: boolean | Pregnancy$attemptsArgs<ExtArgs>
    _count?: boolean | PregnancyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pregnancy"]>



  export type PregnancySelectScalar = {
    id?: boolean
    animalId?: boolean
    currentStatus?: boolean
    currentStatusDate?: boolean
    farmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PregnancyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "animalId" | "currentStatus" | "currentStatusDate" | "farmId" | "createdAt" | "updatedAt", ExtArgs["result"]["pregnancy"]>
  export type PregnancyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attempts?: boolean | Pregnancy$attemptsArgs<ExtArgs>
    _count?: boolean | PregnancyCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PregnancyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pregnancy"
    objects: {
      attempts: Prisma.$AttemptPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      animalId: string
      currentStatus: string
      currentStatusDate: Date
      farmId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pregnancy"]>
    composites: {}
  }

  type PregnancyGetPayload<S extends boolean | null | undefined | PregnancyDefaultArgs> = $Result.GetResult<Prisma.$PregnancyPayload, S>

  type PregnancyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PregnancyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PregnancyCountAggregateInputType | true
    }

  export interface PregnancyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pregnancy'], meta: { name: 'Pregnancy' } }
    /**
     * Find zero or one Pregnancy that matches the filter.
     * @param {PregnancyFindUniqueArgs} args - Arguments to find a Pregnancy
     * @example
     * // Get one Pregnancy
     * const pregnancy = await prisma.pregnancy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PregnancyFindUniqueArgs>(args: SelectSubset<T, PregnancyFindUniqueArgs<ExtArgs>>): Prisma__PregnancyClient<$Result.GetResult<Prisma.$PregnancyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pregnancy that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PregnancyFindUniqueOrThrowArgs} args - Arguments to find a Pregnancy
     * @example
     * // Get one Pregnancy
     * const pregnancy = await prisma.pregnancy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PregnancyFindUniqueOrThrowArgs>(args: SelectSubset<T, PregnancyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PregnancyClient<$Result.GetResult<Prisma.$PregnancyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pregnancy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PregnancyFindFirstArgs} args - Arguments to find a Pregnancy
     * @example
     * // Get one Pregnancy
     * const pregnancy = await prisma.pregnancy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PregnancyFindFirstArgs>(args?: SelectSubset<T, PregnancyFindFirstArgs<ExtArgs>>): Prisma__PregnancyClient<$Result.GetResult<Prisma.$PregnancyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pregnancy that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PregnancyFindFirstOrThrowArgs} args - Arguments to find a Pregnancy
     * @example
     * // Get one Pregnancy
     * const pregnancy = await prisma.pregnancy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PregnancyFindFirstOrThrowArgs>(args?: SelectSubset<T, PregnancyFindFirstOrThrowArgs<ExtArgs>>): Prisma__PregnancyClient<$Result.GetResult<Prisma.$PregnancyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pregnancies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PregnancyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pregnancies
     * const pregnancies = await prisma.pregnancy.findMany()
     * 
     * // Get first 10 Pregnancies
     * const pregnancies = await prisma.pregnancy.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pregnancyWithIdOnly = await prisma.pregnancy.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PregnancyFindManyArgs>(args?: SelectSubset<T, PregnancyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PregnancyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pregnancy.
     * @param {PregnancyCreateArgs} args - Arguments to create a Pregnancy.
     * @example
     * // Create one Pregnancy
     * const Pregnancy = await prisma.pregnancy.create({
     *   data: {
     *     // ... data to create a Pregnancy
     *   }
     * })
     * 
     */
    create<T extends PregnancyCreateArgs>(args: SelectSubset<T, PregnancyCreateArgs<ExtArgs>>): Prisma__PregnancyClient<$Result.GetResult<Prisma.$PregnancyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pregnancies.
     * @param {PregnancyCreateManyArgs} args - Arguments to create many Pregnancies.
     * @example
     * // Create many Pregnancies
     * const pregnancy = await prisma.pregnancy.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PregnancyCreateManyArgs>(args?: SelectSubset<T, PregnancyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Pregnancy.
     * @param {PregnancyDeleteArgs} args - Arguments to delete one Pregnancy.
     * @example
     * // Delete one Pregnancy
     * const Pregnancy = await prisma.pregnancy.delete({
     *   where: {
     *     // ... filter to delete one Pregnancy
     *   }
     * })
     * 
     */
    delete<T extends PregnancyDeleteArgs>(args: SelectSubset<T, PregnancyDeleteArgs<ExtArgs>>): Prisma__PregnancyClient<$Result.GetResult<Prisma.$PregnancyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pregnancy.
     * @param {PregnancyUpdateArgs} args - Arguments to update one Pregnancy.
     * @example
     * // Update one Pregnancy
     * const pregnancy = await prisma.pregnancy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PregnancyUpdateArgs>(args: SelectSubset<T, PregnancyUpdateArgs<ExtArgs>>): Prisma__PregnancyClient<$Result.GetResult<Prisma.$PregnancyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pregnancies.
     * @param {PregnancyDeleteManyArgs} args - Arguments to filter Pregnancies to delete.
     * @example
     * // Delete a few Pregnancies
     * const { count } = await prisma.pregnancy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PregnancyDeleteManyArgs>(args?: SelectSubset<T, PregnancyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pregnancies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PregnancyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pregnancies
     * const pregnancy = await prisma.pregnancy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PregnancyUpdateManyArgs>(args: SelectSubset<T, PregnancyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Pregnancy.
     * @param {PregnancyUpsertArgs} args - Arguments to update or create a Pregnancy.
     * @example
     * // Update or create a Pregnancy
     * const pregnancy = await prisma.pregnancy.upsert({
     *   create: {
     *     // ... data to create a Pregnancy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pregnancy we want to update
     *   }
     * })
     */
    upsert<T extends PregnancyUpsertArgs>(args: SelectSubset<T, PregnancyUpsertArgs<ExtArgs>>): Prisma__PregnancyClient<$Result.GetResult<Prisma.$PregnancyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pregnancies that matches the filter.
     * @param {PregnancyFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const pregnancy = await prisma.pregnancy.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: PregnancyFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Pregnancy.
     * @param {PregnancyAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const pregnancy = await prisma.pregnancy.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: PregnancyAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Pregnancies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PregnancyCountArgs} args - Arguments to filter Pregnancies to count.
     * @example
     * // Count the number of Pregnancies
     * const count = await prisma.pregnancy.count({
     *   where: {
     *     // ... the filter for the Pregnancies we want to count
     *   }
     * })
    **/
    count<T extends PregnancyCountArgs>(
      args?: Subset<T, PregnancyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PregnancyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pregnancy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PregnancyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PregnancyAggregateArgs>(args: Subset<T, PregnancyAggregateArgs>): Prisma.PrismaPromise<GetPregnancyAggregateType<T>>

    /**
     * Group by Pregnancy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PregnancyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PregnancyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PregnancyGroupByArgs['orderBy'] }
        : { orderBy?: PregnancyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PregnancyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPregnancyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pregnancy model
   */
  readonly fields: PregnancyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pregnancy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PregnancyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attempts<T extends Pregnancy$attemptsArgs<ExtArgs> = {}>(args?: Subset<T, Pregnancy$attemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pregnancy model
   */
  interface PregnancyFieldRefs {
    readonly id: FieldRef<"Pregnancy", 'String'>
    readonly animalId: FieldRef<"Pregnancy", 'String'>
    readonly currentStatus: FieldRef<"Pregnancy", 'String'>
    readonly currentStatusDate: FieldRef<"Pregnancy", 'DateTime'>
    readonly farmId: FieldRef<"Pregnancy", 'String'>
    readonly createdAt: FieldRef<"Pregnancy", 'DateTime'>
    readonly updatedAt: FieldRef<"Pregnancy", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pregnancy findUnique
   */
  export type PregnancyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pregnancy
     */
    select?: PregnancySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pregnancy
     */
    omit?: PregnancyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PregnancyInclude<ExtArgs> | null
    /**
     * Filter, which Pregnancy to fetch.
     */
    where: PregnancyWhereUniqueInput
  }

  /**
   * Pregnancy findUniqueOrThrow
   */
  export type PregnancyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pregnancy
     */
    select?: PregnancySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pregnancy
     */
    omit?: PregnancyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PregnancyInclude<ExtArgs> | null
    /**
     * Filter, which Pregnancy to fetch.
     */
    where: PregnancyWhereUniqueInput
  }

  /**
   * Pregnancy findFirst
   */
  export type PregnancyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pregnancy
     */
    select?: PregnancySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pregnancy
     */
    omit?: PregnancyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PregnancyInclude<ExtArgs> | null
    /**
     * Filter, which Pregnancy to fetch.
     */
    where?: PregnancyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pregnancies to fetch.
     */
    orderBy?: PregnancyOrderByWithRelationInput | PregnancyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pregnancies.
     */
    cursor?: PregnancyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pregnancies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pregnancies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pregnancies.
     */
    distinct?: PregnancyScalarFieldEnum | PregnancyScalarFieldEnum[]
  }

  /**
   * Pregnancy findFirstOrThrow
   */
  export type PregnancyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pregnancy
     */
    select?: PregnancySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pregnancy
     */
    omit?: PregnancyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PregnancyInclude<ExtArgs> | null
    /**
     * Filter, which Pregnancy to fetch.
     */
    where?: PregnancyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pregnancies to fetch.
     */
    orderBy?: PregnancyOrderByWithRelationInput | PregnancyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pregnancies.
     */
    cursor?: PregnancyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pregnancies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pregnancies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pregnancies.
     */
    distinct?: PregnancyScalarFieldEnum | PregnancyScalarFieldEnum[]
  }

  /**
   * Pregnancy findMany
   */
  export type PregnancyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pregnancy
     */
    select?: PregnancySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pregnancy
     */
    omit?: PregnancyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PregnancyInclude<ExtArgs> | null
    /**
     * Filter, which Pregnancies to fetch.
     */
    where?: PregnancyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pregnancies to fetch.
     */
    orderBy?: PregnancyOrderByWithRelationInput | PregnancyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pregnancies.
     */
    cursor?: PregnancyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pregnancies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pregnancies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pregnancies.
     */
    distinct?: PregnancyScalarFieldEnum | PregnancyScalarFieldEnum[]
  }

  /**
   * Pregnancy create
   */
  export type PregnancyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pregnancy
     */
    select?: PregnancySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pregnancy
     */
    omit?: PregnancyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PregnancyInclude<ExtArgs> | null
    /**
     * The data needed to create a Pregnancy.
     */
    data: XOR<PregnancyCreateInput, PregnancyUncheckedCreateInput>
  }

  /**
   * Pregnancy createMany
   */
  export type PregnancyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pregnancies.
     */
    data: PregnancyCreateManyInput | PregnancyCreateManyInput[]
  }

  /**
   * Pregnancy update
   */
  export type PregnancyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pregnancy
     */
    select?: PregnancySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pregnancy
     */
    omit?: PregnancyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PregnancyInclude<ExtArgs> | null
    /**
     * The data needed to update a Pregnancy.
     */
    data: XOR<PregnancyUpdateInput, PregnancyUncheckedUpdateInput>
    /**
     * Choose, which Pregnancy to update.
     */
    where: PregnancyWhereUniqueInput
  }

  /**
   * Pregnancy updateMany
   */
  export type PregnancyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pregnancies.
     */
    data: XOR<PregnancyUpdateManyMutationInput, PregnancyUncheckedUpdateManyInput>
    /**
     * Filter which Pregnancies to update
     */
    where?: PregnancyWhereInput
    /**
     * Limit how many Pregnancies to update.
     */
    limit?: number
  }

  /**
   * Pregnancy upsert
   */
  export type PregnancyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pregnancy
     */
    select?: PregnancySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pregnancy
     */
    omit?: PregnancyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PregnancyInclude<ExtArgs> | null
    /**
     * The filter to search for the Pregnancy to update in case it exists.
     */
    where: PregnancyWhereUniqueInput
    /**
     * In case the Pregnancy found by the `where` argument doesn't exist, create a new Pregnancy with this data.
     */
    create: XOR<PregnancyCreateInput, PregnancyUncheckedCreateInput>
    /**
     * In case the Pregnancy was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PregnancyUpdateInput, PregnancyUncheckedUpdateInput>
  }

  /**
   * Pregnancy delete
   */
  export type PregnancyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pregnancy
     */
    select?: PregnancySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pregnancy
     */
    omit?: PregnancyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PregnancyInclude<ExtArgs> | null
    /**
     * Filter which Pregnancy to delete.
     */
    where: PregnancyWhereUniqueInput
  }

  /**
   * Pregnancy deleteMany
   */
  export type PregnancyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pregnancies to delete
     */
    where?: PregnancyWhereInput
    /**
     * Limit how many Pregnancies to delete.
     */
    limit?: number
  }

  /**
   * Pregnancy findRaw
   */
  export type PregnancyFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Pregnancy aggregateRaw
   */
  export type PregnancyAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Pregnancy.attempts
   */
  export type Pregnancy$attemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attempt
     */
    select?: AttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attempt
     */
    omit?: AttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttemptInclude<ExtArgs> | null
    where?: AttemptWhereInput
    orderBy?: AttemptOrderByWithRelationInput | AttemptOrderByWithRelationInput[]
    cursor?: AttemptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttemptScalarFieldEnum | AttemptScalarFieldEnum[]
  }

  /**
   * Pregnancy without action
   */
  export type PregnancyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pregnancy
     */
    select?: PregnancySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pregnancy
     */
    omit?: PregnancyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PregnancyInclude<ExtArgs> | null
  }


  /**
   * Model Attempt
   */

  export type AggregateAttempt = {
    _count: AttemptCountAggregateOutputType | null
    _avg: AttemptAvgAggregateOutputType | null
    _sum: AttemptSumAggregateOutputType | null
    _min: AttemptMinAggregateOutputType | null
    _max: AttemptMaxAggregateOutputType | null
  }

  export type AttemptAvgAggregateOutputType = {
    number: number | null
  }

  export type AttemptSumAggregateOutputType = {
    number: number | null
  }

  export type AttemptMinAggregateOutputType = {
    id: string | null
    number: number | null
    pregnancyId: string | null
    matingDate: Date | null
    matingType: string | null
    bullId: string | null
    semenName: string | null
    technician: string | null
    estimatedBirthDate: Date | null
    birthId: string | null
    attemptStatus: string | null
    notes: string | null
    createdAt: Date | null
  }

  export type AttemptMaxAggregateOutputType = {
    id: string | null
    number: number | null
    pregnancyId: string | null
    matingDate: Date | null
    matingType: string | null
    bullId: string | null
    semenName: string | null
    technician: string | null
    estimatedBirthDate: Date | null
    birthId: string | null
    attemptStatus: string | null
    notes: string | null
    createdAt: Date | null
  }

  export type AttemptCountAggregateOutputType = {
    id: number
    number: number
    pregnancyId: number
    matingDate: number
    matingType: number
    bullId: number
    semenName: number
    technician: number
    estimatedBirthDate: number
    birthId: number
    attemptStatus: number
    notes: number
    createdAt: number
    _all: number
  }


  export type AttemptAvgAggregateInputType = {
    number?: true
  }

  export type AttemptSumAggregateInputType = {
    number?: true
  }

  export type AttemptMinAggregateInputType = {
    id?: true
    number?: true
    pregnancyId?: true
    matingDate?: true
    matingType?: true
    bullId?: true
    semenName?: true
    technician?: true
    estimatedBirthDate?: true
    birthId?: true
    attemptStatus?: true
    notes?: true
    createdAt?: true
  }

  export type AttemptMaxAggregateInputType = {
    id?: true
    number?: true
    pregnancyId?: true
    matingDate?: true
    matingType?: true
    bullId?: true
    semenName?: true
    technician?: true
    estimatedBirthDate?: true
    birthId?: true
    attemptStatus?: true
    notes?: true
    createdAt?: true
  }

  export type AttemptCountAggregateInputType = {
    id?: true
    number?: true
    pregnancyId?: true
    matingDate?: true
    matingType?: true
    bullId?: true
    semenName?: true
    technician?: true
    estimatedBirthDate?: true
    birthId?: true
    attemptStatus?: true
    notes?: true
    createdAt?: true
    _all?: true
  }

  export type AttemptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attempt to aggregate.
     */
    where?: AttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attempts to fetch.
     */
    orderBy?: AttemptOrderByWithRelationInput | AttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Attempts
    **/
    _count?: true | AttemptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AttemptAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AttemptSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttemptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttemptMaxAggregateInputType
  }

  export type GetAttemptAggregateType<T extends AttemptAggregateArgs> = {
        [P in keyof T & keyof AggregateAttempt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttempt[P]>
      : GetScalarType<T[P], AggregateAttempt[P]>
  }




  export type AttemptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttemptWhereInput
    orderBy?: AttemptOrderByWithAggregationInput | AttemptOrderByWithAggregationInput[]
    by: AttemptScalarFieldEnum[] | AttemptScalarFieldEnum
    having?: AttemptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttemptCountAggregateInputType | true
    _avg?: AttemptAvgAggregateInputType
    _sum?: AttemptSumAggregateInputType
    _min?: AttemptMinAggregateInputType
    _max?: AttemptMaxAggregateInputType
  }

  export type AttemptGroupByOutputType = {
    id: string
    number: number
    pregnancyId: string
    matingDate: Date
    matingType: string
    bullId: string | null
    semenName: string | null
    technician: string | null
    estimatedBirthDate: Date
    birthId: string | null
    attemptStatus: string
    notes: string | null
    createdAt: Date
    _count: AttemptCountAggregateOutputType | null
    _avg: AttemptAvgAggregateOutputType | null
    _sum: AttemptSumAggregateOutputType | null
    _min: AttemptMinAggregateOutputType | null
    _max: AttemptMaxAggregateOutputType | null
  }

  type GetAttemptGroupByPayload<T extends AttemptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttemptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttemptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttemptGroupByOutputType[P]>
            : GetScalarType<T[P], AttemptGroupByOutputType[P]>
        }
      >
    >


  export type AttemptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    number?: boolean
    pregnancyId?: boolean
    matingDate?: boolean
    matingType?: boolean
    bullId?: boolean
    semenName?: boolean
    technician?: boolean
    estimatedBirthDate?: boolean
    birthId?: boolean
    attemptStatus?: boolean
    notes?: boolean
    createdAt?: boolean
    pregnancy?: boolean | PregnancyDefaultArgs<ExtArgs>
    ultrasounds?: boolean | Attempt$ultrasoundsArgs<ExtArgs>
    _count?: boolean | AttemptCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attempt"]>



  export type AttemptSelectScalar = {
    id?: boolean
    number?: boolean
    pregnancyId?: boolean
    matingDate?: boolean
    matingType?: boolean
    bullId?: boolean
    semenName?: boolean
    technician?: boolean
    estimatedBirthDate?: boolean
    birthId?: boolean
    attemptStatus?: boolean
    notes?: boolean
    createdAt?: boolean
  }

  export type AttemptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "number" | "pregnancyId" | "matingDate" | "matingType" | "bullId" | "semenName" | "technician" | "estimatedBirthDate" | "birthId" | "attemptStatus" | "notes" | "createdAt", ExtArgs["result"]["attempt"]>
  export type AttemptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pregnancy?: boolean | PregnancyDefaultArgs<ExtArgs>
    ultrasounds?: boolean | Attempt$ultrasoundsArgs<ExtArgs>
    _count?: boolean | AttemptCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AttemptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Attempt"
    objects: {
      pregnancy: Prisma.$PregnancyPayload<ExtArgs>
      ultrasounds: Prisma.$UltrasoundPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      number: number
      pregnancyId: string
      matingDate: Date
      matingType: string
      bullId: string | null
      semenName: string | null
      technician: string | null
      estimatedBirthDate: Date
      birthId: string | null
      attemptStatus: string
      notes: string | null
      createdAt: Date
    }, ExtArgs["result"]["attempt"]>
    composites: {}
  }

  type AttemptGetPayload<S extends boolean | null | undefined | AttemptDefaultArgs> = $Result.GetResult<Prisma.$AttemptPayload, S>

  type AttemptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AttemptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttemptCountAggregateInputType | true
    }

  export interface AttemptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Attempt'], meta: { name: 'Attempt' } }
    /**
     * Find zero or one Attempt that matches the filter.
     * @param {AttemptFindUniqueArgs} args - Arguments to find a Attempt
     * @example
     * // Get one Attempt
     * const attempt = await prisma.attempt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttemptFindUniqueArgs>(args: SelectSubset<T, AttemptFindUniqueArgs<ExtArgs>>): Prisma__AttemptClient<$Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Attempt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AttemptFindUniqueOrThrowArgs} args - Arguments to find a Attempt
     * @example
     * // Get one Attempt
     * const attempt = await prisma.attempt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttemptFindUniqueOrThrowArgs>(args: SelectSubset<T, AttemptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttemptClient<$Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attempt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttemptFindFirstArgs} args - Arguments to find a Attempt
     * @example
     * // Get one Attempt
     * const attempt = await prisma.attempt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttemptFindFirstArgs>(args?: SelectSubset<T, AttemptFindFirstArgs<ExtArgs>>): Prisma__AttemptClient<$Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attempt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttemptFindFirstOrThrowArgs} args - Arguments to find a Attempt
     * @example
     * // Get one Attempt
     * const attempt = await prisma.attempt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttemptFindFirstOrThrowArgs>(args?: SelectSubset<T, AttemptFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttemptClient<$Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attempts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttemptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attempts
     * const attempts = await prisma.attempt.findMany()
     * 
     * // Get first 10 Attempts
     * const attempts = await prisma.attempt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attemptWithIdOnly = await prisma.attempt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttemptFindManyArgs>(args?: SelectSubset<T, AttemptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Attempt.
     * @param {AttemptCreateArgs} args - Arguments to create a Attempt.
     * @example
     * // Create one Attempt
     * const Attempt = await prisma.attempt.create({
     *   data: {
     *     // ... data to create a Attempt
     *   }
     * })
     * 
     */
    create<T extends AttemptCreateArgs>(args: SelectSubset<T, AttemptCreateArgs<ExtArgs>>): Prisma__AttemptClient<$Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Attempts.
     * @param {AttemptCreateManyArgs} args - Arguments to create many Attempts.
     * @example
     * // Create many Attempts
     * const attempt = await prisma.attempt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttemptCreateManyArgs>(args?: SelectSubset<T, AttemptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Attempt.
     * @param {AttemptDeleteArgs} args - Arguments to delete one Attempt.
     * @example
     * // Delete one Attempt
     * const Attempt = await prisma.attempt.delete({
     *   where: {
     *     // ... filter to delete one Attempt
     *   }
     * })
     * 
     */
    delete<T extends AttemptDeleteArgs>(args: SelectSubset<T, AttemptDeleteArgs<ExtArgs>>): Prisma__AttemptClient<$Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Attempt.
     * @param {AttemptUpdateArgs} args - Arguments to update one Attempt.
     * @example
     * // Update one Attempt
     * const attempt = await prisma.attempt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttemptUpdateArgs>(args: SelectSubset<T, AttemptUpdateArgs<ExtArgs>>): Prisma__AttemptClient<$Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Attempts.
     * @param {AttemptDeleteManyArgs} args - Arguments to filter Attempts to delete.
     * @example
     * // Delete a few Attempts
     * const { count } = await prisma.attempt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttemptDeleteManyArgs>(args?: SelectSubset<T, AttemptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttemptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attempts
     * const attempt = await prisma.attempt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttemptUpdateManyArgs>(args: SelectSubset<T, AttemptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Attempt.
     * @param {AttemptUpsertArgs} args - Arguments to update or create a Attempt.
     * @example
     * // Update or create a Attempt
     * const attempt = await prisma.attempt.upsert({
     *   create: {
     *     // ... data to create a Attempt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attempt we want to update
     *   }
     * })
     */
    upsert<T extends AttemptUpsertArgs>(args: SelectSubset<T, AttemptUpsertArgs<ExtArgs>>): Prisma__AttemptClient<$Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attempts that matches the filter.
     * @param {AttemptFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const attempt = await prisma.attempt.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: AttemptFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Attempt.
     * @param {AttemptAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const attempt = await prisma.attempt.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: AttemptAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Attempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttemptCountArgs} args - Arguments to filter Attempts to count.
     * @example
     * // Count the number of Attempts
     * const count = await prisma.attempt.count({
     *   where: {
     *     // ... the filter for the Attempts we want to count
     *   }
     * })
    **/
    count<T extends AttemptCountArgs>(
      args?: Subset<T, AttemptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttemptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttemptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttemptAggregateArgs>(args: Subset<T, AttemptAggregateArgs>): Prisma.PrismaPromise<GetAttemptAggregateType<T>>

    /**
     * Group by Attempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttemptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AttemptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttemptGroupByArgs['orderBy'] }
        : { orderBy?: AttemptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AttemptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttemptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Attempt model
   */
  readonly fields: AttemptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Attempt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttemptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pregnancy<T extends PregnancyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PregnancyDefaultArgs<ExtArgs>>): Prisma__PregnancyClient<$Result.GetResult<Prisma.$PregnancyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    ultrasounds<T extends Attempt$ultrasoundsArgs<ExtArgs> = {}>(args?: Subset<T, Attempt$ultrasoundsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UltrasoundPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Attempt model
   */
  interface AttemptFieldRefs {
    readonly id: FieldRef<"Attempt", 'String'>
    readonly number: FieldRef<"Attempt", 'Int'>
    readonly pregnancyId: FieldRef<"Attempt", 'String'>
    readonly matingDate: FieldRef<"Attempt", 'DateTime'>
    readonly matingType: FieldRef<"Attempt", 'String'>
    readonly bullId: FieldRef<"Attempt", 'String'>
    readonly semenName: FieldRef<"Attempt", 'String'>
    readonly technician: FieldRef<"Attempt", 'String'>
    readonly estimatedBirthDate: FieldRef<"Attempt", 'DateTime'>
    readonly birthId: FieldRef<"Attempt", 'String'>
    readonly attemptStatus: FieldRef<"Attempt", 'String'>
    readonly notes: FieldRef<"Attempt", 'String'>
    readonly createdAt: FieldRef<"Attempt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Attempt findUnique
   */
  export type AttemptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attempt
     */
    select?: AttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attempt
     */
    omit?: AttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttemptInclude<ExtArgs> | null
    /**
     * Filter, which Attempt to fetch.
     */
    where: AttemptWhereUniqueInput
  }

  /**
   * Attempt findUniqueOrThrow
   */
  export type AttemptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attempt
     */
    select?: AttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attempt
     */
    omit?: AttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttemptInclude<ExtArgs> | null
    /**
     * Filter, which Attempt to fetch.
     */
    where: AttemptWhereUniqueInput
  }

  /**
   * Attempt findFirst
   */
  export type AttemptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attempt
     */
    select?: AttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attempt
     */
    omit?: AttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttemptInclude<ExtArgs> | null
    /**
     * Filter, which Attempt to fetch.
     */
    where?: AttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attempts to fetch.
     */
    orderBy?: AttemptOrderByWithRelationInput | AttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attempts.
     */
    cursor?: AttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attempts.
     */
    distinct?: AttemptScalarFieldEnum | AttemptScalarFieldEnum[]
  }

  /**
   * Attempt findFirstOrThrow
   */
  export type AttemptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attempt
     */
    select?: AttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attempt
     */
    omit?: AttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttemptInclude<ExtArgs> | null
    /**
     * Filter, which Attempt to fetch.
     */
    where?: AttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attempts to fetch.
     */
    orderBy?: AttemptOrderByWithRelationInput | AttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attempts.
     */
    cursor?: AttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attempts.
     */
    distinct?: AttemptScalarFieldEnum | AttemptScalarFieldEnum[]
  }

  /**
   * Attempt findMany
   */
  export type AttemptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attempt
     */
    select?: AttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attempt
     */
    omit?: AttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttemptInclude<ExtArgs> | null
    /**
     * Filter, which Attempts to fetch.
     */
    where?: AttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attempts to fetch.
     */
    orderBy?: AttemptOrderByWithRelationInput | AttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Attempts.
     */
    cursor?: AttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attempts.
     */
    distinct?: AttemptScalarFieldEnum | AttemptScalarFieldEnum[]
  }

  /**
   * Attempt create
   */
  export type AttemptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attempt
     */
    select?: AttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attempt
     */
    omit?: AttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttemptInclude<ExtArgs> | null
    /**
     * The data needed to create a Attempt.
     */
    data: XOR<AttemptCreateInput, AttemptUncheckedCreateInput>
  }

  /**
   * Attempt createMany
   */
  export type AttemptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Attempts.
     */
    data: AttemptCreateManyInput | AttemptCreateManyInput[]
  }

  /**
   * Attempt update
   */
  export type AttemptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attempt
     */
    select?: AttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attempt
     */
    omit?: AttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttemptInclude<ExtArgs> | null
    /**
     * The data needed to update a Attempt.
     */
    data: XOR<AttemptUpdateInput, AttemptUncheckedUpdateInput>
    /**
     * Choose, which Attempt to update.
     */
    where: AttemptWhereUniqueInput
  }

  /**
   * Attempt updateMany
   */
  export type AttemptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Attempts.
     */
    data: XOR<AttemptUpdateManyMutationInput, AttemptUncheckedUpdateManyInput>
    /**
     * Filter which Attempts to update
     */
    where?: AttemptWhereInput
    /**
     * Limit how many Attempts to update.
     */
    limit?: number
  }

  /**
   * Attempt upsert
   */
  export type AttemptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attempt
     */
    select?: AttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attempt
     */
    omit?: AttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttemptInclude<ExtArgs> | null
    /**
     * The filter to search for the Attempt to update in case it exists.
     */
    where: AttemptWhereUniqueInput
    /**
     * In case the Attempt found by the `where` argument doesn't exist, create a new Attempt with this data.
     */
    create: XOR<AttemptCreateInput, AttemptUncheckedCreateInput>
    /**
     * In case the Attempt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttemptUpdateInput, AttemptUncheckedUpdateInput>
  }

  /**
   * Attempt delete
   */
  export type AttemptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attempt
     */
    select?: AttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attempt
     */
    omit?: AttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttemptInclude<ExtArgs> | null
    /**
     * Filter which Attempt to delete.
     */
    where: AttemptWhereUniqueInput
  }

  /**
   * Attempt deleteMany
   */
  export type AttemptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attempts to delete
     */
    where?: AttemptWhereInput
    /**
     * Limit how many Attempts to delete.
     */
    limit?: number
  }

  /**
   * Attempt findRaw
   */
  export type AttemptFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Attempt aggregateRaw
   */
  export type AttemptAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Attempt.ultrasounds
   */
  export type Attempt$ultrasoundsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ultrasound
     */
    select?: UltrasoundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ultrasound
     */
    omit?: UltrasoundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UltrasoundInclude<ExtArgs> | null
    where?: UltrasoundWhereInput
    orderBy?: UltrasoundOrderByWithRelationInput | UltrasoundOrderByWithRelationInput[]
    cursor?: UltrasoundWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UltrasoundScalarFieldEnum | UltrasoundScalarFieldEnum[]
  }

  /**
   * Attempt without action
   */
  export type AttemptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attempt
     */
    select?: AttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attempt
     */
    omit?: AttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttemptInclude<ExtArgs> | null
  }


  /**
   * Model Ultrasound
   */

  export type AggregateUltrasound = {
    _count: UltrasoundCountAggregateOutputType | null
    _avg: UltrasoundAvgAggregateOutputType | null
    _sum: UltrasoundSumAggregateOutputType | null
    _min: UltrasoundMinAggregateOutputType | null
    _max: UltrasoundMaxAggregateOutputType | null
  }

  export type UltrasoundAvgAggregateOutputType = {
    days: number | null
  }

  export type UltrasoundSumAggregateOutputType = {
    days: number | null
  }

  export type UltrasoundMinAggregateOutputType = {
    id: string | null
    attemptId: string | null
    days: number | null
    result: string | null
    notes: string | null
    veterinarianId: string | null
    ultrasoundDate: Date | null
  }

  export type UltrasoundMaxAggregateOutputType = {
    id: string | null
    attemptId: string | null
    days: number | null
    result: string | null
    notes: string | null
    veterinarianId: string | null
    ultrasoundDate: Date | null
  }

  export type UltrasoundCountAggregateOutputType = {
    id: number
    attemptId: number
    days: number
    result: number
    notes: number
    veterinarianId: number
    ultrasoundDate: number
    _all: number
  }


  export type UltrasoundAvgAggregateInputType = {
    days?: true
  }

  export type UltrasoundSumAggregateInputType = {
    days?: true
  }

  export type UltrasoundMinAggregateInputType = {
    id?: true
    attemptId?: true
    days?: true
    result?: true
    notes?: true
    veterinarianId?: true
    ultrasoundDate?: true
  }

  export type UltrasoundMaxAggregateInputType = {
    id?: true
    attemptId?: true
    days?: true
    result?: true
    notes?: true
    veterinarianId?: true
    ultrasoundDate?: true
  }

  export type UltrasoundCountAggregateInputType = {
    id?: true
    attemptId?: true
    days?: true
    result?: true
    notes?: true
    veterinarianId?: true
    ultrasoundDate?: true
    _all?: true
  }

  export type UltrasoundAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ultrasound to aggregate.
     */
    where?: UltrasoundWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ultrasounds to fetch.
     */
    orderBy?: UltrasoundOrderByWithRelationInput | UltrasoundOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UltrasoundWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ultrasounds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ultrasounds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ultrasounds
    **/
    _count?: true | UltrasoundCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UltrasoundAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UltrasoundSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UltrasoundMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UltrasoundMaxAggregateInputType
  }

  export type GetUltrasoundAggregateType<T extends UltrasoundAggregateArgs> = {
        [P in keyof T & keyof AggregateUltrasound]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUltrasound[P]>
      : GetScalarType<T[P], AggregateUltrasound[P]>
  }




  export type UltrasoundGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UltrasoundWhereInput
    orderBy?: UltrasoundOrderByWithAggregationInput | UltrasoundOrderByWithAggregationInput[]
    by: UltrasoundScalarFieldEnum[] | UltrasoundScalarFieldEnum
    having?: UltrasoundScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UltrasoundCountAggregateInputType | true
    _avg?: UltrasoundAvgAggregateInputType
    _sum?: UltrasoundSumAggregateInputType
    _min?: UltrasoundMinAggregateInputType
    _max?: UltrasoundMaxAggregateInputType
  }

  export type UltrasoundGroupByOutputType = {
    id: string
    attemptId: string
    days: number
    result: string
    notes: string | null
    veterinarianId: string | null
    ultrasoundDate: Date
    _count: UltrasoundCountAggregateOutputType | null
    _avg: UltrasoundAvgAggregateOutputType | null
    _sum: UltrasoundSumAggregateOutputType | null
    _min: UltrasoundMinAggregateOutputType | null
    _max: UltrasoundMaxAggregateOutputType | null
  }

  type GetUltrasoundGroupByPayload<T extends UltrasoundGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UltrasoundGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UltrasoundGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UltrasoundGroupByOutputType[P]>
            : GetScalarType<T[P], UltrasoundGroupByOutputType[P]>
        }
      >
    >


  export type UltrasoundSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    attemptId?: boolean
    days?: boolean
    result?: boolean
    notes?: boolean
    veterinarianId?: boolean
    ultrasoundDate?: boolean
    attempt?: boolean | AttemptDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ultrasound"]>



  export type UltrasoundSelectScalar = {
    id?: boolean
    attemptId?: boolean
    days?: boolean
    result?: boolean
    notes?: boolean
    veterinarianId?: boolean
    ultrasoundDate?: boolean
  }

  export type UltrasoundOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "attemptId" | "days" | "result" | "notes" | "veterinarianId" | "ultrasoundDate", ExtArgs["result"]["ultrasound"]>
  export type UltrasoundInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attempt?: boolean | AttemptDefaultArgs<ExtArgs>
  }

  export type $UltrasoundPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ultrasound"
    objects: {
      attempt: Prisma.$AttemptPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      attemptId: string
      days: number
      result: string
      notes: string | null
      veterinarianId: string | null
      ultrasoundDate: Date
    }, ExtArgs["result"]["ultrasound"]>
    composites: {}
  }

  type UltrasoundGetPayload<S extends boolean | null | undefined | UltrasoundDefaultArgs> = $Result.GetResult<Prisma.$UltrasoundPayload, S>

  type UltrasoundCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UltrasoundFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UltrasoundCountAggregateInputType | true
    }

  export interface UltrasoundDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ultrasound'], meta: { name: 'Ultrasound' } }
    /**
     * Find zero or one Ultrasound that matches the filter.
     * @param {UltrasoundFindUniqueArgs} args - Arguments to find a Ultrasound
     * @example
     * // Get one Ultrasound
     * const ultrasound = await prisma.ultrasound.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UltrasoundFindUniqueArgs>(args: SelectSubset<T, UltrasoundFindUniqueArgs<ExtArgs>>): Prisma__UltrasoundClient<$Result.GetResult<Prisma.$UltrasoundPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ultrasound that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UltrasoundFindUniqueOrThrowArgs} args - Arguments to find a Ultrasound
     * @example
     * // Get one Ultrasound
     * const ultrasound = await prisma.ultrasound.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UltrasoundFindUniqueOrThrowArgs>(args: SelectSubset<T, UltrasoundFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UltrasoundClient<$Result.GetResult<Prisma.$UltrasoundPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ultrasound that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UltrasoundFindFirstArgs} args - Arguments to find a Ultrasound
     * @example
     * // Get one Ultrasound
     * const ultrasound = await prisma.ultrasound.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UltrasoundFindFirstArgs>(args?: SelectSubset<T, UltrasoundFindFirstArgs<ExtArgs>>): Prisma__UltrasoundClient<$Result.GetResult<Prisma.$UltrasoundPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ultrasound that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UltrasoundFindFirstOrThrowArgs} args - Arguments to find a Ultrasound
     * @example
     * // Get one Ultrasound
     * const ultrasound = await prisma.ultrasound.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UltrasoundFindFirstOrThrowArgs>(args?: SelectSubset<T, UltrasoundFindFirstOrThrowArgs<ExtArgs>>): Prisma__UltrasoundClient<$Result.GetResult<Prisma.$UltrasoundPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ultrasounds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UltrasoundFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ultrasounds
     * const ultrasounds = await prisma.ultrasound.findMany()
     * 
     * // Get first 10 Ultrasounds
     * const ultrasounds = await prisma.ultrasound.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ultrasoundWithIdOnly = await prisma.ultrasound.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UltrasoundFindManyArgs>(args?: SelectSubset<T, UltrasoundFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UltrasoundPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ultrasound.
     * @param {UltrasoundCreateArgs} args - Arguments to create a Ultrasound.
     * @example
     * // Create one Ultrasound
     * const Ultrasound = await prisma.ultrasound.create({
     *   data: {
     *     // ... data to create a Ultrasound
     *   }
     * })
     * 
     */
    create<T extends UltrasoundCreateArgs>(args: SelectSubset<T, UltrasoundCreateArgs<ExtArgs>>): Prisma__UltrasoundClient<$Result.GetResult<Prisma.$UltrasoundPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ultrasounds.
     * @param {UltrasoundCreateManyArgs} args - Arguments to create many Ultrasounds.
     * @example
     * // Create many Ultrasounds
     * const ultrasound = await prisma.ultrasound.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UltrasoundCreateManyArgs>(args?: SelectSubset<T, UltrasoundCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Ultrasound.
     * @param {UltrasoundDeleteArgs} args - Arguments to delete one Ultrasound.
     * @example
     * // Delete one Ultrasound
     * const Ultrasound = await prisma.ultrasound.delete({
     *   where: {
     *     // ... filter to delete one Ultrasound
     *   }
     * })
     * 
     */
    delete<T extends UltrasoundDeleteArgs>(args: SelectSubset<T, UltrasoundDeleteArgs<ExtArgs>>): Prisma__UltrasoundClient<$Result.GetResult<Prisma.$UltrasoundPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ultrasound.
     * @param {UltrasoundUpdateArgs} args - Arguments to update one Ultrasound.
     * @example
     * // Update one Ultrasound
     * const ultrasound = await prisma.ultrasound.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UltrasoundUpdateArgs>(args: SelectSubset<T, UltrasoundUpdateArgs<ExtArgs>>): Prisma__UltrasoundClient<$Result.GetResult<Prisma.$UltrasoundPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ultrasounds.
     * @param {UltrasoundDeleteManyArgs} args - Arguments to filter Ultrasounds to delete.
     * @example
     * // Delete a few Ultrasounds
     * const { count } = await prisma.ultrasound.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UltrasoundDeleteManyArgs>(args?: SelectSubset<T, UltrasoundDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ultrasounds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UltrasoundUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ultrasounds
     * const ultrasound = await prisma.ultrasound.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UltrasoundUpdateManyArgs>(args: SelectSubset<T, UltrasoundUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Ultrasound.
     * @param {UltrasoundUpsertArgs} args - Arguments to update or create a Ultrasound.
     * @example
     * // Update or create a Ultrasound
     * const ultrasound = await prisma.ultrasound.upsert({
     *   create: {
     *     // ... data to create a Ultrasound
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ultrasound we want to update
     *   }
     * })
     */
    upsert<T extends UltrasoundUpsertArgs>(args: SelectSubset<T, UltrasoundUpsertArgs<ExtArgs>>): Prisma__UltrasoundClient<$Result.GetResult<Prisma.$UltrasoundPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ultrasounds that matches the filter.
     * @param {UltrasoundFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const ultrasound = await prisma.ultrasound.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: UltrasoundFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Ultrasound.
     * @param {UltrasoundAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const ultrasound = await prisma.ultrasound.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UltrasoundAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Ultrasounds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UltrasoundCountArgs} args - Arguments to filter Ultrasounds to count.
     * @example
     * // Count the number of Ultrasounds
     * const count = await prisma.ultrasound.count({
     *   where: {
     *     // ... the filter for the Ultrasounds we want to count
     *   }
     * })
    **/
    count<T extends UltrasoundCountArgs>(
      args?: Subset<T, UltrasoundCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UltrasoundCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ultrasound.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UltrasoundAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UltrasoundAggregateArgs>(args: Subset<T, UltrasoundAggregateArgs>): Prisma.PrismaPromise<GetUltrasoundAggregateType<T>>

    /**
     * Group by Ultrasound.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UltrasoundGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UltrasoundGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UltrasoundGroupByArgs['orderBy'] }
        : { orderBy?: UltrasoundGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UltrasoundGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUltrasoundGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ultrasound model
   */
  readonly fields: UltrasoundFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ultrasound.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UltrasoundClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attempt<T extends AttemptDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AttemptDefaultArgs<ExtArgs>>): Prisma__AttemptClient<$Result.GetResult<Prisma.$AttemptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Ultrasound model
   */
  interface UltrasoundFieldRefs {
    readonly id: FieldRef<"Ultrasound", 'String'>
    readonly attemptId: FieldRef<"Ultrasound", 'String'>
    readonly days: FieldRef<"Ultrasound", 'Int'>
    readonly result: FieldRef<"Ultrasound", 'String'>
    readonly notes: FieldRef<"Ultrasound", 'String'>
    readonly veterinarianId: FieldRef<"Ultrasound", 'String'>
    readonly ultrasoundDate: FieldRef<"Ultrasound", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Ultrasound findUnique
   */
  export type UltrasoundFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ultrasound
     */
    select?: UltrasoundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ultrasound
     */
    omit?: UltrasoundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UltrasoundInclude<ExtArgs> | null
    /**
     * Filter, which Ultrasound to fetch.
     */
    where: UltrasoundWhereUniqueInput
  }

  /**
   * Ultrasound findUniqueOrThrow
   */
  export type UltrasoundFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ultrasound
     */
    select?: UltrasoundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ultrasound
     */
    omit?: UltrasoundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UltrasoundInclude<ExtArgs> | null
    /**
     * Filter, which Ultrasound to fetch.
     */
    where: UltrasoundWhereUniqueInput
  }

  /**
   * Ultrasound findFirst
   */
  export type UltrasoundFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ultrasound
     */
    select?: UltrasoundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ultrasound
     */
    omit?: UltrasoundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UltrasoundInclude<ExtArgs> | null
    /**
     * Filter, which Ultrasound to fetch.
     */
    where?: UltrasoundWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ultrasounds to fetch.
     */
    orderBy?: UltrasoundOrderByWithRelationInput | UltrasoundOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ultrasounds.
     */
    cursor?: UltrasoundWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ultrasounds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ultrasounds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ultrasounds.
     */
    distinct?: UltrasoundScalarFieldEnum | UltrasoundScalarFieldEnum[]
  }

  /**
   * Ultrasound findFirstOrThrow
   */
  export type UltrasoundFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ultrasound
     */
    select?: UltrasoundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ultrasound
     */
    omit?: UltrasoundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UltrasoundInclude<ExtArgs> | null
    /**
     * Filter, which Ultrasound to fetch.
     */
    where?: UltrasoundWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ultrasounds to fetch.
     */
    orderBy?: UltrasoundOrderByWithRelationInput | UltrasoundOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ultrasounds.
     */
    cursor?: UltrasoundWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ultrasounds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ultrasounds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ultrasounds.
     */
    distinct?: UltrasoundScalarFieldEnum | UltrasoundScalarFieldEnum[]
  }

  /**
   * Ultrasound findMany
   */
  export type UltrasoundFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ultrasound
     */
    select?: UltrasoundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ultrasound
     */
    omit?: UltrasoundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UltrasoundInclude<ExtArgs> | null
    /**
     * Filter, which Ultrasounds to fetch.
     */
    where?: UltrasoundWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ultrasounds to fetch.
     */
    orderBy?: UltrasoundOrderByWithRelationInput | UltrasoundOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ultrasounds.
     */
    cursor?: UltrasoundWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ultrasounds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ultrasounds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ultrasounds.
     */
    distinct?: UltrasoundScalarFieldEnum | UltrasoundScalarFieldEnum[]
  }

  /**
   * Ultrasound create
   */
  export type UltrasoundCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ultrasound
     */
    select?: UltrasoundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ultrasound
     */
    omit?: UltrasoundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UltrasoundInclude<ExtArgs> | null
    /**
     * The data needed to create a Ultrasound.
     */
    data: XOR<UltrasoundCreateInput, UltrasoundUncheckedCreateInput>
  }

  /**
   * Ultrasound createMany
   */
  export type UltrasoundCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ultrasounds.
     */
    data: UltrasoundCreateManyInput | UltrasoundCreateManyInput[]
  }

  /**
   * Ultrasound update
   */
  export type UltrasoundUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ultrasound
     */
    select?: UltrasoundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ultrasound
     */
    omit?: UltrasoundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UltrasoundInclude<ExtArgs> | null
    /**
     * The data needed to update a Ultrasound.
     */
    data: XOR<UltrasoundUpdateInput, UltrasoundUncheckedUpdateInput>
    /**
     * Choose, which Ultrasound to update.
     */
    where: UltrasoundWhereUniqueInput
  }

  /**
   * Ultrasound updateMany
   */
  export type UltrasoundUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ultrasounds.
     */
    data: XOR<UltrasoundUpdateManyMutationInput, UltrasoundUncheckedUpdateManyInput>
    /**
     * Filter which Ultrasounds to update
     */
    where?: UltrasoundWhereInput
    /**
     * Limit how many Ultrasounds to update.
     */
    limit?: number
  }

  /**
   * Ultrasound upsert
   */
  export type UltrasoundUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ultrasound
     */
    select?: UltrasoundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ultrasound
     */
    omit?: UltrasoundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UltrasoundInclude<ExtArgs> | null
    /**
     * The filter to search for the Ultrasound to update in case it exists.
     */
    where: UltrasoundWhereUniqueInput
    /**
     * In case the Ultrasound found by the `where` argument doesn't exist, create a new Ultrasound with this data.
     */
    create: XOR<UltrasoundCreateInput, UltrasoundUncheckedCreateInput>
    /**
     * In case the Ultrasound was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UltrasoundUpdateInput, UltrasoundUncheckedUpdateInput>
  }

  /**
   * Ultrasound delete
   */
  export type UltrasoundDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ultrasound
     */
    select?: UltrasoundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ultrasound
     */
    omit?: UltrasoundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UltrasoundInclude<ExtArgs> | null
    /**
     * Filter which Ultrasound to delete.
     */
    where: UltrasoundWhereUniqueInput
  }

  /**
   * Ultrasound deleteMany
   */
  export type UltrasoundDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ultrasounds to delete
     */
    where?: UltrasoundWhereInput
    /**
     * Limit how many Ultrasounds to delete.
     */
    limit?: number
  }

  /**
   * Ultrasound findRaw
   */
  export type UltrasoundFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Ultrasound aggregateRaw
   */
  export type UltrasoundAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Ultrasound without action
   */
  export type UltrasoundDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ultrasound
     */
    select?: UltrasoundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ultrasound
     */
    omit?: UltrasoundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UltrasoundInclude<ExtArgs> | null
  }


  /**
   * Model Birth
   */

  export type AggregateBirth = {
    _count: BirthCountAggregateOutputType | null
    _avg: BirthAvgAggregateOutputType | null
    _sum: BirthSumAggregateOutputType | null
    _min: BirthMinAggregateOutputType | null
    _max: BirthMaxAggregateOutputType | null
  }

  export type BirthAvgAggregateOutputType = {
    calfWeight: number | null
  }

  export type BirthSumAggregateOutputType = {
    calfWeight: number | null
  }

  export type BirthMinAggregateOutputType = {
    id: string | null
    damId: string | null
    pregnancyId: string | null
    birthDate: Date | null
    birthTime: string | null
    birthType: string | null
    veterinarianId: string | null
    veterinarianName: string | null
    veterinarianCrv: string | null
    calfGender: string | null
    calfWeight: number | null
    calfEarTag: string | null
    calfChip: string | null
    calfStatus: string | null
    situation: string | null
    deathReason: string | null
    notes: string | null
    farmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BirthMaxAggregateOutputType = {
    id: string | null
    damId: string | null
    pregnancyId: string | null
    birthDate: Date | null
    birthTime: string | null
    birthType: string | null
    veterinarianId: string | null
    veterinarianName: string | null
    veterinarianCrv: string | null
    calfGender: string | null
    calfWeight: number | null
    calfEarTag: string | null
    calfChip: string | null
    calfStatus: string | null
    situation: string | null
    deathReason: string | null
    notes: string | null
    farmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BirthCountAggregateOutputType = {
    id: number
    damId: number
    pregnancyId: number
    birthDate: number
    birthTime: number
    birthType: number
    veterinarianId: number
    veterinarianName: number
    veterinarianCrv: number
    calfGender: number
    calfWeight: number
    calfEarTag: number
    calfChip: number
    calfStatus: number
    situation: number
    deathReason: number
    notes: number
    farmId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BirthAvgAggregateInputType = {
    calfWeight?: true
  }

  export type BirthSumAggregateInputType = {
    calfWeight?: true
  }

  export type BirthMinAggregateInputType = {
    id?: true
    damId?: true
    pregnancyId?: true
    birthDate?: true
    birthTime?: true
    birthType?: true
    veterinarianId?: true
    veterinarianName?: true
    veterinarianCrv?: true
    calfGender?: true
    calfWeight?: true
    calfEarTag?: true
    calfChip?: true
    calfStatus?: true
    situation?: true
    deathReason?: true
    notes?: true
    farmId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BirthMaxAggregateInputType = {
    id?: true
    damId?: true
    pregnancyId?: true
    birthDate?: true
    birthTime?: true
    birthType?: true
    veterinarianId?: true
    veterinarianName?: true
    veterinarianCrv?: true
    calfGender?: true
    calfWeight?: true
    calfEarTag?: true
    calfChip?: true
    calfStatus?: true
    situation?: true
    deathReason?: true
    notes?: true
    farmId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BirthCountAggregateInputType = {
    id?: true
    damId?: true
    pregnancyId?: true
    birthDate?: true
    birthTime?: true
    birthType?: true
    veterinarianId?: true
    veterinarianName?: true
    veterinarianCrv?: true
    calfGender?: true
    calfWeight?: true
    calfEarTag?: true
    calfChip?: true
    calfStatus?: true
    situation?: true
    deathReason?: true
    notes?: true
    farmId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BirthAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Birth to aggregate.
     */
    where?: BirthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Births to fetch.
     */
    orderBy?: BirthOrderByWithRelationInput | BirthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BirthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Births from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Births.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Births
    **/
    _count?: true | BirthCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BirthAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BirthSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BirthMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BirthMaxAggregateInputType
  }

  export type GetBirthAggregateType<T extends BirthAggregateArgs> = {
        [P in keyof T & keyof AggregateBirth]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBirth[P]>
      : GetScalarType<T[P], AggregateBirth[P]>
  }




  export type BirthGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BirthWhereInput
    orderBy?: BirthOrderByWithAggregationInput | BirthOrderByWithAggregationInput[]
    by: BirthScalarFieldEnum[] | BirthScalarFieldEnum
    having?: BirthScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BirthCountAggregateInputType | true
    _avg?: BirthAvgAggregateInputType
    _sum?: BirthSumAggregateInputType
    _min?: BirthMinAggregateInputType
    _max?: BirthMaxAggregateInputType
  }

  export type BirthGroupByOutputType = {
    id: string
    damId: string
    pregnancyId: string | null
    birthDate: Date
    birthTime: string | null
    birthType: string
    veterinarianId: string | null
    veterinarianName: string | null
    veterinarianCrv: string | null
    calfGender: string | null
    calfWeight: number | null
    calfEarTag: string | null
    calfChip: string | null
    calfStatus: string
    situation: string
    deathReason: string | null
    notes: string | null
    farmId: string
    createdAt: Date
    updatedAt: Date
    _count: BirthCountAggregateOutputType | null
    _avg: BirthAvgAggregateOutputType | null
    _sum: BirthSumAggregateOutputType | null
    _min: BirthMinAggregateOutputType | null
    _max: BirthMaxAggregateOutputType | null
  }

  type GetBirthGroupByPayload<T extends BirthGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BirthGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BirthGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BirthGroupByOutputType[P]>
            : GetScalarType<T[P], BirthGroupByOutputType[P]>
        }
      >
    >


  export type BirthSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    damId?: boolean
    pregnancyId?: boolean
    birthDate?: boolean
    birthTime?: boolean
    birthType?: boolean
    veterinarianId?: boolean
    veterinarianName?: boolean
    veterinarianCrv?: boolean
    calfGender?: boolean
    calfWeight?: boolean
    calfEarTag?: boolean
    calfChip?: boolean
    calfStatus?: boolean
    situation?: boolean
    deathReason?: boolean
    notes?: boolean
    farmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["birth"]>



  export type BirthSelectScalar = {
    id?: boolean
    damId?: boolean
    pregnancyId?: boolean
    birthDate?: boolean
    birthTime?: boolean
    birthType?: boolean
    veterinarianId?: boolean
    veterinarianName?: boolean
    veterinarianCrv?: boolean
    calfGender?: boolean
    calfWeight?: boolean
    calfEarTag?: boolean
    calfChip?: boolean
    calfStatus?: boolean
    situation?: boolean
    deathReason?: boolean
    notes?: boolean
    farmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BirthOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "damId" | "pregnancyId" | "birthDate" | "birthTime" | "birthType" | "veterinarianId" | "veterinarianName" | "veterinarianCrv" | "calfGender" | "calfWeight" | "calfEarTag" | "calfChip" | "calfStatus" | "situation" | "deathReason" | "notes" | "farmId" | "createdAt" | "updatedAt", ExtArgs["result"]["birth"]>

  export type $BirthPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Birth"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      damId: string
      pregnancyId: string | null
      birthDate: Date
      birthTime: string | null
      birthType: string
      veterinarianId: string | null
      veterinarianName: string | null
      veterinarianCrv: string | null
      calfGender: string | null
      calfWeight: number | null
      calfEarTag: string | null
      calfChip: string | null
      calfStatus: string
      situation: string
      deathReason: string | null
      notes: string | null
      farmId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["birth"]>
    composites: {}
  }

  type BirthGetPayload<S extends boolean | null | undefined | BirthDefaultArgs> = $Result.GetResult<Prisma.$BirthPayload, S>

  type BirthCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BirthFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BirthCountAggregateInputType | true
    }

  export interface BirthDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Birth'], meta: { name: 'Birth' } }
    /**
     * Find zero or one Birth that matches the filter.
     * @param {BirthFindUniqueArgs} args - Arguments to find a Birth
     * @example
     * // Get one Birth
     * const birth = await prisma.birth.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BirthFindUniqueArgs>(args: SelectSubset<T, BirthFindUniqueArgs<ExtArgs>>): Prisma__BirthClient<$Result.GetResult<Prisma.$BirthPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Birth that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BirthFindUniqueOrThrowArgs} args - Arguments to find a Birth
     * @example
     * // Get one Birth
     * const birth = await prisma.birth.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BirthFindUniqueOrThrowArgs>(args: SelectSubset<T, BirthFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BirthClient<$Result.GetResult<Prisma.$BirthPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Birth that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BirthFindFirstArgs} args - Arguments to find a Birth
     * @example
     * // Get one Birth
     * const birth = await prisma.birth.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BirthFindFirstArgs>(args?: SelectSubset<T, BirthFindFirstArgs<ExtArgs>>): Prisma__BirthClient<$Result.GetResult<Prisma.$BirthPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Birth that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BirthFindFirstOrThrowArgs} args - Arguments to find a Birth
     * @example
     * // Get one Birth
     * const birth = await prisma.birth.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BirthFindFirstOrThrowArgs>(args?: SelectSubset<T, BirthFindFirstOrThrowArgs<ExtArgs>>): Prisma__BirthClient<$Result.GetResult<Prisma.$BirthPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Births that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BirthFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Births
     * const births = await prisma.birth.findMany()
     * 
     * // Get first 10 Births
     * const births = await prisma.birth.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const birthWithIdOnly = await prisma.birth.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BirthFindManyArgs>(args?: SelectSubset<T, BirthFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BirthPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Birth.
     * @param {BirthCreateArgs} args - Arguments to create a Birth.
     * @example
     * // Create one Birth
     * const Birth = await prisma.birth.create({
     *   data: {
     *     // ... data to create a Birth
     *   }
     * })
     * 
     */
    create<T extends BirthCreateArgs>(args: SelectSubset<T, BirthCreateArgs<ExtArgs>>): Prisma__BirthClient<$Result.GetResult<Prisma.$BirthPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Births.
     * @param {BirthCreateManyArgs} args - Arguments to create many Births.
     * @example
     * // Create many Births
     * const birth = await prisma.birth.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BirthCreateManyArgs>(args?: SelectSubset<T, BirthCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Birth.
     * @param {BirthDeleteArgs} args - Arguments to delete one Birth.
     * @example
     * // Delete one Birth
     * const Birth = await prisma.birth.delete({
     *   where: {
     *     // ... filter to delete one Birth
     *   }
     * })
     * 
     */
    delete<T extends BirthDeleteArgs>(args: SelectSubset<T, BirthDeleteArgs<ExtArgs>>): Prisma__BirthClient<$Result.GetResult<Prisma.$BirthPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Birth.
     * @param {BirthUpdateArgs} args - Arguments to update one Birth.
     * @example
     * // Update one Birth
     * const birth = await prisma.birth.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BirthUpdateArgs>(args: SelectSubset<T, BirthUpdateArgs<ExtArgs>>): Prisma__BirthClient<$Result.GetResult<Prisma.$BirthPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Births.
     * @param {BirthDeleteManyArgs} args - Arguments to filter Births to delete.
     * @example
     * // Delete a few Births
     * const { count } = await prisma.birth.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BirthDeleteManyArgs>(args?: SelectSubset<T, BirthDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Births.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BirthUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Births
     * const birth = await prisma.birth.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BirthUpdateManyArgs>(args: SelectSubset<T, BirthUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Birth.
     * @param {BirthUpsertArgs} args - Arguments to update or create a Birth.
     * @example
     * // Update or create a Birth
     * const birth = await prisma.birth.upsert({
     *   create: {
     *     // ... data to create a Birth
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Birth we want to update
     *   }
     * })
     */
    upsert<T extends BirthUpsertArgs>(args: SelectSubset<T, BirthUpsertArgs<ExtArgs>>): Prisma__BirthClient<$Result.GetResult<Prisma.$BirthPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Births that matches the filter.
     * @param {BirthFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const birth = await prisma.birth.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: BirthFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Birth.
     * @param {BirthAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const birth = await prisma.birth.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: BirthAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Births.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BirthCountArgs} args - Arguments to filter Births to count.
     * @example
     * // Count the number of Births
     * const count = await prisma.birth.count({
     *   where: {
     *     // ... the filter for the Births we want to count
     *   }
     * })
    **/
    count<T extends BirthCountArgs>(
      args?: Subset<T, BirthCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BirthCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Birth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BirthAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BirthAggregateArgs>(args: Subset<T, BirthAggregateArgs>): Prisma.PrismaPromise<GetBirthAggregateType<T>>

    /**
     * Group by Birth.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BirthGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BirthGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BirthGroupByArgs['orderBy'] }
        : { orderBy?: BirthGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BirthGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBirthGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Birth model
   */
  readonly fields: BirthFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Birth.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BirthClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Birth model
   */
  interface BirthFieldRefs {
    readonly id: FieldRef<"Birth", 'String'>
    readonly damId: FieldRef<"Birth", 'String'>
    readonly pregnancyId: FieldRef<"Birth", 'String'>
    readonly birthDate: FieldRef<"Birth", 'DateTime'>
    readonly birthTime: FieldRef<"Birth", 'String'>
    readonly birthType: FieldRef<"Birth", 'String'>
    readonly veterinarianId: FieldRef<"Birth", 'String'>
    readonly veterinarianName: FieldRef<"Birth", 'String'>
    readonly veterinarianCrv: FieldRef<"Birth", 'String'>
    readonly calfGender: FieldRef<"Birth", 'String'>
    readonly calfWeight: FieldRef<"Birth", 'Float'>
    readonly calfEarTag: FieldRef<"Birth", 'String'>
    readonly calfChip: FieldRef<"Birth", 'String'>
    readonly calfStatus: FieldRef<"Birth", 'String'>
    readonly situation: FieldRef<"Birth", 'String'>
    readonly deathReason: FieldRef<"Birth", 'String'>
    readonly notes: FieldRef<"Birth", 'String'>
    readonly farmId: FieldRef<"Birth", 'String'>
    readonly createdAt: FieldRef<"Birth", 'DateTime'>
    readonly updatedAt: FieldRef<"Birth", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Birth findUnique
   */
  export type BirthFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
    /**
     * Filter, which Birth to fetch.
     */
    where: BirthWhereUniqueInput
  }

  /**
   * Birth findUniqueOrThrow
   */
  export type BirthFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
    /**
     * Filter, which Birth to fetch.
     */
    where: BirthWhereUniqueInput
  }

  /**
   * Birth findFirst
   */
  export type BirthFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
    /**
     * Filter, which Birth to fetch.
     */
    where?: BirthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Births to fetch.
     */
    orderBy?: BirthOrderByWithRelationInput | BirthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Births.
     */
    cursor?: BirthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Births from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Births.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Births.
     */
    distinct?: BirthScalarFieldEnum | BirthScalarFieldEnum[]
  }

  /**
   * Birth findFirstOrThrow
   */
  export type BirthFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
    /**
     * Filter, which Birth to fetch.
     */
    where?: BirthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Births to fetch.
     */
    orderBy?: BirthOrderByWithRelationInput | BirthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Births.
     */
    cursor?: BirthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Births from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Births.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Births.
     */
    distinct?: BirthScalarFieldEnum | BirthScalarFieldEnum[]
  }

  /**
   * Birth findMany
   */
  export type BirthFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
    /**
     * Filter, which Births to fetch.
     */
    where?: BirthWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Births to fetch.
     */
    orderBy?: BirthOrderByWithRelationInput | BirthOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Births.
     */
    cursor?: BirthWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Births from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Births.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Births.
     */
    distinct?: BirthScalarFieldEnum | BirthScalarFieldEnum[]
  }

  /**
   * Birth create
   */
  export type BirthCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
    /**
     * The data needed to create a Birth.
     */
    data: XOR<BirthCreateInput, BirthUncheckedCreateInput>
  }

  /**
   * Birth createMany
   */
  export type BirthCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Births.
     */
    data: BirthCreateManyInput | BirthCreateManyInput[]
  }

  /**
   * Birth update
   */
  export type BirthUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
    /**
     * The data needed to update a Birth.
     */
    data: XOR<BirthUpdateInput, BirthUncheckedUpdateInput>
    /**
     * Choose, which Birth to update.
     */
    where: BirthWhereUniqueInput
  }

  /**
   * Birth updateMany
   */
  export type BirthUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Births.
     */
    data: XOR<BirthUpdateManyMutationInput, BirthUncheckedUpdateManyInput>
    /**
     * Filter which Births to update
     */
    where?: BirthWhereInput
    /**
     * Limit how many Births to update.
     */
    limit?: number
  }

  /**
   * Birth upsert
   */
  export type BirthUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
    /**
     * The filter to search for the Birth to update in case it exists.
     */
    where: BirthWhereUniqueInput
    /**
     * In case the Birth found by the `where` argument doesn't exist, create a new Birth with this data.
     */
    create: XOR<BirthCreateInput, BirthUncheckedCreateInput>
    /**
     * In case the Birth was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BirthUpdateInput, BirthUncheckedUpdateInput>
  }

  /**
   * Birth delete
   */
  export type BirthDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
    /**
     * Filter which Birth to delete.
     */
    where: BirthWhereUniqueInput
  }

  /**
   * Birth deleteMany
   */
  export type BirthDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Births to delete
     */
    where?: BirthWhereInput
    /**
     * Limit how many Births to delete.
     */
    limit?: number
  }

  /**
   * Birth findRaw
   */
  export type BirthFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Birth aggregateRaw
   */
  export type BirthAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Birth without action
   */
  export type BirthDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Birth
     */
    select?: BirthSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Birth
     */
    omit?: BirthOmit<ExtArgs> | null
  }


  /**
   * Model Vaccination
   */

  export type AggregateVaccination = {
    _count: VaccinationCountAggregateOutputType | null
    _min: VaccinationMinAggregateOutputType | null
    _max: VaccinationMaxAggregateOutputType | null
  }

  export type VaccinationMinAggregateOutputType = {
    id: string | null
    animalId: string | null
    vaccineType: string | null
    brand: string | null
    batch: string | null
    vaccinationDate: Date | null
    expirationDate: Date | null
    nextDoseDate: Date | null
    photoUrl: string | null
    reaction: string | null
    veterinarianId: string | null
    farmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VaccinationMaxAggregateOutputType = {
    id: string | null
    animalId: string | null
    vaccineType: string | null
    brand: string | null
    batch: string | null
    vaccinationDate: Date | null
    expirationDate: Date | null
    nextDoseDate: Date | null
    photoUrl: string | null
    reaction: string | null
    veterinarianId: string | null
    farmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VaccinationCountAggregateOutputType = {
    id: number
    animalId: number
    vaccineType: number
    brand: number
    batch: number
    vaccinationDate: number
    expirationDate: number
    nextDoseDate: number
    photoUrl: number
    reaction: number
    veterinarianId: number
    farmId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VaccinationMinAggregateInputType = {
    id?: true
    animalId?: true
    vaccineType?: true
    brand?: true
    batch?: true
    vaccinationDate?: true
    expirationDate?: true
    nextDoseDate?: true
    photoUrl?: true
    reaction?: true
    veterinarianId?: true
    farmId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VaccinationMaxAggregateInputType = {
    id?: true
    animalId?: true
    vaccineType?: true
    brand?: true
    batch?: true
    vaccinationDate?: true
    expirationDate?: true
    nextDoseDate?: true
    photoUrl?: true
    reaction?: true
    veterinarianId?: true
    farmId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VaccinationCountAggregateInputType = {
    id?: true
    animalId?: true
    vaccineType?: true
    brand?: true
    batch?: true
    vaccinationDate?: true
    expirationDate?: true
    nextDoseDate?: true
    photoUrl?: true
    reaction?: true
    veterinarianId?: true
    farmId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VaccinationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vaccination to aggregate.
     */
    where?: VaccinationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vaccinations to fetch.
     */
    orderBy?: VaccinationOrderByWithRelationInput | VaccinationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VaccinationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vaccinations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vaccinations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vaccinations
    **/
    _count?: true | VaccinationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VaccinationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VaccinationMaxAggregateInputType
  }

  export type GetVaccinationAggregateType<T extends VaccinationAggregateArgs> = {
        [P in keyof T & keyof AggregateVaccination]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVaccination[P]>
      : GetScalarType<T[P], AggregateVaccination[P]>
  }




  export type VaccinationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VaccinationWhereInput
    orderBy?: VaccinationOrderByWithAggregationInput | VaccinationOrderByWithAggregationInput[]
    by: VaccinationScalarFieldEnum[] | VaccinationScalarFieldEnum
    having?: VaccinationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VaccinationCountAggregateInputType | true
    _min?: VaccinationMinAggregateInputType
    _max?: VaccinationMaxAggregateInputType
  }

  export type VaccinationGroupByOutputType = {
    id: string
    animalId: string
    vaccineType: string
    brand: string
    batch: string
    vaccinationDate: Date
    expirationDate: Date
    nextDoseDate: Date | null
    photoUrl: string | null
    reaction: string | null
    veterinarianId: string | null
    farmId: string
    createdAt: Date
    updatedAt: Date
    _count: VaccinationCountAggregateOutputType | null
    _min: VaccinationMinAggregateOutputType | null
    _max: VaccinationMaxAggregateOutputType | null
  }

  type GetVaccinationGroupByPayload<T extends VaccinationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VaccinationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VaccinationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VaccinationGroupByOutputType[P]>
            : GetScalarType<T[P], VaccinationGroupByOutputType[P]>
        }
      >
    >


  export type VaccinationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    animalId?: boolean
    vaccineType?: boolean
    brand?: boolean
    batch?: boolean
    vaccinationDate?: boolean
    expirationDate?: boolean
    nextDoseDate?: boolean
    photoUrl?: boolean
    reaction?: boolean
    veterinarianId?: boolean
    farmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["vaccination"]>



  export type VaccinationSelectScalar = {
    id?: boolean
    animalId?: boolean
    vaccineType?: boolean
    brand?: boolean
    batch?: boolean
    vaccinationDate?: boolean
    expirationDate?: boolean
    nextDoseDate?: boolean
    photoUrl?: boolean
    reaction?: boolean
    veterinarianId?: boolean
    farmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VaccinationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "animalId" | "vaccineType" | "brand" | "batch" | "vaccinationDate" | "expirationDate" | "nextDoseDate" | "photoUrl" | "reaction" | "veterinarianId" | "farmId" | "createdAt" | "updatedAt", ExtArgs["result"]["vaccination"]>

  export type $VaccinationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vaccination"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      animalId: string
      vaccineType: string
      brand: string
      batch: string
      vaccinationDate: Date
      expirationDate: Date
      nextDoseDate: Date | null
      photoUrl: string | null
      reaction: string | null
      veterinarianId: string | null
      farmId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["vaccination"]>
    composites: {}
  }

  type VaccinationGetPayload<S extends boolean | null | undefined | VaccinationDefaultArgs> = $Result.GetResult<Prisma.$VaccinationPayload, S>

  type VaccinationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VaccinationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VaccinationCountAggregateInputType | true
    }

  export interface VaccinationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vaccination'], meta: { name: 'Vaccination' } }
    /**
     * Find zero or one Vaccination that matches the filter.
     * @param {VaccinationFindUniqueArgs} args - Arguments to find a Vaccination
     * @example
     * // Get one Vaccination
     * const vaccination = await prisma.vaccination.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VaccinationFindUniqueArgs>(args: SelectSubset<T, VaccinationFindUniqueArgs<ExtArgs>>): Prisma__VaccinationClient<$Result.GetResult<Prisma.$VaccinationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vaccination that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VaccinationFindUniqueOrThrowArgs} args - Arguments to find a Vaccination
     * @example
     * // Get one Vaccination
     * const vaccination = await prisma.vaccination.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VaccinationFindUniqueOrThrowArgs>(args: SelectSubset<T, VaccinationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VaccinationClient<$Result.GetResult<Prisma.$VaccinationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vaccination that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VaccinationFindFirstArgs} args - Arguments to find a Vaccination
     * @example
     * // Get one Vaccination
     * const vaccination = await prisma.vaccination.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VaccinationFindFirstArgs>(args?: SelectSubset<T, VaccinationFindFirstArgs<ExtArgs>>): Prisma__VaccinationClient<$Result.GetResult<Prisma.$VaccinationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vaccination that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VaccinationFindFirstOrThrowArgs} args - Arguments to find a Vaccination
     * @example
     * // Get one Vaccination
     * const vaccination = await prisma.vaccination.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VaccinationFindFirstOrThrowArgs>(args?: SelectSubset<T, VaccinationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VaccinationClient<$Result.GetResult<Prisma.$VaccinationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vaccinations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VaccinationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vaccinations
     * const vaccinations = await prisma.vaccination.findMany()
     * 
     * // Get first 10 Vaccinations
     * const vaccinations = await prisma.vaccination.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vaccinationWithIdOnly = await prisma.vaccination.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VaccinationFindManyArgs>(args?: SelectSubset<T, VaccinationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VaccinationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vaccination.
     * @param {VaccinationCreateArgs} args - Arguments to create a Vaccination.
     * @example
     * // Create one Vaccination
     * const Vaccination = await prisma.vaccination.create({
     *   data: {
     *     // ... data to create a Vaccination
     *   }
     * })
     * 
     */
    create<T extends VaccinationCreateArgs>(args: SelectSubset<T, VaccinationCreateArgs<ExtArgs>>): Prisma__VaccinationClient<$Result.GetResult<Prisma.$VaccinationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vaccinations.
     * @param {VaccinationCreateManyArgs} args - Arguments to create many Vaccinations.
     * @example
     * // Create many Vaccinations
     * const vaccination = await prisma.vaccination.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VaccinationCreateManyArgs>(args?: SelectSubset<T, VaccinationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Vaccination.
     * @param {VaccinationDeleteArgs} args - Arguments to delete one Vaccination.
     * @example
     * // Delete one Vaccination
     * const Vaccination = await prisma.vaccination.delete({
     *   where: {
     *     // ... filter to delete one Vaccination
     *   }
     * })
     * 
     */
    delete<T extends VaccinationDeleteArgs>(args: SelectSubset<T, VaccinationDeleteArgs<ExtArgs>>): Prisma__VaccinationClient<$Result.GetResult<Prisma.$VaccinationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vaccination.
     * @param {VaccinationUpdateArgs} args - Arguments to update one Vaccination.
     * @example
     * // Update one Vaccination
     * const vaccination = await prisma.vaccination.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VaccinationUpdateArgs>(args: SelectSubset<T, VaccinationUpdateArgs<ExtArgs>>): Prisma__VaccinationClient<$Result.GetResult<Prisma.$VaccinationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vaccinations.
     * @param {VaccinationDeleteManyArgs} args - Arguments to filter Vaccinations to delete.
     * @example
     * // Delete a few Vaccinations
     * const { count } = await prisma.vaccination.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VaccinationDeleteManyArgs>(args?: SelectSubset<T, VaccinationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vaccinations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VaccinationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vaccinations
     * const vaccination = await prisma.vaccination.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VaccinationUpdateManyArgs>(args: SelectSubset<T, VaccinationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Vaccination.
     * @param {VaccinationUpsertArgs} args - Arguments to update or create a Vaccination.
     * @example
     * // Update or create a Vaccination
     * const vaccination = await prisma.vaccination.upsert({
     *   create: {
     *     // ... data to create a Vaccination
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vaccination we want to update
     *   }
     * })
     */
    upsert<T extends VaccinationUpsertArgs>(args: SelectSubset<T, VaccinationUpsertArgs<ExtArgs>>): Prisma__VaccinationClient<$Result.GetResult<Prisma.$VaccinationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vaccinations that matches the filter.
     * @param {VaccinationFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const vaccination = await prisma.vaccination.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: VaccinationFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Vaccination.
     * @param {VaccinationAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const vaccination = await prisma.vaccination.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: VaccinationAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Vaccinations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VaccinationCountArgs} args - Arguments to filter Vaccinations to count.
     * @example
     * // Count the number of Vaccinations
     * const count = await prisma.vaccination.count({
     *   where: {
     *     // ... the filter for the Vaccinations we want to count
     *   }
     * })
    **/
    count<T extends VaccinationCountArgs>(
      args?: Subset<T, VaccinationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VaccinationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vaccination.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VaccinationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VaccinationAggregateArgs>(args: Subset<T, VaccinationAggregateArgs>): Prisma.PrismaPromise<GetVaccinationAggregateType<T>>

    /**
     * Group by Vaccination.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VaccinationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VaccinationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VaccinationGroupByArgs['orderBy'] }
        : { orderBy?: VaccinationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VaccinationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVaccinationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vaccination model
   */
  readonly fields: VaccinationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vaccination.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VaccinationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vaccination model
   */
  interface VaccinationFieldRefs {
    readonly id: FieldRef<"Vaccination", 'String'>
    readonly animalId: FieldRef<"Vaccination", 'String'>
    readonly vaccineType: FieldRef<"Vaccination", 'String'>
    readonly brand: FieldRef<"Vaccination", 'String'>
    readonly batch: FieldRef<"Vaccination", 'String'>
    readonly vaccinationDate: FieldRef<"Vaccination", 'DateTime'>
    readonly expirationDate: FieldRef<"Vaccination", 'DateTime'>
    readonly nextDoseDate: FieldRef<"Vaccination", 'DateTime'>
    readonly photoUrl: FieldRef<"Vaccination", 'String'>
    readonly reaction: FieldRef<"Vaccination", 'String'>
    readonly veterinarianId: FieldRef<"Vaccination", 'String'>
    readonly farmId: FieldRef<"Vaccination", 'String'>
    readonly createdAt: FieldRef<"Vaccination", 'DateTime'>
    readonly updatedAt: FieldRef<"Vaccination", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Vaccination findUnique
   */
  export type VaccinationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vaccination
     */
    select?: VaccinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vaccination
     */
    omit?: VaccinationOmit<ExtArgs> | null
    /**
     * Filter, which Vaccination to fetch.
     */
    where: VaccinationWhereUniqueInput
  }

  /**
   * Vaccination findUniqueOrThrow
   */
  export type VaccinationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vaccination
     */
    select?: VaccinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vaccination
     */
    omit?: VaccinationOmit<ExtArgs> | null
    /**
     * Filter, which Vaccination to fetch.
     */
    where: VaccinationWhereUniqueInput
  }

  /**
   * Vaccination findFirst
   */
  export type VaccinationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vaccination
     */
    select?: VaccinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vaccination
     */
    omit?: VaccinationOmit<ExtArgs> | null
    /**
     * Filter, which Vaccination to fetch.
     */
    where?: VaccinationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vaccinations to fetch.
     */
    orderBy?: VaccinationOrderByWithRelationInput | VaccinationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vaccinations.
     */
    cursor?: VaccinationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vaccinations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vaccinations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vaccinations.
     */
    distinct?: VaccinationScalarFieldEnum | VaccinationScalarFieldEnum[]
  }

  /**
   * Vaccination findFirstOrThrow
   */
  export type VaccinationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vaccination
     */
    select?: VaccinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vaccination
     */
    omit?: VaccinationOmit<ExtArgs> | null
    /**
     * Filter, which Vaccination to fetch.
     */
    where?: VaccinationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vaccinations to fetch.
     */
    orderBy?: VaccinationOrderByWithRelationInput | VaccinationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vaccinations.
     */
    cursor?: VaccinationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vaccinations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vaccinations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vaccinations.
     */
    distinct?: VaccinationScalarFieldEnum | VaccinationScalarFieldEnum[]
  }

  /**
   * Vaccination findMany
   */
  export type VaccinationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vaccination
     */
    select?: VaccinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vaccination
     */
    omit?: VaccinationOmit<ExtArgs> | null
    /**
     * Filter, which Vaccinations to fetch.
     */
    where?: VaccinationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vaccinations to fetch.
     */
    orderBy?: VaccinationOrderByWithRelationInput | VaccinationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vaccinations.
     */
    cursor?: VaccinationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vaccinations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vaccinations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vaccinations.
     */
    distinct?: VaccinationScalarFieldEnum | VaccinationScalarFieldEnum[]
  }

  /**
   * Vaccination create
   */
  export type VaccinationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vaccination
     */
    select?: VaccinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vaccination
     */
    omit?: VaccinationOmit<ExtArgs> | null
    /**
     * The data needed to create a Vaccination.
     */
    data: XOR<VaccinationCreateInput, VaccinationUncheckedCreateInput>
  }

  /**
   * Vaccination createMany
   */
  export type VaccinationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vaccinations.
     */
    data: VaccinationCreateManyInput | VaccinationCreateManyInput[]
  }

  /**
   * Vaccination update
   */
  export type VaccinationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vaccination
     */
    select?: VaccinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vaccination
     */
    omit?: VaccinationOmit<ExtArgs> | null
    /**
     * The data needed to update a Vaccination.
     */
    data: XOR<VaccinationUpdateInput, VaccinationUncheckedUpdateInput>
    /**
     * Choose, which Vaccination to update.
     */
    where: VaccinationWhereUniqueInput
  }

  /**
   * Vaccination updateMany
   */
  export type VaccinationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vaccinations.
     */
    data: XOR<VaccinationUpdateManyMutationInput, VaccinationUncheckedUpdateManyInput>
    /**
     * Filter which Vaccinations to update
     */
    where?: VaccinationWhereInput
    /**
     * Limit how many Vaccinations to update.
     */
    limit?: number
  }

  /**
   * Vaccination upsert
   */
  export type VaccinationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vaccination
     */
    select?: VaccinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vaccination
     */
    omit?: VaccinationOmit<ExtArgs> | null
    /**
     * The filter to search for the Vaccination to update in case it exists.
     */
    where: VaccinationWhereUniqueInput
    /**
     * In case the Vaccination found by the `where` argument doesn't exist, create a new Vaccination with this data.
     */
    create: XOR<VaccinationCreateInput, VaccinationUncheckedCreateInput>
    /**
     * In case the Vaccination was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VaccinationUpdateInput, VaccinationUncheckedUpdateInput>
  }

  /**
   * Vaccination delete
   */
  export type VaccinationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vaccination
     */
    select?: VaccinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vaccination
     */
    omit?: VaccinationOmit<ExtArgs> | null
    /**
     * Filter which Vaccination to delete.
     */
    where: VaccinationWhereUniqueInput
  }

  /**
   * Vaccination deleteMany
   */
  export type VaccinationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vaccinations to delete
     */
    where?: VaccinationWhereInput
    /**
     * Limit how many Vaccinations to delete.
     */
    limit?: number
  }

  /**
   * Vaccination findRaw
   */
  export type VaccinationFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Vaccination aggregateRaw
   */
  export type VaccinationAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Vaccination without action
   */
  export type VaccinationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vaccination
     */
    select?: VaccinationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vaccination
     */
    omit?: VaccinationOmit<ExtArgs> | null
  }


  /**
   * Model Management
   */

  export type AggregateManagement = {
    _count: ManagementCountAggregateOutputType | null
    _avg: ManagementAvgAggregateOutputType | null
    _sum: ManagementSumAggregateOutputType | null
    _min: ManagementMinAggregateOutputType | null
    _max: ManagementMaxAggregateOutputType | null
  }

  export type ManagementAvgAggregateOutputType = {
    batchTotal: number | null
  }

  export type ManagementSumAggregateOutputType = {
    batchTotal: number | null
  }

  export type ManagementMinAggregateOutputType = {
    id: string | null
    animalId: string | null
    originPasture: string | null
    destinationPasture: string | null
    movementDate: Date | null
    reason: string | null
    employee: string | null
    batchId: string | null
    batchTotal: number | null
    farmId: string | null
    createdAt: Date | null
  }

  export type ManagementMaxAggregateOutputType = {
    id: string | null
    animalId: string | null
    originPasture: string | null
    destinationPasture: string | null
    movementDate: Date | null
    reason: string | null
    employee: string | null
    batchId: string | null
    batchTotal: number | null
    farmId: string | null
    createdAt: Date | null
  }

  export type ManagementCountAggregateOutputType = {
    id: number
    animalId: number
    originPasture: number
    destinationPasture: number
    movementDate: number
    reason: number
    employee: number
    batchId: number
    batchTotal: number
    farmId: number
    createdAt: number
    _all: number
  }


  export type ManagementAvgAggregateInputType = {
    batchTotal?: true
  }

  export type ManagementSumAggregateInputType = {
    batchTotal?: true
  }

  export type ManagementMinAggregateInputType = {
    id?: true
    animalId?: true
    originPasture?: true
    destinationPasture?: true
    movementDate?: true
    reason?: true
    employee?: true
    batchId?: true
    batchTotal?: true
    farmId?: true
    createdAt?: true
  }

  export type ManagementMaxAggregateInputType = {
    id?: true
    animalId?: true
    originPasture?: true
    destinationPasture?: true
    movementDate?: true
    reason?: true
    employee?: true
    batchId?: true
    batchTotal?: true
    farmId?: true
    createdAt?: true
  }

  export type ManagementCountAggregateInputType = {
    id?: true
    animalId?: true
    originPasture?: true
    destinationPasture?: true
    movementDate?: true
    reason?: true
    employee?: true
    batchId?: true
    batchTotal?: true
    farmId?: true
    createdAt?: true
    _all?: true
  }

  export type ManagementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Management to aggregate.
     */
    where?: ManagementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Managements to fetch.
     */
    orderBy?: ManagementOrderByWithRelationInput | ManagementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ManagementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Managements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Managements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Managements
    **/
    _count?: true | ManagementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ManagementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ManagementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ManagementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ManagementMaxAggregateInputType
  }

  export type GetManagementAggregateType<T extends ManagementAggregateArgs> = {
        [P in keyof T & keyof AggregateManagement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateManagement[P]>
      : GetScalarType<T[P], AggregateManagement[P]>
  }




  export type ManagementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ManagementWhereInput
    orderBy?: ManagementOrderByWithAggregationInput | ManagementOrderByWithAggregationInput[]
    by: ManagementScalarFieldEnum[] | ManagementScalarFieldEnum
    having?: ManagementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ManagementCountAggregateInputType | true
    _avg?: ManagementAvgAggregateInputType
    _sum?: ManagementSumAggregateInputType
    _min?: ManagementMinAggregateInputType
    _max?: ManagementMaxAggregateInputType
  }

  export type ManagementGroupByOutputType = {
    id: string
    animalId: string
    originPasture: string
    destinationPasture: string
    movementDate: Date
    reason: string
    employee: string
    batchId: string | null
    batchTotal: number | null
    farmId: string
    createdAt: Date
    _count: ManagementCountAggregateOutputType | null
    _avg: ManagementAvgAggregateOutputType | null
    _sum: ManagementSumAggregateOutputType | null
    _min: ManagementMinAggregateOutputType | null
    _max: ManagementMaxAggregateOutputType | null
  }

  type GetManagementGroupByPayload<T extends ManagementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ManagementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ManagementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ManagementGroupByOutputType[P]>
            : GetScalarType<T[P], ManagementGroupByOutputType[P]>
        }
      >
    >


  export type ManagementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    animalId?: boolean
    originPasture?: boolean
    destinationPasture?: boolean
    movementDate?: boolean
    reason?: boolean
    employee?: boolean
    batchId?: boolean
    batchTotal?: boolean
    farmId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["management"]>



  export type ManagementSelectScalar = {
    id?: boolean
    animalId?: boolean
    originPasture?: boolean
    destinationPasture?: boolean
    movementDate?: boolean
    reason?: boolean
    employee?: boolean
    batchId?: boolean
    batchTotal?: boolean
    farmId?: boolean
    createdAt?: boolean
  }

  export type ManagementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "animalId" | "originPasture" | "destinationPasture" | "movementDate" | "reason" | "employee" | "batchId" | "batchTotal" | "farmId" | "createdAt", ExtArgs["result"]["management"]>

  export type $ManagementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Management"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      animalId: string
      originPasture: string
      destinationPasture: string
      movementDate: Date
      reason: string
      employee: string
      batchId: string | null
      batchTotal: number | null
      farmId: string
      createdAt: Date
    }, ExtArgs["result"]["management"]>
    composites: {}
  }

  type ManagementGetPayload<S extends boolean | null | undefined | ManagementDefaultArgs> = $Result.GetResult<Prisma.$ManagementPayload, S>

  type ManagementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ManagementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ManagementCountAggregateInputType | true
    }

  export interface ManagementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Management'], meta: { name: 'Management' } }
    /**
     * Find zero or one Management that matches the filter.
     * @param {ManagementFindUniqueArgs} args - Arguments to find a Management
     * @example
     * // Get one Management
     * const management = await prisma.management.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ManagementFindUniqueArgs>(args: SelectSubset<T, ManagementFindUniqueArgs<ExtArgs>>): Prisma__ManagementClient<$Result.GetResult<Prisma.$ManagementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Management that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ManagementFindUniqueOrThrowArgs} args - Arguments to find a Management
     * @example
     * // Get one Management
     * const management = await prisma.management.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ManagementFindUniqueOrThrowArgs>(args: SelectSubset<T, ManagementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ManagementClient<$Result.GetResult<Prisma.$ManagementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Management that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagementFindFirstArgs} args - Arguments to find a Management
     * @example
     * // Get one Management
     * const management = await prisma.management.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ManagementFindFirstArgs>(args?: SelectSubset<T, ManagementFindFirstArgs<ExtArgs>>): Prisma__ManagementClient<$Result.GetResult<Prisma.$ManagementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Management that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagementFindFirstOrThrowArgs} args - Arguments to find a Management
     * @example
     * // Get one Management
     * const management = await prisma.management.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ManagementFindFirstOrThrowArgs>(args?: SelectSubset<T, ManagementFindFirstOrThrowArgs<ExtArgs>>): Prisma__ManagementClient<$Result.GetResult<Prisma.$ManagementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Managements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Managements
     * const managements = await prisma.management.findMany()
     * 
     * // Get first 10 Managements
     * const managements = await prisma.management.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const managementWithIdOnly = await prisma.management.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ManagementFindManyArgs>(args?: SelectSubset<T, ManagementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ManagementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Management.
     * @param {ManagementCreateArgs} args - Arguments to create a Management.
     * @example
     * // Create one Management
     * const Management = await prisma.management.create({
     *   data: {
     *     // ... data to create a Management
     *   }
     * })
     * 
     */
    create<T extends ManagementCreateArgs>(args: SelectSubset<T, ManagementCreateArgs<ExtArgs>>): Prisma__ManagementClient<$Result.GetResult<Prisma.$ManagementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Managements.
     * @param {ManagementCreateManyArgs} args - Arguments to create many Managements.
     * @example
     * // Create many Managements
     * const management = await prisma.management.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ManagementCreateManyArgs>(args?: SelectSubset<T, ManagementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Management.
     * @param {ManagementDeleteArgs} args - Arguments to delete one Management.
     * @example
     * // Delete one Management
     * const Management = await prisma.management.delete({
     *   where: {
     *     // ... filter to delete one Management
     *   }
     * })
     * 
     */
    delete<T extends ManagementDeleteArgs>(args: SelectSubset<T, ManagementDeleteArgs<ExtArgs>>): Prisma__ManagementClient<$Result.GetResult<Prisma.$ManagementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Management.
     * @param {ManagementUpdateArgs} args - Arguments to update one Management.
     * @example
     * // Update one Management
     * const management = await prisma.management.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ManagementUpdateArgs>(args: SelectSubset<T, ManagementUpdateArgs<ExtArgs>>): Prisma__ManagementClient<$Result.GetResult<Prisma.$ManagementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Managements.
     * @param {ManagementDeleteManyArgs} args - Arguments to filter Managements to delete.
     * @example
     * // Delete a few Managements
     * const { count } = await prisma.management.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ManagementDeleteManyArgs>(args?: SelectSubset<T, ManagementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Managements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Managements
     * const management = await prisma.management.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ManagementUpdateManyArgs>(args: SelectSubset<T, ManagementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Management.
     * @param {ManagementUpsertArgs} args - Arguments to update or create a Management.
     * @example
     * // Update or create a Management
     * const management = await prisma.management.upsert({
     *   create: {
     *     // ... data to create a Management
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Management we want to update
     *   }
     * })
     */
    upsert<T extends ManagementUpsertArgs>(args: SelectSubset<T, ManagementUpsertArgs<ExtArgs>>): Prisma__ManagementClient<$Result.GetResult<Prisma.$ManagementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Managements that matches the filter.
     * @param {ManagementFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const management = await prisma.management.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ManagementFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Management.
     * @param {ManagementAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const management = await prisma.management.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ManagementAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Managements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagementCountArgs} args - Arguments to filter Managements to count.
     * @example
     * // Count the number of Managements
     * const count = await prisma.management.count({
     *   where: {
     *     // ... the filter for the Managements we want to count
     *   }
     * })
    **/
    count<T extends ManagementCountArgs>(
      args?: Subset<T, ManagementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ManagementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Management.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ManagementAggregateArgs>(args: Subset<T, ManagementAggregateArgs>): Prisma.PrismaPromise<GetManagementAggregateType<T>>

    /**
     * Group by Management.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ManagementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ManagementGroupByArgs['orderBy'] }
        : { orderBy?: ManagementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ManagementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetManagementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Management model
   */
  readonly fields: ManagementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Management.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ManagementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Management model
   */
  interface ManagementFieldRefs {
    readonly id: FieldRef<"Management", 'String'>
    readonly animalId: FieldRef<"Management", 'String'>
    readonly originPasture: FieldRef<"Management", 'String'>
    readonly destinationPasture: FieldRef<"Management", 'String'>
    readonly movementDate: FieldRef<"Management", 'DateTime'>
    readonly reason: FieldRef<"Management", 'String'>
    readonly employee: FieldRef<"Management", 'String'>
    readonly batchId: FieldRef<"Management", 'String'>
    readonly batchTotal: FieldRef<"Management", 'Int'>
    readonly farmId: FieldRef<"Management", 'String'>
    readonly createdAt: FieldRef<"Management", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Management findUnique
   */
  export type ManagementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Management
     */
    select?: ManagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Management
     */
    omit?: ManagementOmit<ExtArgs> | null
    /**
     * Filter, which Management to fetch.
     */
    where: ManagementWhereUniqueInput
  }

  /**
   * Management findUniqueOrThrow
   */
  export type ManagementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Management
     */
    select?: ManagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Management
     */
    omit?: ManagementOmit<ExtArgs> | null
    /**
     * Filter, which Management to fetch.
     */
    where: ManagementWhereUniqueInput
  }

  /**
   * Management findFirst
   */
  export type ManagementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Management
     */
    select?: ManagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Management
     */
    omit?: ManagementOmit<ExtArgs> | null
    /**
     * Filter, which Management to fetch.
     */
    where?: ManagementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Managements to fetch.
     */
    orderBy?: ManagementOrderByWithRelationInput | ManagementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Managements.
     */
    cursor?: ManagementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Managements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Managements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Managements.
     */
    distinct?: ManagementScalarFieldEnum | ManagementScalarFieldEnum[]
  }

  /**
   * Management findFirstOrThrow
   */
  export type ManagementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Management
     */
    select?: ManagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Management
     */
    omit?: ManagementOmit<ExtArgs> | null
    /**
     * Filter, which Management to fetch.
     */
    where?: ManagementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Managements to fetch.
     */
    orderBy?: ManagementOrderByWithRelationInput | ManagementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Managements.
     */
    cursor?: ManagementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Managements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Managements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Managements.
     */
    distinct?: ManagementScalarFieldEnum | ManagementScalarFieldEnum[]
  }

  /**
   * Management findMany
   */
  export type ManagementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Management
     */
    select?: ManagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Management
     */
    omit?: ManagementOmit<ExtArgs> | null
    /**
     * Filter, which Managements to fetch.
     */
    where?: ManagementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Managements to fetch.
     */
    orderBy?: ManagementOrderByWithRelationInput | ManagementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Managements.
     */
    cursor?: ManagementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Managements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Managements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Managements.
     */
    distinct?: ManagementScalarFieldEnum | ManagementScalarFieldEnum[]
  }

  /**
   * Management create
   */
  export type ManagementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Management
     */
    select?: ManagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Management
     */
    omit?: ManagementOmit<ExtArgs> | null
    /**
     * The data needed to create a Management.
     */
    data: XOR<ManagementCreateInput, ManagementUncheckedCreateInput>
  }

  /**
   * Management createMany
   */
  export type ManagementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Managements.
     */
    data: ManagementCreateManyInput | ManagementCreateManyInput[]
  }

  /**
   * Management update
   */
  export type ManagementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Management
     */
    select?: ManagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Management
     */
    omit?: ManagementOmit<ExtArgs> | null
    /**
     * The data needed to update a Management.
     */
    data: XOR<ManagementUpdateInput, ManagementUncheckedUpdateInput>
    /**
     * Choose, which Management to update.
     */
    where: ManagementWhereUniqueInput
  }

  /**
   * Management updateMany
   */
  export type ManagementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Managements.
     */
    data: XOR<ManagementUpdateManyMutationInput, ManagementUncheckedUpdateManyInput>
    /**
     * Filter which Managements to update
     */
    where?: ManagementWhereInput
    /**
     * Limit how many Managements to update.
     */
    limit?: number
  }

  /**
   * Management upsert
   */
  export type ManagementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Management
     */
    select?: ManagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Management
     */
    omit?: ManagementOmit<ExtArgs> | null
    /**
     * The filter to search for the Management to update in case it exists.
     */
    where: ManagementWhereUniqueInput
    /**
     * In case the Management found by the `where` argument doesn't exist, create a new Management with this data.
     */
    create: XOR<ManagementCreateInput, ManagementUncheckedCreateInput>
    /**
     * In case the Management was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ManagementUpdateInput, ManagementUncheckedUpdateInput>
  }

  /**
   * Management delete
   */
  export type ManagementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Management
     */
    select?: ManagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Management
     */
    omit?: ManagementOmit<ExtArgs> | null
    /**
     * Filter which Management to delete.
     */
    where: ManagementWhereUniqueInput
  }

  /**
   * Management deleteMany
   */
  export type ManagementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Managements to delete
     */
    where?: ManagementWhereInput
    /**
     * Limit how many Managements to delete.
     */
    limit?: number
  }

  /**
   * Management findRaw
   */
  export type ManagementFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Management aggregateRaw
   */
  export type ManagementAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Management without action
   */
  export type ManagementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Management
     */
    select?: ManagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Management
     */
    omit?: ManagementOmit<ExtArgs> | null
  }


  /**
   * Model Mortality
   */

  export type AggregateMortality = {
    _count: MortalityCountAggregateOutputType | null
    _min: MortalityMinAggregateOutputType | null
    _max: MortalityMaxAggregateOutputType | null
  }

  export type MortalityMinAggregateOutputType = {
    id: string | null
    animalId: string | null
    deathDate: Date | null
    deathTime: string | null
    deathLocation: string | null
    causeOfDeath: string | null
    severity: string | null
    necropsy: boolean | null
    disposal: string | null
    origin: string | null
    birthId: string | null
    notes: string | null
    farmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MortalityMaxAggregateOutputType = {
    id: string | null
    animalId: string | null
    deathDate: Date | null
    deathTime: string | null
    deathLocation: string | null
    causeOfDeath: string | null
    severity: string | null
    necropsy: boolean | null
    disposal: string | null
    origin: string | null
    birthId: string | null
    notes: string | null
    farmId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MortalityCountAggregateOutputType = {
    id: number
    animalId: number
    deathDate: number
    deathTime: number
    deathLocation: number
    causeOfDeath: number
    severity: number
    necropsy: number
    disposal: number
    photos: number
    origin: number
    birthId: number
    notes: number
    farmId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MortalityMinAggregateInputType = {
    id?: true
    animalId?: true
    deathDate?: true
    deathTime?: true
    deathLocation?: true
    causeOfDeath?: true
    severity?: true
    necropsy?: true
    disposal?: true
    origin?: true
    birthId?: true
    notes?: true
    farmId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MortalityMaxAggregateInputType = {
    id?: true
    animalId?: true
    deathDate?: true
    deathTime?: true
    deathLocation?: true
    causeOfDeath?: true
    severity?: true
    necropsy?: true
    disposal?: true
    origin?: true
    birthId?: true
    notes?: true
    farmId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MortalityCountAggregateInputType = {
    id?: true
    animalId?: true
    deathDate?: true
    deathTime?: true
    deathLocation?: true
    causeOfDeath?: true
    severity?: true
    necropsy?: true
    disposal?: true
    photos?: true
    origin?: true
    birthId?: true
    notes?: true
    farmId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MortalityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mortality to aggregate.
     */
    where?: MortalityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mortalities to fetch.
     */
    orderBy?: MortalityOrderByWithRelationInput | MortalityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MortalityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mortalities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mortalities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Mortalities
    **/
    _count?: true | MortalityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MortalityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MortalityMaxAggregateInputType
  }

  export type GetMortalityAggregateType<T extends MortalityAggregateArgs> = {
        [P in keyof T & keyof AggregateMortality]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMortality[P]>
      : GetScalarType<T[P], AggregateMortality[P]>
  }




  export type MortalityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MortalityWhereInput
    orderBy?: MortalityOrderByWithAggregationInput | MortalityOrderByWithAggregationInput[]
    by: MortalityScalarFieldEnum[] | MortalityScalarFieldEnum
    having?: MortalityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MortalityCountAggregateInputType | true
    _min?: MortalityMinAggregateInputType
    _max?: MortalityMaxAggregateInputType
  }

  export type MortalityGroupByOutputType = {
    id: string
    animalId: string
    deathDate: Date
    deathTime: string | null
    deathLocation: string
    causeOfDeath: string
    severity: string | null
    necropsy: boolean
    disposal: string | null
    photos: string[]
    origin: string | null
    birthId: string | null
    notes: string | null
    farmId: string
    createdAt: Date
    updatedAt: Date
    _count: MortalityCountAggregateOutputType | null
    _min: MortalityMinAggregateOutputType | null
    _max: MortalityMaxAggregateOutputType | null
  }

  type GetMortalityGroupByPayload<T extends MortalityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MortalityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MortalityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MortalityGroupByOutputType[P]>
            : GetScalarType<T[P], MortalityGroupByOutputType[P]>
        }
      >
    >


  export type MortalitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    animalId?: boolean
    deathDate?: boolean
    deathTime?: boolean
    deathLocation?: boolean
    causeOfDeath?: boolean
    severity?: boolean
    necropsy?: boolean
    disposal?: boolean
    photos?: boolean
    origin?: boolean
    birthId?: boolean
    notes?: boolean
    farmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mortality"]>



  export type MortalitySelectScalar = {
    id?: boolean
    animalId?: boolean
    deathDate?: boolean
    deathTime?: boolean
    deathLocation?: boolean
    causeOfDeath?: boolean
    severity?: boolean
    necropsy?: boolean
    disposal?: boolean
    photos?: boolean
    origin?: boolean
    birthId?: boolean
    notes?: boolean
    farmId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MortalityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "animalId" | "deathDate" | "deathTime" | "deathLocation" | "causeOfDeath" | "severity" | "necropsy" | "disposal" | "photos" | "origin" | "birthId" | "notes" | "farmId" | "createdAt" | "updatedAt", ExtArgs["result"]["mortality"]>

  export type $MortalityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Mortality"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      animalId: string
      deathDate: Date
      deathTime: string | null
      deathLocation: string
      causeOfDeath: string
      severity: string | null
      necropsy: boolean
      disposal: string | null
      photos: string[]
      origin: string | null
      birthId: string | null
      notes: string | null
      farmId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["mortality"]>
    composites: {}
  }

  type MortalityGetPayload<S extends boolean | null | undefined | MortalityDefaultArgs> = $Result.GetResult<Prisma.$MortalityPayload, S>

  type MortalityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MortalityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MortalityCountAggregateInputType | true
    }

  export interface MortalityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Mortality'], meta: { name: 'Mortality' } }
    /**
     * Find zero or one Mortality that matches the filter.
     * @param {MortalityFindUniqueArgs} args - Arguments to find a Mortality
     * @example
     * // Get one Mortality
     * const mortality = await prisma.mortality.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MortalityFindUniqueArgs>(args: SelectSubset<T, MortalityFindUniqueArgs<ExtArgs>>): Prisma__MortalityClient<$Result.GetResult<Prisma.$MortalityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mortality that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MortalityFindUniqueOrThrowArgs} args - Arguments to find a Mortality
     * @example
     * // Get one Mortality
     * const mortality = await prisma.mortality.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MortalityFindUniqueOrThrowArgs>(args: SelectSubset<T, MortalityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MortalityClient<$Result.GetResult<Prisma.$MortalityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mortality that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MortalityFindFirstArgs} args - Arguments to find a Mortality
     * @example
     * // Get one Mortality
     * const mortality = await prisma.mortality.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MortalityFindFirstArgs>(args?: SelectSubset<T, MortalityFindFirstArgs<ExtArgs>>): Prisma__MortalityClient<$Result.GetResult<Prisma.$MortalityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mortality that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MortalityFindFirstOrThrowArgs} args - Arguments to find a Mortality
     * @example
     * // Get one Mortality
     * const mortality = await prisma.mortality.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MortalityFindFirstOrThrowArgs>(args?: SelectSubset<T, MortalityFindFirstOrThrowArgs<ExtArgs>>): Prisma__MortalityClient<$Result.GetResult<Prisma.$MortalityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Mortalities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MortalityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mortalities
     * const mortalities = await prisma.mortality.findMany()
     * 
     * // Get first 10 Mortalities
     * const mortalities = await prisma.mortality.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mortalityWithIdOnly = await prisma.mortality.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MortalityFindManyArgs>(args?: SelectSubset<T, MortalityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MortalityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mortality.
     * @param {MortalityCreateArgs} args - Arguments to create a Mortality.
     * @example
     * // Create one Mortality
     * const Mortality = await prisma.mortality.create({
     *   data: {
     *     // ... data to create a Mortality
     *   }
     * })
     * 
     */
    create<T extends MortalityCreateArgs>(args: SelectSubset<T, MortalityCreateArgs<ExtArgs>>): Prisma__MortalityClient<$Result.GetResult<Prisma.$MortalityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Mortalities.
     * @param {MortalityCreateManyArgs} args - Arguments to create many Mortalities.
     * @example
     * // Create many Mortalities
     * const mortality = await prisma.mortality.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MortalityCreateManyArgs>(args?: SelectSubset<T, MortalityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Mortality.
     * @param {MortalityDeleteArgs} args - Arguments to delete one Mortality.
     * @example
     * // Delete one Mortality
     * const Mortality = await prisma.mortality.delete({
     *   where: {
     *     // ... filter to delete one Mortality
     *   }
     * })
     * 
     */
    delete<T extends MortalityDeleteArgs>(args: SelectSubset<T, MortalityDeleteArgs<ExtArgs>>): Prisma__MortalityClient<$Result.GetResult<Prisma.$MortalityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mortality.
     * @param {MortalityUpdateArgs} args - Arguments to update one Mortality.
     * @example
     * // Update one Mortality
     * const mortality = await prisma.mortality.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MortalityUpdateArgs>(args: SelectSubset<T, MortalityUpdateArgs<ExtArgs>>): Prisma__MortalityClient<$Result.GetResult<Prisma.$MortalityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Mortalities.
     * @param {MortalityDeleteManyArgs} args - Arguments to filter Mortalities to delete.
     * @example
     * // Delete a few Mortalities
     * const { count } = await prisma.mortality.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MortalityDeleteManyArgs>(args?: SelectSubset<T, MortalityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mortalities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MortalityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mortalities
     * const mortality = await prisma.mortality.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MortalityUpdateManyArgs>(args: SelectSubset<T, MortalityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Mortality.
     * @param {MortalityUpsertArgs} args - Arguments to update or create a Mortality.
     * @example
     * // Update or create a Mortality
     * const mortality = await prisma.mortality.upsert({
     *   create: {
     *     // ... data to create a Mortality
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mortality we want to update
     *   }
     * })
     */
    upsert<T extends MortalityUpsertArgs>(args: SelectSubset<T, MortalityUpsertArgs<ExtArgs>>): Prisma__MortalityClient<$Result.GetResult<Prisma.$MortalityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Mortalities that matches the filter.
     * @param {MortalityFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const mortality = await prisma.mortality.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: MortalityFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Mortality.
     * @param {MortalityAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const mortality = await prisma.mortality.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: MortalityAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Mortalities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MortalityCountArgs} args - Arguments to filter Mortalities to count.
     * @example
     * // Count the number of Mortalities
     * const count = await prisma.mortality.count({
     *   where: {
     *     // ... the filter for the Mortalities we want to count
     *   }
     * })
    **/
    count<T extends MortalityCountArgs>(
      args?: Subset<T, MortalityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MortalityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mortality.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MortalityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MortalityAggregateArgs>(args: Subset<T, MortalityAggregateArgs>): Prisma.PrismaPromise<GetMortalityAggregateType<T>>

    /**
     * Group by Mortality.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MortalityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MortalityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MortalityGroupByArgs['orderBy'] }
        : { orderBy?: MortalityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MortalityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMortalityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Mortality model
   */
  readonly fields: MortalityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Mortality.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MortalityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Mortality model
   */
  interface MortalityFieldRefs {
    readonly id: FieldRef<"Mortality", 'String'>
    readonly animalId: FieldRef<"Mortality", 'String'>
    readonly deathDate: FieldRef<"Mortality", 'DateTime'>
    readonly deathTime: FieldRef<"Mortality", 'String'>
    readonly deathLocation: FieldRef<"Mortality", 'String'>
    readonly causeOfDeath: FieldRef<"Mortality", 'String'>
    readonly severity: FieldRef<"Mortality", 'String'>
    readonly necropsy: FieldRef<"Mortality", 'Boolean'>
    readonly disposal: FieldRef<"Mortality", 'String'>
    readonly photos: FieldRef<"Mortality", 'String[]'>
    readonly origin: FieldRef<"Mortality", 'String'>
    readonly birthId: FieldRef<"Mortality", 'String'>
    readonly notes: FieldRef<"Mortality", 'String'>
    readonly farmId: FieldRef<"Mortality", 'String'>
    readonly createdAt: FieldRef<"Mortality", 'DateTime'>
    readonly updatedAt: FieldRef<"Mortality", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Mortality findUnique
   */
  export type MortalityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mortality
     */
    select?: MortalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mortality
     */
    omit?: MortalityOmit<ExtArgs> | null
    /**
     * Filter, which Mortality to fetch.
     */
    where: MortalityWhereUniqueInput
  }

  /**
   * Mortality findUniqueOrThrow
   */
  export type MortalityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mortality
     */
    select?: MortalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mortality
     */
    omit?: MortalityOmit<ExtArgs> | null
    /**
     * Filter, which Mortality to fetch.
     */
    where: MortalityWhereUniqueInput
  }

  /**
   * Mortality findFirst
   */
  export type MortalityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mortality
     */
    select?: MortalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mortality
     */
    omit?: MortalityOmit<ExtArgs> | null
    /**
     * Filter, which Mortality to fetch.
     */
    where?: MortalityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mortalities to fetch.
     */
    orderBy?: MortalityOrderByWithRelationInput | MortalityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mortalities.
     */
    cursor?: MortalityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mortalities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mortalities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mortalities.
     */
    distinct?: MortalityScalarFieldEnum | MortalityScalarFieldEnum[]
  }

  /**
   * Mortality findFirstOrThrow
   */
  export type MortalityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mortality
     */
    select?: MortalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mortality
     */
    omit?: MortalityOmit<ExtArgs> | null
    /**
     * Filter, which Mortality to fetch.
     */
    where?: MortalityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mortalities to fetch.
     */
    orderBy?: MortalityOrderByWithRelationInput | MortalityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mortalities.
     */
    cursor?: MortalityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mortalities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mortalities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mortalities.
     */
    distinct?: MortalityScalarFieldEnum | MortalityScalarFieldEnum[]
  }

  /**
   * Mortality findMany
   */
  export type MortalityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mortality
     */
    select?: MortalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mortality
     */
    omit?: MortalityOmit<ExtArgs> | null
    /**
     * Filter, which Mortalities to fetch.
     */
    where?: MortalityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mortalities to fetch.
     */
    orderBy?: MortalityOrderByWithRelationInput | MortalityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Mortalities.
     */
    cursor?: MortalityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mortalities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mortalities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mortalities.
     */
    distinct?: MortalityScalarFieldEnum | MortalityScalarFieldEnum[]
  }

  /**
   * Mortality create
   */
  export type MortalityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mortality
     */
    select?: MortalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mortality
     */
    omit?: MortalityOmit<ExtArgs> | null
    /**
     * The data needed to create a Mortality.
     */
    data: XOR<MortalityCreateInput, MortalityUncheckedCreateInput>
  }

  /**
   * Mortality createMany
   */
  export type MortalityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Mortalities.
     */
    data: MortalityCreateManyInput | MortalityCreateManyInput[]
  }

  /**
   * Mortality update
   */
  export type MortalityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mortality
     */
    select?: MortalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mortality
     */
    omit?: MortalityOmit<ExtArgs> | null
    /**
     * The data needed to update a Mortality.
     */
    data: XOR<MortalityUpdateInput, MortalityUncheckedUpdateInput>
    /**
     * Choose, which Mortality to update.
     */
    where: MortalityWhereUniqueInput
  }

  /**
   * Mortality updateMany
   */
  export type MortalityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Mortalities.
     */
    data: XOR<MortalityUpdateManyMutationInput, MortalityUncheckedUpdateManyInput>
    /**
     * Filter which Mortalities to update
     */
    where?: MortalityWhereInput
    /**
     * Limit how many Mortalities to update.
     */
    limit?: number
  }

  /**
   * Mortality upsert
   */
  export type MortalityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mortality
     */
    select?: MortalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mortality
     */
    omit?: MortalityOmit<ExtArgs> | null
    /**
     * The filter to search for the Mortality to update in case it exists.
     */
    where: MortalityWhereUniqueInput
    /**
     * In case the Mortality found by the `where` argument doesn't exist, create a new Mortality with this data.
     */
    create: XOR<MortalityCreateInput, MortalityUncheckedCreateInput>
    /**
     * In case the Mortality was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MortalityUpdateInput, MortalityUncheckedUpdateInput>
  }

  /**
   * Mortality delete
   */
  export type MortalityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mortality
     */
    select?: MortalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mortality
     */
    omit?: MortalityOmit<ExtArgs> | null
    /**
     * Filter which Mortality to delete.
     */
    where: MortalityWhereUniqueInput
  }

  /**
   * Mortality deleteMany
   */
  export type MortalityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mortalities to delete
     */
    where?: MortalityWhereInput
    /**
     * Limit how many Mortalities to delete.
     */
    limit?: number
  }

  /**
   * Mortality findRaw
   */
  export type MortalityFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Mortality aggregateRaw
   */
  export type MortalityAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Mortality without action
   */
  export type MortalityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mortality
     */
    select?: MortalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mortality
     */
    omit?: MortalityOmit<ExtArgs> | null
  }


  /**
   * Model PasswordResetToken
   */

  export type AggregatePasswordResetToken = {
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  export type PasswordResetTokenMinAggregateOutputType = {
    id: string | null
    userId: string | null
    code: string | null
    expiresAt: Date | null
    used: boolean | null
    farmId: string | null
    createdAt: Date | null
  }

  export type PasswordResetTokenMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    code: string | null
    expiresAt: Date | null
    used: boolean | null
    farmId: string | null
    createdAt: Date | null
  }

  export type PasswordResetTokenCountAggregateOutputType = {
    id: number
    userId: number
    code: number
    expiresAt: number
    used: number
    farmId: number
    createdAt: number
    _all: number
  }


  export type PasswordResetTokenMinAggregateInputType = {
    id?: true
    userId?: true
    code?: true
    expiresAt?: true
    used?: true
    farmId?: true
    createdAt?: true
  }

  export type PasswordResetTokenMaxAggregateInputType = {
    id?: true
    userId?: true
    code?: true
    expiresAt?: true
    used?: true
    farmId?: true
    createdAt?: true
  }

  export type PasswordResetTokenCountAggregateInputType = {
    id?: true
    userId?: true
    code?: true
    expiresAt?: true
    used?: true
    farmId?: true
    createdAt?: true
    _all?: true
  }

  export type PasswordResetTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetToken to aggregate.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordResetTokens
    **/
    _count?: true | PasswordResetTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordResetTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type GetPasswordResetTokenAggregateType<T extends PasswordResetTokenAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordResetToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordResetToken[P]>
      : GetScalarType<T[P], AggregatePasswordResetToken[P]>
  }




  export type PasswordResetTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetTokenWhereInput
    orderBy?: PasswordResetTokenOrderByWithAggregationInput | PasswordResetTokenOrderByWithAggregationInput[]
    by: PasswordResetTokenScalarFieldEnum[] | PasswordResetTokenScalarFieldEnum
    having?: PasswordResetTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordResetTokenCountAggregateInputType | true
    _min?: PasswordResetTokenMinAggregateInputType
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type PasswordResetTokenGroupByOutputType = {
    id: string
    userId: string
    code: string
    expiresAt: Date
    used: boolean
    farmId: string
    createdAt: Date
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  type GetPasswordResetTokenGroupByPayload<T extends PasswordResetTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordResetTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordResetTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
        }
      >
    >


  export type PasswordResetTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    code?: boolean
    expiresAt?: boolean
    used?: boolean
    farmId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["passwordResetToken"]>



  export type PasswordResetTokenSelectScalar = {
    id?: boolean
    userId?: boolean
    code?: boolean
    expiresAt?: boolean
    used?: boolean
    farmId?: boolean
    createdAt?: boolean
  }

  export type PasswordResetTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "code" | "expiresAt" | "used" | "farmId" | "createdAt", ExtArgs["result"]["passwordResetToken"]>

  export type $PasswordResetTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordResetToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      code: string
      expiresAt: Date
      used: boolean
      farmId: string
      createdAt: Date
    }, ExtArgs["result"]["passwordResetToken"]>
    composites: {}
  }

  type PasswordResetTokenGetPayload<S extends boolean | null | undefined | PasswordResetTokenDefaultArgs> = $Result.GetResult<Prisma.$PasswordResetTokenPayload, S>

  type PasswordResetTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PasswordResetTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PasswordResetTokenCountAggregateInputType | true
    }

  export interface PasswordResetTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordResetToken'], meta: { name: 'PasswordResetToken' } }
    /**
     * Find zero or one PasswordResetToken that matches the filter.
     * @param {PasswordResetTokenFindUniqueArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordResetTokenFindUniqueArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PasswordResetToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PasswordResetTokenFindUniqueOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordResetTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordResetTokenFindFirstArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordResetTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordResetTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany()
     * 
     * // Get first 10 PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasswordResetTokenFindManyArgs>(args?: SelectSubset<T, PasswordResetTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PasswordResetToken.
     * @param {PasswordResetTokenCreateArgs} args - Arguments to create a PasswordResetToken.
     * @example
     * // Create one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.create({
     *   data: {
     *     // ... data to create a PasswordResetToken
     *   }
     * })
     * 
     */
    create<T extends PasswordResetTokenCreateArgs>(args: SelectSubset<T, PasswordResetTokenCreateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PasswordResetTokens.
     * @param {PasswordResetTokenCreateManyArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordResetTokenCreateManyArgs>(args?: SelectSubset<T, PasswordResetTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PasswordResetToken.
     * @param {PasswordResetTokenDeleteArgs} args - Arguments to delete one PasswordResetToken.
     * @example
     * // Delete one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.delete({
     *   where: {
     *     // ... filter to delete one PasswordResetToken
     *   }
     * })
     * 
     */
    delete<T extends PasswordResetTokenDeleteArgs>(args: SelectSubset<T, PasswordResetTokenDeleteArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PasswordResetToken.
     * @param {PasswordResetTokenUpdateArgs} args - Arguments to update one PasswordResetToken.
     * @example
     * // Update one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordResetTokenUpdateArgs>(args: SelectSubset<T, PasswordResetTokenUpdateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PasswordResetTokens.
     * @param {PasswordResetTokenDeleteManyArgs} args - Arguments to filter PasswordResetTokens to delete.
     * @example
     * // Delete a few PasswordResetTokens
     * const { count } = await prisma.passwordResetToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordResetTokenDeleteManyArgs>(args?: SelectSubset<T, PasswordResetTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordResetTokenUpdateManyArgs>(args: SelectSubset<T, PasswordResetTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PasswordResetToken.
     * @param {PasswordResetTokenUpsertArgs} args - Arguments to update or create a PasswordResetToken.
     * @example
     * // Update or create a PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.upsert({
     *   create: {
     *     // ... data to create a PasswordResetToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordResetToken we want to update
     *   }
     * })
     */
    upsert<T extends PasswordResetTokenUpsertArgs>(args: SelectSubset<T, PasswordResetTokenUpsertArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordResetTokens that matches the filter.
     * @param {PasswordResetTokenFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const passwordResetToken = await prisma.passwordResetToken.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: PasswordResetTokenFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a PasswordResetToken.
     * @param {PasswordResetTokenAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const passwordResetToken = await prisma.passwordResetToken.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: PasswordResetTokenAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenCountArgs} args - Arguments to filter PasswordResetTokens to count.
     * @example
     * // Count the number of PasswordResetTokens
     * const count = await prisma.passwordResetToken.count({
     *   where: {
     *     // ... the filter for the PasswordResetTokens we want to count
     *   }
     * })
    **/
    count<T extends PasswordResetTokenCountArgs>(
      args?: Subset<T, PasswordResetTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordResetTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PasswordResetTokenAggregateArgs>(args: Subset<T, PasswordResetTokenAggregateArgs>): Prisma.PrismaPromise<GetPasswordResetTokenAggregateType<T>>

    /**
     * Group by PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PasswordResetTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordResetTokenGroupByArgs['orderBy'] }
        : { orderBy?: PasswordResetTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PasswordResetTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordResetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordResetToken model
   */
  readonly fields: PasswordResetTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordResetToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordResetTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PasswordResetToken model
   */
  interface PasswordResetTokenFieldRefs {
    readonly id: FieldRef<"PasswordResetToken", 'String'>
    readonly userId: FieldRef<"PasswordResetToken", 'String'>
    readonly code: FieldRef<"PasswordResetToken", 'String'>
    readonly expiresAt: FieldRef<"PasswordResetToken", 'DateTime'>
    readonly used: FieldRef<"PasswordResetToken", 'Boolean'>
    readonly farmId: FieldRef<"PasswordResetToken", 'String'>
    readonly createdAt: FieldRef<"PasswordResetToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PasswordResetToken findUnique
   */
  export type PasswordResetTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findUniqueOrThrow
   */
  export type PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findFirst
   */
  export type PasswordResetTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findFirstOrThrow
   */
  export type PasswordResetTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findMany
   */
  export type PasswordResetTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Filter, which PasswordResetTokens to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken create
   */
  export type PasswordResetTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
  }

  /**
   * PasswordResetToken createMany
   */
  export type PasswordResetTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokenCreateManyInput | PasswordResetTokenCreateManyInput[]
  }

  /**
   * PasswordResetToken update
   */
  export type PasswordResetTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
    /**
     * Choose, which PasswordResetToken to update.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken updateMany
   */
  export type PasswordResetTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordResetTokens.
     */
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetTokens to update
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to update.
     */
    limit?: number
  }

  /**
   * PasswordResetToken upsert
   */
  export type PasswordResetTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the PasswordResetToken to update in case it exists.
     */
    where: PasswordResetTokenWhereUniqueInput
    /**
     * In case the PasswordResetToken found by the `where` argument doesn't exist, create a new PasswordResetToken with this data.
     */
    create: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
    /**
     * In case the PasswordResetToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
  }

  /**
   * PasswordResetToken delete
   */
  export type PasswordResetTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Filter which PasswordResetToken to delete.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken deleteMany
   */
  export type PasswordResetTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetTokens to delete
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to delete.
     */
    limit?: number
  }

  /**
   * PasswordResetToken findRaw
   */
  export type PasswordResetTokenFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * PasswordResetToken aggregateRaw
   */
  export type PasswordResetTokenAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * PasswordResetToken without action
   */
  export type PasswordResetTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const FarmScalarFieldEnum: {
    id: 'id',
    name: 'name',
    location: 'location',
    cnpj: 'cnpj',
    logoUrl: 'logoUrl',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FarmScalarFieldEnum = (typeof FarmScalarFieldEnum)[keyof typeof FarmScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    fullName: 'fullName',
    email: 'email',
    phone: 'phone',
    password: 'password',
    role: 'role',
    active: 'active',
    crv: 'crv',
    crmv: 'crmv',
    graduationDate: 'graduationDate',
    specialties: 'specialties',
    resetPasswordToken: 'resetPasswordToken',
    resetPasswordExpires: 'resetPasswordExpires',
    farmId: 'farmId',
    lastLogin: 'lastLogin',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AnimalScalarFieldEnum: {
    id: 'id',
    chipId: 'chipId',
    currentEarTag: 'currentEarTag',
    name: 'name',
    breed: 'breed',
    gender: 'gender',
    birthDate: 'birthDate',
    sireId: 'sireId',
    damId: 'damId',
    pastureId: 'pastureId',
    pastureName: 'pastureName',
    status: 'status',
    deathDate: 'deathDate',
    farmId: 'farmId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AnimalScalarFieldEnum = (typeof AnimalScalarFieldEnum)[keyof typeof AnimalScalarFieldEnum]


  export const EarTagHistoryScalarFieldEnum: {
    id: 'id',
    earTagNumber: 'earTagNumber',
    animalId: 'animalId',
    placementDate: 'placementDate',
    removalDate: 'removalDate',
    reason: 'reason',
    farmId: 'farmId',
    createdAt: 'createdAt'
  };

  export type EarTagHistoryScalarFieldEnum = (typeof EarTagHistoryScalarFieldEnum)[keyof typeof EarTagHistoryScalarFieldEnum]


  export const PastureScalarFieldEnum: {
    id: 'id',
    name: 'name',
    hectares: 'hectares',
    type: 'type',
    animalCapacity: 'animalCapacity',
    currentAnimals: 'currentAnimals',
    active: 'active',
    farmId: 'farmId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PastureScalarFieldEnum = (typeof PastureScalarFieldEnum)[keyof typeof PastureScalarFieldEnum]


  export const EstrusScalarFieldEnum: {
    id: 'id',
    animalId: 'animalId',
    date: 'date',
    intensity: 'intensity',
    detectedBy: 'detectedBy',
    nextEstrus: 'nextEstrus',
    farmId: 'farmId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EstrusScalarFieldEnum = (typeof EstrusScalarFieldEnum)[keyof typeof EstrusScalarFieldEnum]


  export const PregnancyScalarFieldEnum: {
    id: 'id',
    animalId: 'animalId',
    currentStatus: 'currentStatus',
    currentStatusDate: 'currentStatusDate',
    farmId: 'farmId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PregnancyScalarFieldEnum = (typeof PregnancyScalarFieldEnum)[keyof typeof PregnancyScalarFieldEnum]


  export const AttemptScalarFieldEnum: {
    id: 'id',
    number: 'number',
    pregnancyId: 'pregnancyId',
    matingDate: 'matingDate',
    matingType: 'matingType',
    bullId: 'bullId',
    semenName: 'semenName',
    technician: 'technician',
    estimatedBirthDate: 'estimatedBirthDate',
    birthId: 'birthId',
    attemptStatus: 'attemptStatus',
    notes: 'notes',
    createdAt: 'createdAt'
  };

  export type AttemptScalarFieldEnum = (typeof AttemptScalarFieldEnum)[keyof typeof AttemptScalarFieldEnum]


  export const UltrasoundScalarFieldEnum: {
    id: 'id',
    attemptId: 'attemptId',
    days: 'days',
    result: 'result',
    notes: 'notes',
    veterinarianId: 'veterinarianId',
    ultrasoundDate: 'ultrasoundDate'
  };

  export type UltrasoundScalarFieldEnum = (typeof UltrasoundScalarFieldEnum)[keyof typeof UltrasoundScalarFieldEnum]


  export const BirthScalarFieldEnum: {
    id: 'id',
    damId: 'damId',
    pregnancyId: 'pregnancyId',
    birthDate: 'birthDate',
    birthTime: 'birthTime',
    birthType: 'birthType',
    veterinarianId: 'veterinarianId',
    veterinarianName: 'veterinarianName',
    veterinarianCrv: 'veterinarianCrv',
    calfGender: 'calfGender',
    calfWeight: 'calfWeight',
    calfEarTag: 'calfEarTag',
    calfChip: 'calfChip',
    calfStatus: 'calfStatus',
    situation: 'situation',
    deathReason: 'deathReason',
    notes: 'notes',
    farmId: 'farmId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BirthScalarFieldEnum = (typeof BirthScalarFieldEnum)[keyof typeof BirthScalarFieldEnum]


  export const VaccinationScalarFieldEnum: {
    id: 'id',
    animalId: 'animalId',
    vaccineType: 'vaccineType',
    brand: 'brand',
    batch: 'batch',
    vaccinationDate: 'vaccinationDate',
    expirationDate: 'expirationDate',
    nextDoseDate: 'nextDoseDate',
    photoUrl: 'photoUrl',
    reaction: 'reaction',
    veterinarianId: 'veterinarianId',
    farmId: 'farmId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VaccinationScalarFieldEnum = (typeof VaccinationScalarFieldEnum)[keyof typeof VaccinationScalarFieldEnum]


  export const ManagementScalarFieldEnum: {
    id: 'id',
    animalId: 'animalId',
    originPasture: 'originPasture',
    destinationPasture: 'destinationPasture',
    movementDate: 'movementDate',
    reason: 'reason',
    employee: 'employee',
    batchId: 'batchId',
    batchTotal: 'batchTotal',
    farmId: 'farmId',
    createdAt: 'createdAt'
  };

  export type ManagementScalarFieldEnum = (typeof ManagementScalarFieldEnum)[keyof typeof ManagementScalarFieldEnum]


  export const MortalityScalarFieldEnum: {
    id: 'id',
    animalId: 'animalId',
    deathDate: 'deathDate',
    deathTime: 'deathTime',
    deathLocation: 'deathLocation',
    causeOfDeath: 'causeOfDeath',
    severity: 'severity',
    necropsy: 'necropsy',
    disposal: 'disposal',
    photos: 'photos',
    origin: 'origin',
    birthId: 'birthId',
    notes: 'notes',
    farmId: 'farmId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MortalityScalarFieldEnum = (typeof MortalityScalarFieldEnum)[keyof typeof MortalityScalarFieldEnum]


  export const PasswordResetTokenScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    code: 'code',
    expiresAt: 'expiresAt',
    used: 'used',
    farmId: 'farmId',
    createdAt: 'createdAt'
  };

  export type PasswordResetTokenScalarFieldEnum = (typeof PasswordResetTokenScalarFieldEnum)[keyof typeof PasswordResetTokenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Permission'
   */
  export type EnumPermissionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Permission'>
    


  /**
   * Reference to a field of type 'Permission[]'
   */
  export type ListEnumPermissionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Permission[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type FarmWhereInput = {
    AND?: FarmWhereInput | FarmWhereInput[]
    OR?: FarmWhereInput[]
    NOT?: FarmWhereInput | FarmWhereInput[]
    id?: StringFilter<"Farm"> | string
    name?: StringFilter<"Farm"> | string
    location?: StringFilter<"Farm"> | string
    cnpj?: StringNullableFilter<"Farm"> | string | null
    logoUrl?: StringNullableFilter<"Farm"> | string | null
    active?: BoolFilter<"Farm"> | boolean
    createdAt?: DateTimeFilter<"Farm"> | Date | string
    updatedAt?: DateTimeFilter<"Farm"> | Date | string
    users?: UserListRelationFilter
    animals?: AnimalListRelationFilter
    pastures?: PastureListRelationFilter
  }

  export type FarmOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    cnpj?: SortOrder
    logoUrl?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    animals?: AnimalOrderByRelationAggregateInput
    pastures?: PastureOrderByRelationAggregateInput
  }

  export type FarmWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FarmWhereInput | FarmWhereInput[]
    OR?: FarmWhereInput[]
    NOT?: FarmWhereInput | FarmWhereInput[]
    name?: StringFilter<"Farm"> | string
    location?: StringFilter<"Farm"> | string
    cnpj?: StringNullableFilter<"Farm"> | string | null
    logoUrl?: StringNullableFilter<"Farm"> | string | null
    active?: BoolFilter<"Farm"> | boolean
    createdAt?: DateTimeFilter<"Farm"> | Date | string
    updatedAt?: DateTimeFilter<"Farm"> | Date | string
    users?: UserListRelationFilter
    animals?: AnimalListRelationFilter
    pastures?: PastureListRelationFilter
  }, "id">

  export type FarmOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    cnpj?: SortOrder
    logoUrl?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FarmCountOrderByAggregateInput
    _max?: FarmMaxOrderByAggregateInput
    _min?: FarmMinOrderByAggregateInput
  }

  export type FarmScalarWhereWithAggregatesInput = {
    AND?: FarmScalarWhereWithAggregatesInput | FarmScalarWhereWithAggregatesInput[]
    OR?: FarmScalarWhereWithAggregatesInput[]
    NOT?: FarmScalarWhereWithAggregatesInput | FarmScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Farm"> | string
    name?: StringWithAggregatesFilter<"Farm"> | string
    location?: StringWithAggregatesFilter<"Farm"> | string
    cnpj?: StringNullableWithAggregatesFilter<"Farm"> | string | null
    logoUrl?: StringNullableWithAggregatesFilter<"Farm"> | string | null
    active?: BoolWithAggregatesFilter<"Farm"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Farm"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Farm"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    role?: EnumPermissionFilter<"User"> | $Enums.Permission
    active?: BoolFilter<"User"> | boolean
    crv?: StringNullableFilter<"User"> | string | null
    crmv?: StringNullableFilter<"User"> | string | null
    graduationDate?: DateTimeNullableFilter<"User"> | Date | string | null
    specialties?: StringNullableListFilter<"User">
    resetPasswordToken?: StringNullableFilter<"User"> | string | null
    resetPasswordExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    farmId?: StringFilter<"User"> | string
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    farm?: XOR<FarmScalarRelationFilter, FarmWhereInput>
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    active?: SortOrder
    crv?: SortOrder
    crmv?: SortOrder
    graduationDate?: SortOrder
    specialties?: SortOrder
    resetPasswordToken?: SortOrder
    resetPasswordExpires?: SortOrder
    farmId?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farm?: FarmOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    farmId_email?: UserFarmIdEmailCompoundUniqueInput
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    fullName?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    role?: EnumPermissionFilter<"User"> | $Enums.Permission
    active?: BoolFilter<"User"> | boolean
    crv?: StringNullableFilter<"User"> | string | null
    crmv?: StringNullableFilter<"User"> | string | null
    graduationDate?: DateTimeNullableFilter<"User"> | Date | string | null
    specialties?: StringNullableListFilter<"User">
    resetPasswordToken?: StringNullableFilter<"User"> | string | null
    resetPasswordExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    farmId?: StringFilter<"User"> | string
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    farm?: XOR<FarmScalarRelationFilter, FarmWhereInput>
  }, "id" | "email" | "farmId_email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    active?: SortOrder
    crv?: SortOrder
    crmv?: SortOrder
    graduationDate?: SortOrder
    specialties?: SortOrder
    resetPasswordToken?: SortOrder
    resetPasswordExpires?: SortOrder
    farmId?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    fullName?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumPermissionWithAggregatesFilter<"User"> | $Enums.Permission
    active?: BoolWithAggregatesFilter<"User"> | boolean
    crv?: StringNullableWithAggregatesFilter<"User"> | string | null
    crmv?: StringNullableWithAggregatesFilter<"User"> | string | null
    graduationDate?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    specialties?: StringNullableListFilter<"User">
    resetPasswordToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetPasswordExpires?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    farmId?: StringWithAggregatesFilter<"User"> | string
    lastLogin?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AnimalWhereInput = {
    AND?: AnimalWhereInput | AnimalWhereInput[]
    OR?: AnimalWhereInput[]
    NOT?: AnimalWhereInput | AnimalWhereInput[]
    id?: StringFilter<"Animal"> | string
    chipId?: StringFilter<"Animal"> | string
    currentEarTag?: StringNullableFilter<"Animal"> | string | null
    name?: StringFilter<"Animal"> | string
    breed?: StringFilter<"Animal"> | string
    gender?: StringFilter<"Animal"> | string
    birthDate?: DateTimeFilter<"Animal"> | Date | string
    sireId?: StringNullableFilter<"Animal"> | string | null
    damId?: StringNullableFilter<"Animal"> | string | null
    pastureId?: StringNullableFilter<"Animal"> | string | null
    pastureName?: StringNullableFilter<"Animal"> | string | null
    status?: StringFilter<"Animal"> | string
    deathDate?: DateTimeNullableFilter<"Animal"> | Date | string | null
    farmId?: StringFilter<"Animal"> | string
    createdAt?: DateTimeFilter<"Animal"> | Date | string
    updatedAt?: DateTimeFilter<"Animal"> | Date | string
    earTagHistory?: EarTagHistoryListRelationFilter
    farm?: XOR<FarmScalarRelationFilter, FarmWhereInput>
  }

  export type AnimalOrderByWithRelationInput = {
    id?: SortOrder
    chipId?: SortOrder
    currentEarTag?: SortOrder
    name?: SortOrder
    breed?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    sireId?: SortOrder
    damId?: SortOrder
    pastureId?: SortOrder
    pastureName?: SortOrder
    status?: SortOrder
    deathDate?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    earTagHistory?: EarTagHistoryOrderByRelationAggregateInput
    farm?: FarmOrderByWithRelationInput
  }

  export type AnimalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    chipId?: string
    currentEarTag?: string
    farmId_chipId?: AnimalFarmIdChipIdCompoundUniqueInput
    AND?: AnimalWhereInput | AnimalWhereInput[]
    OR?: AnimalWhereInput[]
    NOT?: AnimalWhereInput | AnimalWhereInput[]
    name?: StringFilter<"Animal"> | string
    breed?: StringFilter<"Animal"> | string
    gender?: StringFilter<"Animal"> | string
    birthDate?: DateTimeFilter<"Animal"> | Date | string
    sireId?: StringNullableFilter<"Animal"> | string | null
    damId?: StringNullableFilter<"Animal"> | string | null
    pastureId?: StringNullableFilter<"Animal"> | string | null
    pastureName?: StringNullableFilter<"Animal"> | string | null
    status?: StringFilter<"Animal"> | string
    deathDate?: DateTimeNullableFilter<"Animal"> | Date | string | null
    farmId?: StringFilter<"Animal"> | string
    createdAt?: DateTimeFilter<"Animal"> | Date | string
    updatedAt?: DateTimeFilter<"Animal"> | Date | string
    earTagHistory?: EarTagHistoryListRelationFilter
    farm?: XOR<FarmScalarRelationFilter, FarmWhereInput>
  }, "id" | "chipId" | "currentEarTag" | "farmId_chipId">

  export type AnimalOrderByWithAggregationInput = {
    id?: SortOrder
    chipId?: SortOrder
    currentEarTag?: SortOrder
    name?: SortOrder
    breed?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    sireId?: SortOrder
    damId?: SortOrder
    pastureId?: SortOrder
    pastureName?: SortOrder
    status?: SortOrder
    deathDate?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AnimalCountOrderByAggregateInput
    _max?: AnimalMaxOrderByAggregateInput
    _min?: AnimalMinOrderByAggregateInput
  }

  export type AnimalScalarWhereWithAggregatesInput = {
    AND?: AnimalScalarWhereWithAggregatesInput | AnimalScalarWhereWithAggregatesInput[]
    OR?: AnimalScalarWhereWithAggregatesInput[]
    NOT?: AnimalScalarWhereWithAggregatesInput | AnimalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Animal"> | string
    chipId?: StringWithAggregatesFilter<"Animal"> | string
    currentEarTag?: StringNullableWithAggregatesFilter<"Animal"> | string | null
    name?: StringWithAggregatesFilter<"Animal"> | string
    breed?: StringWithAggregatesFilter<"Animal"> | string
    gender?: StringWithAggregatesFilter<"Animal"> | string
    birthDate?: DateTimeWithAggregatesFilter<"Animal"> | Date | string
    sireId?: StringNullableWithAggregatesFilter<"Animal"> | string | null
    damId?: StringNullableWithAggregatesFilter<"Animal"> | string | null
    pastureId?: StringNullableWithAggregatesFilter<"Animal"> | string | null
    pastureName?: StringNullableWithAggregatesFilter<"Animal"> | string | null
    status?: StringWithAggregatesFilter<"Animal"> | string
    deathDate?: DateTimeNullableWithAggregatesFilter<"Animal"> | Date | string | null
    farmId?: StringWithAggregatesFilter<"Animal"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Animal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Animal"> | Date | string
  }

  export type EarTagHistoryWhereInput = {
    AND?: EarTagHistoryWhereInput | EarTagHistoryWhereInput[]
    OR?: EarTagHistoryWhereInput[]
    NOT?: EarTagHistoryWhereInput | EarTagHistoryWhereInput[]
    id?: StringFilter<"EarTagHistory"> | string
    earTagNumber?: StringFilter<"EarTagHistory"> | string
    animalId?: StringFilter<"EarTagHistory"> | string
    placementDate?: DateTimeFilter<"EarTagHistory"> | Date | string
    removalDate?: DateTimeNullableFilter<"EarTagHistory"> | Date | string | null
    reason?: StringNullableFilter<"EarTagHistory"> | string | null
    farmId?: StringFilter<"EarTagHistory"> | string
    createdAt?: DateTimeFilter<"EarTagHistory"> | Date | string
    animal?: XOR<AnimalScalarRelationFilter, AnimalWhereInput>
  }

  export type EarTagHistoryOrderByWithRelationInput = {
    id?: SortOrder
    earTagNumber?: SortOrder
    animalId?: SortOrder
    placementDate?: SortOrder
    removalDate?: SortOrder
    reason?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    animal?: AnimalOrderByWithRelationInput
  }

  export type EarTagHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EarTagHistoryWhereInput | EarTagHistoryWhereInput[]
    OR?: EarTagHistoryWhereInput[]
    NOT?: EarTagHistoryWhereInput | EarTagHistoryWhereInput[]
    earTagNumber?: StringFilter<"EarTagHistory"> | string
    animalId?: StringFilter<"EarTagHistory"> | string
    placementDate?: DateTimeFilter<"EarTagHistory"> | Date | string
    removalDate?: DateTimeNullableFilter<"EarTagHistory"> | Date | string | null
    reason?: StringNullableFilter<"EarTagHistory"> | string | null
    farmId?: StringFilter<"EarTagHistory"> | string
    createdAt?: DateTimeFilter<"EarTagHistory"> | Date | string
    animal?: XOR<AnimalScalarRelationFilter, AnimalWhereInput>
  }, "id">

  export type EarTagHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    earTagNumber?: SortOrder
    animalId?: SortOrder
    placementDate?: SortOrder
    removalDate?: SortOrder
    reason?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    _count?: EarTagHistoryCountOrderByAggregateInput
    _max?: EarTagHistoryMaxOrderByAggregateInput
    _min?: EarTagHistoryMinOrderByAggregateInput
  }

  export type EarTagHistoryScalarWhereWithAggregatesInput = {
    AND?: EarTagHistoryScalarWhereWithAggregatesInput | EarTagHistoryScalarWhereWithAggregatesInput[]
    OR?: EarTagHistoryScalarWhereWithAggregatesInput[]
    NOT?: EarTagHistoryScalarWhereWithAggregatesInput | EarTagHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EarTagHistory"> | string
    earTagNumber?: StringWithAggregatesFilter<"EarTagHistory"> | string
    animalId?: StringWithAggregatesFilter<"EarTagHistory"> | string
    placementDate?: DateTimeWithAggregatesFilter<"EarTagHistory"> | Date | string
    removalDate?: DateTimeNullableWithAggregatesFilter<"EarTagHistory"> | Date | string | null
    reason?: StringNullableWithAggregatesFilter<"EarTagHistory"> | string | null
    farmId?: StringWithAggregatesFilter<"EarTagHistory"> | string
    createdAt?: DateTimeWithAggregatesFilter<"EarTagHistory"> | Date | string
  }

  export type PastureWhereInput = {
    AND?: PastureWhereInput | PastureWhereInput[]
    OR?: PastureWhereInput[]
    NOT?: PastureWhereInput | PastureWhereInput[]
    id?: StringFilter<"Pasture"> | string
    name?: StringFilter<"Pasture"> | string
    hectares?: FloatFilter<"Pasture"> | number
    type?: StringFilter<"Pasture"> | string
    animalCapacity?: IntFilter<"Pasture"> | number
    currentAnimals?: IntFilter<"Pasture"> | number
    active?: BoolFilter<"Pasture"> | boolean
    farmId?: StringFilter<"Pasture"> | string
    createdAt?: DateTimeFilter<"Pasture"> | Date | string
    updatedAt?: DateTimeFilter<"Pasture"> | Date | string
    farm?: XOR<FarmScalarRelationFilter, FarmWhereInput>
  }

  export type PastureOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    hectares?: SortOrder
    type?: SortOrder
    animalCapacity?: SortOrder
    currentAnimals?: SortOrder
    active?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    farm?: FarmOrderByWithRelationInput
  }

  export type PastureWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    farmId_name?: PastureFarmIdNameCompoundUniqueInput
    AND?: PastureWhereInput | PastureWhereInput[]
    OR?: PastureWhereInput[]
    NOT?: PastureWhereInput | PastureWhereInput[]
    name?: StringFilter<"Pasture"> | string
    hectares?: FloatFilter<"Pasture"> | number
    type?: StringFilter<"Pasture"> | string
    animalCapacity?: IntFilter<"Pasture"> | number
    currentAnimals?: IntFilter<"Pasture"> | number
    active?: BoolFilter<"Pasture"> | boolean
    farmId?: StringFilter<"Pasture"> | string
    createdAt?: DateTimeFilter<"Pasture"> | Date | string
    updatedAt?: DateTimeFilter<"Pasture"> | Date | string
    farm?: XOR<FarmScalarRelationFilter, FarmWhereInput>
  }, "id" | "farmId_name">

  export type PastureOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    hectares?: SortOrder
    type?: SortOrder
    animalCapacity?: SortOrder
    currentAnimals?: SortOrder
    active?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PastureCountOrderByAggregateInput
    _avg?: PastureAvgOrderByAggregateInput
    _max?: PastureMaxOrderByAggregateInput
    _min?: PastureMinOrderByAggregateInput
    _sum?: PastureSumOrderByAggregateInput
  }

  export type PastureScalarWhereWithAggregatesInput = {
    AND?: PastureScalarWhereWithAggregatesInput | PastureScalarWhereWithAggregatesInput[]
    OR?: PastureScalarWhereWithAggregatesInput[]
    NOT?: PastureScalarWhereWithAggregatesInput | PastureScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Pasture"> | string
    name?: StringWithAggregatesFilter<"Pasture"> | string
    hectares?: FloatWithAggregatesFilter<"Pasture"> | number
    type?: StringWithAggregatesFilter<"Pasture"> | string
    animalCapacity?: IntWithAggregatesFilter<"Pasture"> | number
    currentAnimals?: IntWithAggregatesFilter<"Pasture"> | number
    active?: BoolWithAggregatesFilter<"Pasture"> | boolean
    farmId?: StringWithAggregatesFilter<"Pasture"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Pasture"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Pasture"> | Date | string
  }

  export type EstrusWhereInput = {
    AND?: EstrusWhereInput | EstrusWhereInput[]
    OR?: EstrusWhereInput[]
    NOT?: EstrusWhereInput | EstrusWhereInput[]
    id?: StringFilter<"Estrus"> | string
    animalId?: StringFilter<"Estrus"> | string
    date?: DateTimeFilter<"Estrus"> | Date | string
    intensity?: StringFilter<"Estrus"> | string
    detectedBy?: StringFilter<"Estrus"> | string
    nextEstrus?: DateTimeFilter<"Estrus"> | Date | string
    farmId?: StringFilter<"Estrus"> | string
    createdAt?: DateTimeFilter<"Estrus"> | Date | string
    updatedAt?: DateTimeFilter<"Estrus"> | Date | string
  }

  export type EstrusOrderByWithRelationInput = {
    id?: SortOrder
    animalId?: SortOrder
    date?: SortOrder
    intensity?: SortOrder
    detectedBy?: SortOrder
    nextEstrus?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EstrusWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EstrusWhereInput | EstrusWhereInput[]
    OR?: EstrusWhereInput[]
    NOT?: EstrusWhereInput | EstrusWhereInput[]
    animalId?: StringFilter<"Estrus"> | string
    date?: DateTimeFilter<"Estrus"> | Date | string
    intensity?: StringFilter<"Estrus"> | string
    detectedBy?: StringFilter<"Estrus"> | string
    nextEstrus?: DateTimeFilter<"Estrus"> | Date | string
    farmId?: StringFilter<"Estrus"> | string
    createdAt?: DateTimeFilter<"Estrus"> | Date | string
    updatedAt?: DateTimeFilter<"Estrus"> | Date | string
  }, "id">

  export type EstrusOrderByWithAggregationInput = {
    id?: SortOrder
    animalId?: SortOrder
    date?: SortOrder
    intensity?: SortOrder
    detectedBy?: SortOrder
    nextEstrus?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EstrusCountOrderByAggregateInput
    _max?: EstrusMaxOrderByAggregateInput
    _min?: EstrusMinOrderByAggregateInput
  }

  export type EstrusScalarWhereWithAggregatesInput = {
    AND?: EstrusScalarWhereWithAggregatesInput | EstrusScalarWhereWithAggregatesInput[]
    OR?: EstrusScalarWhereWithAggregatesInput[]
    NOT?: EstrusScalarWhereWithAggregatesInput | EstrusScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Estrus"> | string
    animalId?: StringWithAggregatesFilter<"Estrus"> | string
    date?: DateTimeWithAggregatesFilter<"Estrus"> | Date | string
    intensity?: StringWithAggregatesFilter<"Estrus"> | string
    detectedBy?: StringWithAggregatesFilter<"Estrus"> | string
    nextEstrus?: DateTimeWithAggregatesFilter<"Estrus"> | Date | string
    farmId?: StringWithAggregatesFilter<"Estrus"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Estrus"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Estrus"> | Date | string
  }

  export type PregnancyWhereInput = {
    AND?: PregnancyWhereInput | PregnancyWhereInput[]
    OR?: PregnancyWhereInput[]
    NOT?: PregnancyWhereInput | PregnancyWhereInput[]
    id?: StringFilter<"Pregnancy"> | string
    animalId?: StringFilter<"Pregnancy"> | string
    currentStatus?: StringFilter<"Pregnancy"> | string
    currentStatusDate?: DateTimeFilter<"Pregnancy"> | Date | string
    farmId?: StringFilter<"Pregnancy"> | string
    createdAt?: DateTimeFilter<"Pregnancy"> | Date | string
    updatedAt?: DateTimeFilter<"Pregnancy"> | Date | string
    attempts?: AttemptListRelationFilter
  }

  export type PregnancyOrderByWithRelationInput = {
    id?: SortOrder
    animalId?: SortOrder
    currentStatus?: SortOrder
    currentStatusDate?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    attempts?: AttemptOrderByRelationAggregateInput
  }

  export type PregnancyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PregnancyWhereInput | PregnancyWhereInput[]
    OR?: PregnancyWhereInput[]
    NOT?: PregnancyWhereInput | PregnancyWhereInput[]
    animalId?: StringFilter<"Pregnancy"> | string
    currentStatus?: StringFilter<"Pregnancy"> | string
    currentStatusDate?: DateTimeFilter<"Pregnancy"> | Date | string
    farmId?: StringFilter<"Pregnancy"> | string
    createdAt?: DateTimeFilter<"Pregnancy"> | Date | string
    updatedAt?: DateTimeFilter<"Pregnancy"> | Date | string
    attempts?: AttemptListRelationFilter
  }, "id">

  export type PregnancyOrderByWithAggregationInput = {
    id?: SortOrder
    animalId?: SortOrder
    currentStatus?: SortOrder
    currentStatusDate?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PregnancyCountOrderByAggregateInput
    _max?: PregnancyMaxOrderByAggregateInput
    _min?: PregnancyMinOrderByAggregateInput
  }

  export type PregnancyScalarWhereWithAggregatesInput = {
    AND?: PregnancyScalarWhereWithAggregatesInput | PregnancyScalarWhereWithAggregatesInput[]
    OR?: PregnancyScalarWhereWithAggregatesInput[]
    NOT?: PregnancyScalarWhereWithAggregatesInput | PregnancyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Pregnancy"> | string
    animalId?: StringWithAggregatesFilter<"Pregnancy"> | string
    currentStatus?: StringWithAggregatesFilter<"Pregnancy"> | string
    currentStatusDate?: DateTimeWithAggregatesFilter<"Pregnancy"> | Date | string
    farmId?: StringWithAggregatesFilter<"Pregnancy"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Pregnancy"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Pregnancy"> | Date | string
  }

  export type AttemptWhereInput = {
    AND?: AttemptWhereInput | AttemptWhereInput[]
    OR?: AttemptWhereInput[]
    NOT?: AttemptWhereInput | AttemptWhereInput[]
    id?: StringFilter<"Attempt"> | string
    number?: IntFilter<"Attempt"> | number
    pregnancyId?: StringFilter<"Attempt"> | string
    matingDate?: DateTimeFilter<"Attempt"> | Date | string
    matingType?: StringFilter<"Attempt"> | string
    bullId?: StringNullableFilter<"Attempt"> | string | null
    semenName?: StringNullableFilter<"Attempt"> | string | null
    technician?: StringNullableFilter<"Attempt"> | string | null
    estimatedBirthDate?: DateTimeFilter<"Attempt"> | Date | string
    birthId?: StringNullableFilter<"Attempt"> | string | null
    attemptStatus?: StringFilter<"Attempt"> | string
    notes?: StringNullableFilter<"Attempt"> | string | null
    createdAt?: DateTimeFilter<"Attempt"> | Date | string
    pregnancy?: XOR<PregnancyScalarRelationFilter, PregnancyWhereInput>
    ultrasounds?: UltrasoundListRelationFilter
  }

  export type AttemptOrderByWithRelationInput = {
    id?: SortOrder
    number?: SortOrder
    pregnancyId?: SortOrder
    matingDate?: SortOrder
    matingType?: SortOrder
    bullId?: SortOrder
    semenName?: SortOrder
    technician?: SortOrder
    estimatedBirthDate?: SortOrder
    birthId?: SortOrder
    attemptStatus?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    pregnancy?: PregnancyOrderByWithRelationInput
    ultrasounds?: UltrasoundOrderByRelationAggregateInput
  }

  export type AttemptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AttemptWhereInput | AttemptWhereInput[]
    OR?: AttemptWhereInput[]
    NOT?: AttemptWhereInput | AttemptWhereInput[]
    number?: IntFilter<"Attempt"> | number
    pregnancyId?: StringFilter<"Attempt"> | string
    matingDate?: DateTimeFilter<"Attempt"> | Date | string
    matingType?: StringFilter<"Attempt"> | string
    bullId?: StringNullableFilter<"Attempt"> | string | null
    semenName?: StringNullableFilter<"Attempt"> | string | null
    technician?: StringNullableFilter<"Attempt"> | string | null
    estimatedBirthDate?: DateTimeFilter<"Attempt"> | Date | string
    birthId?: StringNullableFilter<"Attempt"> | string | null
    attemptStatus?: StringFilter<"Attempt"> | string
    notes?: StringNullableFilter<"Attempt"> | string | null
    createdAt?: DateTimeFilter<"Attempt"> | Date | string
    pregnancy?: XOR<PregnancyScalarRelationFilter, PregnancyWhereInput>
    ultrasounds?: UltrasoundListRelationFilter
  }, "id">

  export type AttemptOrderByWithAggregationInput = {
    id?: SortOrder
    number?: SortOrder
    pregnancyId?: SortOrder
    matingDate?: SortOrder
    matingType?: SortOrder
    bullId?: SortOrder
    semenName?: SortOrder
    technician?: SortOrder
    estimatedBirthDate?: SortOrder
    birthId?: SortOrder
    attemptStatus?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    _count?: AttemptCountOrderByAggregateInput
    _avg?: AttemptAvgOrderByAggregateInput
    _max?: AttemptMaxOrderByAggregateInput
    _min?: AttemptMinOrderByAggregateInput
    _sum?: AttemptSumOrderByAggregateInput
  }

  export type AttemptScalarWhereWithAggregatesInput = {
    AND?: AttemptScalarWhereWithAggregatesInput | AttemptScalarWhereWithAggregatesInput[]
    OR?: AttemptScalarWhereWithAggregatesInput[]
    NOT?: AttemptScalarWhereWithAggregatesInput | AttemptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Attempt"> | string
    number?: IntWithAggregatesFilter<"Attempt"> | number
    pregnancyId?: StringWithAggregatesFilter<"Attempt"> | string
    matingDate?: DateTimeWithAggregatesFilter<"Attempt"> | Date | string
    matingType?: StringWithAggregatesFilter<"Attempt"> | string
    bullId?: StringNullableWithAggregatesFilter<"Attempt"> | string | null
    semenName?: StringNullableWithAggregatesFilter<"Attempt"> | string | null
    technician?: StringNullableWithAggregatesFilter<"Attempt"> | string | null
    estimatedBirthDate?: DateTimeWithAggregatesFilter<"Attempt"> | Date | string
    birthId?: StringNullableWithAggregatesFilter<"Attempt"> | string | null
    attemptStatus?: StringWithAggregatesFilter<"Attempt"> | string
    notes?: StringNullableWithAggregatesFilter<"Attempt"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Attempt"> | Date | string
  }

  export type UltrasoundWhereInput = {
    AND?: UltrasoundWhereInput | UltrasoundWhereInput[]
    OR?: UltrasoundWhereInput[]
    NOT?: UltrasoundWhereInput | UltrasoundWhereInput[]
    id?: StringFilter<"Ultrasound"> | string
    attemptId?: StringFilter<"Ultrasound"> | string
    days?: IntFilter<"Ultrasound"> | number
    result?: StringFilter<"Ultrasound"> | string
    notes?: StringNullableFilter<"Ultrasound"> | string | null
    veterinarianId?: StringNullableFilter<"Ultrasound"> | string | null
    ultrasoundDate?: DateTimeFilter<"Ultrasound"> | Date | string
    attempt?: XOR<AttemptScalarRelationFilter, AttemptWhereInput>
  }

  export type UltrasoundOrderByWithRelationInput = {
    id?: SortOrder
    attemptId?: SortOrder
    days?: SortOrder
    result?: SortOrder
    notes?: SortOrder
    veterinarianId?: SortOrder
    ultrasoundDate?: SortOrder
    attempt?: AttemptOrderByWithRelationInput
  }

  export type UltrasoundWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UltrasoundWhereInput | UltrasoundWhereInput[]
    OR?: UltrasoundWhereInput[]
    NOT?: UltrasoundWhereInput | UltrasoundWhereInput[]
    attemptId?: StringFilter<"Ultrasound"> | string
    days?: IntFilter<"Ultrasound"> | number
    result?: StringFilter<"Ultrasound"> | string
    notes?: StringNullableFilter<"Ultrasound"> | string | null
    veterinarianId?: StringNullableFilter<"Ultrasound"> | string | null
    ultrasoundDate?: DateTimeFilter<"Ultrasound"> | Date | string
    attempt?: XOR<AttemptScalarRelationFilter, AttemptWhereInput>
  }, "id">

  export type UltrasoundOrderByWithAggregationInput = {
    id?: SortOrder
    attemptId?: SortOrder
    days?: SortOrder
    result?: SortOrder
    notes?: SortOrder
    veterinarianId?: SortOrder
    ultrasoundDate?: SortOrder
    _count?: UltrasoundCountOrderByAggregateInput
    _avg?: UltrasoundAvgOrderByAggregateInput
    _max?: UltrasoundMaxOrderByAggregateInput
    _min?: UltrasoundMinOrderByAggregateInput
    _sum?: UltrasoundSumOrderByAggregateInput
  }

  export type UltrasoundScalarWhereWithAggregatesInput = {
    AND?: UltrasoundScalarWhereWithAggregatesInput | UltrasoundScalarWhereWithAggregatesInput[]
    OR?: UltrasoundScalarWhereWithAggregatesInput[]
    NOT?: UltrasoundScalarWhereWithAggregatesInput | UltrasoundScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Ultrasound"> | string
    attemptId?: StringWithAggregatesFilter<"Ultrasound"> | string
    days?: IntWithAggregatesFilter<"Ultrasound"> | number
    result?: StringWithAggregatesFilter<"Ultrasound"> | string
    notes?: StringNullableWithAggregatesFilter<"Ultrasound"> | string | null
    veterinarianId?: StringNullableWithAggregatesFilter<"Ultrasound"> | string | null
    ultrasoundDate?: DateTimeWithAggregatesFilter<"Ultrasound"> | Date | string
  }

  export type BirthWhereInput = {
    AND?: BirthWhereInput | BirthWhereInput[]
    OR?: BirthWhereInput[]
    NOT?: BirthWhereInput | BirthWhereInput[]
    id?: StringFilter<"Birth"> | string
    damId?: StringFilter<"Birth"> | string
    pregnancyId?: StringNullableFilter<"Birth"> | string | null
    birthDate?: DateTimeFilter<"Birth"> | Date | string
    birthTime?: StringNullableFilter<"Birth"> | string | null
    birthType?: StringFilter<"Birth"> | string
    veterinarianId?: StringNullableFilter<"Birth"> | string | null
    veterinarianName?: StringNullableFilter<"Birth"> | string | null
    veterinarianCrv?: StringNullableFilter<"Birth"> | string | null
    calfGender?: StringNullableFilter<"Birth"> | string | null
    calfWeight?: FloatNullableFilter<"Birth"> | number | null
    calfEarTag?: StringNullableFilter<"Birth"> | string | null
    calfChip?: StringNullableFilter<"Birth"> | string | null
    calfStatus?: StringFilter<"Birth"> | string
    situation?: StringFilter<"Birth"> | string
    deathReason?: StringNullableFilter<"Birth"> | string | null
    notes?: StringNullableFilter<"Birth"> | string | null
    farmId?: StringFilter<"Birth"> | string
    createdAt?: DateTimeFilter<"Birth"> | Date | string
    updatedAt?: DateTimeFilter<"Birth"> | Date | string
  }

  export type BirthOrderByWithRelationInput = {
    id?: SortOrder
    damId?: SortOrder
    pregnancyId?: SortOrder
    birthDate?: SortOrder
    birthTime?: SortOrder
    birthType?: SortOrder
    veterinarianId?: SortOrder
    veterinarianName?: SortOrder
    veterinarianCrv?: SortOrder
    calfGender?: SortOrder
    calfWeight?: SortOrder
    calfEarTag?: SortOrder
    calfChip?: SortOrder
    calfStatus?: SortOrder
    situation?: SortOrder
    deathReason?: SortOrder
    notes?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BirthWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BirthWhereInput | BirthWhereInput[]
    OR?: BirthWhereInput[]
    NOT?: BirthWhereInput | BirthWhereInput[]
    damId?: StringFilter<"Birth"> | string
    pregnancyId?: StringNullableFilter<"Birth"> | string | null
    birthDate?: DateTimeFilter<"Birth"> | Date | string
    birthTime?: StringNullableFilter<"Birth"> | string | null
    birthType?: StringFilter<"Birth"> | string
    veterinarianId?: StringNullableFilter<"Birth"> | string | null
    veterinarianName?: StringNullableFilter<"Birth"> | string | null
    veterinarianCrv?: StringNullableFilter<"Birth"> | string | null
    calfGender?: StringNullableFilter<"Birth"> | string | null
    calfWeight?: FloatNullableFilter<"Birth"> | number | null
    calfEarTag?: StringNullableFilter<"Birth"> | string | null
    calfChip?: StringNullableFilter<"Birth"> | string | null
    calfStatus?: StringFilter<"Birth"> | string
    situation?: StringFilter<"Birth"> | string
    deathReason?: StringNullableFilter<"Birth"> | string | null
    notes?: StringNullableFilter<"Birth"> | string | null
    farmId?: StringFilter<"Birth"> | string
    createdAt?: DateTimeFilter<"Birth"> | Date | string
    updatedAt?: DateTimeFilter<"Birth"> | Date | string
  }, "id">

  export type BirthOrderByWithAggregationInput = {
    id?: SortOrder
    damId?: SortOrder
    pregnancyId?: SortOrder
    birthDate?: SortOrder
    birthTime?: SortOrder
    birthType?: SortOrder
    veterinarianId?: SortOrder
    veterinarianName?: SortOrder
    veterinarianCrv?: SortOrder
    calfGender?: SortOrder
    calfWeight?: SortOrder
    calfEarTag?: SortOrder
    calfChip?: SortOrder
    calfStatus?: SortOrder
    situation?: SortOrder
    deathReason?: SortOrder
    notes?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BirthCountOrderByAggregateInput
    _avg?: BirthAvgOrderByAggregateInput
    _max?: BirthMaxOrderByAggregateInput
    _min?: BirthMinOrderByAggregateInput
    _sum?: BirthSumOrderByAggregateInput
  }

  export type BirthScalarWhereWithAggregatesInput = {
    AND?: BirthScalarWhereWithAggregatesInput | BirthScalarWhereWithAggregatesInput[]
    OR?: BirthScalarWhereWithAggregatesInput[]
    NOT?: BirthScalarWhereWithAggregatesInput | BirthScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Birth"> | string
    damId?: StringWithAggregatesFilter<"Birth"> | string
    pregnancyId?: StringNullableWithAggregatesFilter<"Birth"> | string | null
    birthDate?: DateTimeWithAggregatesFilter<"Birth"> | Date | string
    birthTime?: StringNullableWithAggregatesFilter<"Birth"> | string | null
    birthType?: StringWithAggregatesFilter<"Birth"> | string
    veterinarianId?: StringNullableWithAggregatesFilter<"Birth"> | string | null
    veterinarianName?: StringNullableWithAggregatesFilter<"Birth"> | string | null
    veterinarianCrv?: StringNullableWithAggregatesFilter<"Birth"> | string | null
    calfGender?: StringNullableWithAggregatesFilter<"Birth"> | string | null
    calfWeight?: FloatNullableWithAggregatesFilter<"Birth"> | number | null
    calfEarTag?: StringNullableWithAggregatesFilter<"Birth"> | string | null
    calfChip?: StringNullableWithAggregatesFilter<"Birth"> | string | null
    calfStatus?: StringWithAggregatesFilter<"Birth"> | string
    situation?: StringWithAggregatesFilter<"Birth"> | string
    deathReason?: StringNullableWithAggregatesFilter<"Birth"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Birth"> | string | null
    farmId?: StringWithAggregatesFilter<"Birth"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Birth"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Birth"> | Date | string
  }

  export type VaccinationWhereInput = {
    AND?: VaccinationWhereInput | VaccinationWhereInput[]
    OR?: VaccinationWhereInput[]
    NOT?: VaccinationWhereInput | VaccinationWhereInput[]
    id?: StringFilter<"Vaccination"> | string
    animalId?: StringFilter<"Vaccination"> | string
    vaccineType?: StringFilter<"Vaccination"> | string
    brand?: StringFilter<"Vaccination"> | string
    batch?: StringFilter<"Vaccination"> | string
    vaccinationDate?: DateTimeFilter<"Vaccination"> | Date | string
    expirationDate?: DateTimeFilter<"Vaccination"> | Date | string
    nextDoseDate?: DateTimeNullableFilter<"Vaccination"> | Date | string | null
    photoUrl?: StringNullableFilter<"Vaccination"> | string | null
    reaction?: StringNullableFilter<"Vaccination"> | string | null
    veterinarianId?: StringNullableFilter<"Vaccination"> | string | null
    farmId?: StringFilter<"Vaccination"> | string
    createdAt?: DateTimeFilter<"Vaccination"> | Date | string
    updatedAt?: DateTimeFilter<"Vaccination"> | Date | string
  }

  export type VaccinationOrderByWithRelationInput = {
    id?: SortOrder
    animalId?: SortOrder
    vaccineType?: SortOrder
    brand?: SortOrder
    batch?: SortOrder
    vaccinationDate?: SortOrder
    expirationDate?: SortOrder
    nextDoseDate?: SortOrder
    photoUrl?: SortOrder
    reaction?: SortOrder
    veterinarianId?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VaccinationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VaccinationWhereInput | VaccinationWhereInput[]
    OR?: VaccinationWhereInput[]
    NOT?: VaccinationWhereInput | VaccinationWhereInput[]
    animalId?: StringFilter<"Vaccination"> | string
    vaccineType?: StringFilter<"Vaccination"> | string
    brand?: StringFilter<"Vaccination"> | string
    batch?: StringFilter<"Vaccination"> | string
    vaccinationDate?: DateTimeFilter<"Vaccination"> | Date | string
    expirationDate?: DateTimeFilter<"Vaccination"> | Date | string
    nextDoseDate?: DateTimeNullableFilter<"Vaccination"> | Date | string | null
    photoUrl?: StringNullableFilter<"Vaccination"> | string | null
    reaction?: StringNullableFilter<"Vaccination"> | string | null
    veterinarianId?: StringNullableFilter<"Vaccination"> | string | null
    farmId?: StringFilter<"Vaccination"> | string
    createdAt?: DateTimeFilter<"Vaccination"> | Date | string
    updatedAt?: DateTimeFilter<"Vaccination"> | Date | string
  }, "id">

  export type VaccinationOrderByWithAggregationInput = {
    id?: SortOrder
    animalId?: SortOrder
    vaccineType?: SortOrder
    brand?: SortOrder
    batch?: SortOrder
    vaccinationDate?: SortOrder
    expirationDate?: SortOrder
    nextDoseDate?: SortOrder
    photoUrl?: SortOrder
    reaction?: SortOrder
    veterinarianId?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VaccinationCountOrderByAggregateInput
    _max?: VaccinationMaxOrderByAggregateInput
    _min?: VaccinationMinOrderByAggregateInput
  }

  export type VaccinationScalarWhereWithAggregatesInput = {
    AND?: VaccinationScalarWhereWithAggregatesInput | VaccinationScalarWhereWithAggregatesInput[]
    OR?: VaccinationScalarWhereWithAggregatesInput[]
    NOT?: VaccinationScalarWhereWithAggregatesInput | VaccinationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Vaccination"> | string
    animalId?: StringWithAggregatesFilter<"Vaccination"> | string
    vaccineType?: StringWithAggregatesFilter<"Vaccination"> | string
    brand?: StringWithAggregatesFilter<"Vaccination"> | string
    batch?: StringWithAggregatesFilter<"Vaccination"> | string
    vaccinationDate?: DateTimeWithAggregatesFilter<"Vaccination"> | Date | string
    expirationDate?: DateTimeWithAggregatesFilter<"Vaccination"> | Date | string
    nextDoseDate?: DateTimeNullableWithAggregatesFilter<"Vaccination"> | Date | string | null
    photoUrl?: StringNullableWithAggregatesFilter<"Vaccination"> | string | null
    reaction?: StringNullableWithAggregatesFilter<"Vaccination"> | string | null
    veterinarianId?: StringNullableWithAggregatesFilter<"Vaccination"> | string | null
    farmId?: StringWithAggregatesFilter<"Vaccination"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Vaccination"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Vaccination"> | Date | string
  }

  export type ManagementWhereInput = {
    AND?: ManagementWhereInput | ManagementWhereInput[]
    OR?: ManagementWhereInput[]
    NOT?: ManagementWhereInput | ManagementWhereInput[]
    id?: StringFilter<"Management"> | string
    animalId?: StringFilter<"Management"> | string
    originPasture?: StringFilter<"Management"> | string
    destinationPasture?: StringFilter<"Management"> | string
    movementDate?: DateTimeFilter<"Management"> | Date | string
    reason?: StringFilter<"Management"> | string
    employee?: StringFilter<"Management"> | string
    batchId?: StringNullableFilter<"Management"> | string | null
    batchTotal?: IntNullableFilter<"Management"> | number | null
    farmId?: StringFilter<"Management"> | string
    createdAt?: DateTimeFilter<"Management"> | Date | string
  }

  export type ManagementOrderByWithRelationInput = {
    id?: SortOrder
    animalId?: SortOrder
    originPasture?: SortOrder
    destinationPasture?: SortOrder
    movementDate?: SortOrder
    reason?: SortOrder
    employee?: SortOrder
    batchId?: SortOrder
    batchTotal?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
  }

  export type ManagementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ManagementWhereInput | ManagementWhereInput[]
    OR?: ManagementWhereInput[]
    NOT?: ManagementWhereInput | ManagementWhereInput[]
    animalId?: StringFilter<"Management"> | string
    originPasture?: StringFilter<"Management"> | string
    destinationPasture?: StringFilter<"Management"> | string
    movementDate?: DateTimeFilter<"Management"> | Date | string
    reason?: StringFilter<"Management"> | string
    employee?: StringFilter<"Management"> | string
    batchId?: StringNullableFilter<"Management"> | string | null
    batchTotal?: IntNullableFilter<"Management"> | number | null
    farmId?: StringFilter<"Management"> | string
    createdAt?: DateTimeFilter<"Management"> | Date | string
  }, "id">

  export type ManagementOrderByWithAggregationInput = {
    id?: SortOrder
    animalId?: SortOrder
    originPasture?: SortOrder
    destinationPasture?: SortOrder
    movementDate?: SortOrder
    reason?: SortOrder
    employee?: SortOrder
    batchId?: SortOrder
    batchTotal?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    _count?: ManagementCountOrderByAggregateInput
    _avg?: ManagementAvgOrderByAggregateInput
    _max?: ManagementMaxOrderByAggregateInput
    _min?: ManagementMinOrderByAggregateInput
    _sum?: ManagementSumOrderByAggregateInput
  }

  export type ManagementScalarWhereWithAggregatesInput = {
    AND?: ManagementScalarWhereWithAggregatesInput | ManagementScalarWhereWithAggregatesInput[]
    OR?: ManagementScalarWhereWithAggregatesInput[]
    NOT?: ManagementScalarWhereWithAggregatesInput | ManagementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Management"> | string
    animalId?: StringWithAggregatesFilter<"Management"> | string
    originPasture?: StringWithAggregatesFilter<"Management"> | string
    destinationPasture?: StringWithAggregatesFilter<"Management"> | string
    movementDate?: DateTimeWithAggregatesFilter<"Management"> | Date | string
    reason?: StringWithAggregatesFilter<"Management"> | string
    employee?: StringWithAggregatesFilter<"Management"> | string
    batchId?: StringNullableWithAggregatesFilter<"Management"> | string | null
    batchTotal?: IntNullableWithAggregatesFilter<"Management"> | number | null
    farmId?: StringWithAggregatesFilter<"Management"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Management"> | Date | string
  }

  export type MortalityWhereInput = {
    AND?: MortalityWhereInput | MortalityWhereInput[]
    OR?: MortalityWhereInput[]
    NOT?: MortalityWhereInput | MortalityWhereInput[]
    id?: StringFilter<"Mortality"> | string
    animalId?: StringFilter<"Mortality"> | string
    deathDate?: DateTimeFilter<"Mortality"> | Date | string
    deathTime?: StringNullableFilter<"Mortality"> | string | null
    deathLocation?: StringFilter<"Mortality"> | string
    causeOfDeath?: StringFilter<"Mortality"> | string
    severity?: StringNullableFilter<"Mortality"> | string | null
    necropsy?: BoolFilter<"Mortality"> | boolean
    disposal?: StringNullableFilter<"Mortality"> | string | null
    photos?: StringNullableListFilter<"Mortality">
    origin?: StringNullableFilter<"Mortality"> | string | null
    birthId?: StringNullableFilter<"Mortality"> | string | null
    notes?: StringNullableFilter<"Mortality"> | string | null
    farmId?: StringFilter<"Mortality"> | string
    createdAt?: DateTimeFilter<"Mortality"> | Date | string
    updatedAt?: DateTimeFilter<"Mortality"> | Date | string
  }

  export type MortalityOrderByWithRelationInput = {
    id?: SortOrder
    animalId?: SortOrder
    deathDate?: SortOrder
    deathTime?: SortOrder
    deathLocation?: SortOrder
    causeOfDeath?: SortOrder
    severity?: SortOrder
    necropsy?: SortOrder
    disposal?: SortOrder
    photos?: SortOrder
    origin?: SortOrder
    birthId?: SortOrder
    notes?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MortalityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MortalityWhereInput | MortalityWhereInput[]
    OR?: MortalityWhereInput[]
    NOT?: MortalityWhereInput | MortalityWhereInput[]
    animalId?: StringFilter<"Mortality"> | string
    deathDate?: DateTimeFilter<"Mortality"> | Date | string
    deathTime?: StringNullableFilter<"Mortality"> | string | null
    deathLocation?: StringFilter<"Mortality"> | string
    causeOfDeath?: StringFilter<"Mortality"> | string
    severity?: StringNullableFilter<"Mortality"> | string | null
    necropsy?: BoolFilter<"Mortality"> | boolean
    disposal?: StringNullableFilter<"Mortality"> | string | null
    photos?: StringNullableListFilter<"Mortality">
    origin?: StringNullableFilter<"Mortality"> | string | null
    birthId?: StringNullableFilter<"Mortality"> | string | null
    notes?: StringNullableFilter<"Mortality"> | string | null
    farmId?: StringFilter<"Mortality"> | string
    createdAt?: DateTimeFilter<"Mortality"> | Date | string
    updatedAt?: DateTimeFilter<"Mortality"> | Date | string
  }, "id">

  export type MortalityOrderByWithAggregationInput = {
    id?: SortOrder
    animalId?: SortOrder
    deathDate?: SortOrder
    deathTime?: SortOrder
    deathLocation?: SortOrder
    causeOfDeath?: SortOrder
    severity?: SortOrder
    necropsy?: SortOrder
    disposal?: SortOrder
    photos?: SortOrder
    origin?: SortOrder
    birthId?: SortOrder
    notes?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MortalityCountOrderByAggregateInput
    _max?: MortalityMaxOrderByAggregateInput
    _min?: MortalityMinOrderByAggregateInput
  }

  export type MortalityScalarWhereWithAggregatesInput = {
    AND?: MortalityScalarWhereWithAggregatesInput | MortalityScalarWhereWithAggregatesInput[]
    OR?: MortalityScalarWhereWithAggregatesInput[]
    NOT?: MortalityScalarWhereWithAggregatesInput | MortalityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Mortality"> | string
    animalId?: StringWithAggregatesFilter<"Mortality"> | string
    deathDate?: DateTimeWithAggregatesFilter<"Mortality"> | Date | string
    deathTime?: StringNullableWithAggregatesFilter<"Mortality"> | string | null
    deathLocation?: StringWithAggregatesFilter<"Mortality"> | string
    causeOfDeath?: StringWithAggregatesFilter<"Mortality"> | string
    severity?: StringNullableWithAggregatesFilter<"Mortality"> | string | null
    necropsy?: BoolWithAggregatesFilter<"Mortality"> | boolean
    disposal?: StringNullableWithAggregatesFilter<"Mortality"> | string | null
    photos?: StringNullableListFilter<"Mortality">
    origin?: StringNullableWithAggregatesFilter<"Mortality"> | string | null
    birthId?: StringNullableWithAggregatesFilter<"Mortality"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Mortality"> | string | null
    farmId?: StringWithAggregatesFilter<"Mortality"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Mortality"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Mortality"> | Date | string
  }

  export type PasswordResetTokenWhereInput = {
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    id?: StringFilter<"PasswordResetToken"> | string
    userId?: StringFilter<"PasswordResetToken"> | string
    code?: StringFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    used?: BoolFilter<"PasswordResetToken"> | boolean
    farmId?: StringFilter<"PasswordResetToken"> | string
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
  }

  export type PasswordResetTokenOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    userId?: StringFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    used?: BoolFilter<"PasswordResetToken"> | boolean
    farmId?: StringFilter<"PasswordResetToken"> | string
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
  }, "id" | "code">

  export type PasswordResetTokenOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    _count?: PasswordResetTokenCountOrderByAggregateInput
    _max?: PasswordResetTokenMaxOrderByAggregateInput
    _min?: PasswordResetTokenMinOrderByAggregateInput
  }

  export type PasswordResetTokenScalarWhereWithAggregatesInput = {
    AND?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    OR?: PasswordResetTokenScalarWhereWithAggregatesInput[]
    NOT?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    userId?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    code?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
    used?: BoolWithAggregatesFilter<"PasswordResetToken"> | boolean
    farmId?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
  }

  export type FarmCreateInput = {
    id?: string
    name: string
    location: string
    cnpj?: string | null
    logoUrl?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutFarmInput
    animals?: AnimalCreateNestedManyWithoutFarmInput
    pastures?: PastureCreateNestedManyWithoutFarmInput
  }

  export type FarmUncheckedCreateInput = {
    id?: string
    name: string
    location: string
    cnpj?: string | null
    logoUrl?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutFarmInput
    animals?: AnimalUncheckedCreateNestedManyWithoutFarmInput
    pastures?: PastureUncheckedCreateNestedManyWithoutFarmInput
  }

  export type FarmUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutFarmNestedInput
    animals?: AnimalUpdateManyWithoutFarmNestedInput
    pastures?: PastureUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutFarmNestedInput
    animals?: AnimalUncheckedUpdateManyWithoutFarmNestedInput
    pastures?: PastureUncheckedUpdateManyWithoutFarmNestedInput
  }

  export type FarmCreateManyInput = {
    id?: string
    name: string
    location: string
    cnpj?: string | null
    logoUrl?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FarmUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    fullName: string
    email: string
    phone?: string | null
    password: string
    role?: $Enums.Permission
    active?: boolean
    crv?: string | null
    crmv?: string | null
    graduationDate?: Date | string | null
    specialties?: UserCreatespecialtiesInput | string[]
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    farm: FarmCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    fullName: string
    email: string
    phone?: string | null
    password: string
    role?: $Enums.Permission
    active?: boolean
    crv?: string | null
    crmv?: string | null
    graduationDate?: Date | string | null
    specialties?: UserCreatespecialtiesInput | string[]
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    farmId: string
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumPermissionFieldUpdateOperationsInput | $Enums.Permission
    active?: BoolFieldUpdateOperationsInput | boolean
    crv?: NullableStringFieldUpdateOperationsInput | string | null
    crmv?: NullableStringFieldUpdateOperationsInput | string | null
    graduationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    specialties?: UserUpdatespecialtiesInput | string[]
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumPermissionFieldUpdateOperationsInput | $Enums.Permission
    active?: BoolFieldUpdateOperationsInput | boolean
    crv?: NullableStringFieldUpdateOperationsInput | string | null
    crmv?: NullableStringFieldUpdateOperationsInput | string | null
    graduationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    specialties?: UserUpdatespecialtiesInput | string[]
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    farmId?: StringFieldUpdateOperationsInput | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    fullName: string
    email: string
    phone?: string | null
    password: string
    role?: $Enums.Permission
    active?: boolean
    crv?: string | null
    crmv?: string | null
    graduationDate?: Date | string | null
    specialties?: UserCreatespecialtiesInput | string[]
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    farmId: string
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumPermissionFieldUpdateOperationsInput | $Enums.Permission
    active?: BoolFieldUpdateOperationsInput | boolean
    crv?: NullableStringFieldUpdateOperationsInput | string | null
    crmv?: NullableStringFieldUpdateOperationsInput | string | null
    graduationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    specialties?: UserUpdatespecialtiesInput | string[]
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumPermissionFieldUpdateOperationsInput | $Enums.Permission
    active?: BoolFieldUpdateOperationsInput | boolean
    crv?: NullableStringFieldUpdateOperationsInput | string | null
    crmv?: NullableStringFieldUpdateOperationsInput | string | null
    graduationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    specialties?: UserUpdatespecialtiesInput | string[]
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    farmId?: StringFieldUpdateOperationsInput | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnimalCreateInput = {
    id?: string
    chipId: string
    currentEarTag?: string | null
    name: string
    breed: string
    gender: string
    birthDate: Date | string
    sireId?: string | null
    damId?: string | null
    pastureId?: string | null
    pastureName?: string | null
    status?: string
    deathDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    earTagHistory?: EarTagHistoryCreateNestedManyWithoutAnimalInput
    farm: FarmCreateNestedOneWithoutAnimalsInput
  }

  export type AnimalUncheckedCreateInput = {
    id?: string
    chipId: string
    currentEarTag?: string | null
    name: string
    breed: string
    gender: string
    birthDate: Date | string
    sireId?: string | null
    damId?: string | null
    pastureId?: string | null
    pastureName?: string | null
    status?: string
    deathDate?: Date | string | null
    farmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    earTagHistory?: EarTagHistoryUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalUpdateInput = {
    chipId?: StringFieldUpdateOperationsInput | string
    currentEarTag?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    sireId?: NullableStringFieldUpdateOperationsInput | string | null
    damId?: NullableStringFieldUpdateOperationsInput | string | null
    pastureId?: NullableStringFieldUpdateOperationsInput | string | null
    pastureName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    earTagHistory?: EarTagHistoryUpdateManyWithoutAnimalNestedInput
    farm?: FarmUpdateOneRequiredWithoutAnimalsNestedInput
  }

  export type AnimalUncheckedUpdateInput = {
    chipId?: StringFieldUpdateOperationsInput | string
    currentEarTag?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    sireId?: NullableStringFieldUpdateOperationsInput | string | null
    damId?: NullableStringFieldUpdateOperationsInput | string | null
    pastureId?: NullableStringFieldUpdateOperationsInput | string | null
    pastureName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    earTagHistory?: EarTagHistoryUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalCreateManyInput = {
    id?: string
    chipId: string
    currentEarTag?: string | null
    name: string
    breed: string
    gender: string
    birthDate: Date | string
    sireId?: string | null
    damId?: string | null
    pastureId?: string | null
    pastureName?: string | null
    status?: string
    deathDate?: Date | string | null
    farmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnimalUpdateManyMutationInput = {
    chipId?: StringFieldUpdateOperationsInput | string
    currentEarTag?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    sireId?: NullableStringFieldUpdateOperationsInput | string | null
    damId?: NullableStringFieldUpdateOperationsInput | string | null
    pastureId?: NullableStringFieldUpdateOperationsInput | string | null
    pastureName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnimalUncheckedUpdateManyInput = {
    chipId?: StringFieldUpdateOperationsInput | string
    currentEarTag?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    sireId?: NullableStringFieldUpdateOperationsInput | string | null
    damId?: NullableStringFieldUpdateOperationsInput | string | null
    pastureId?: NullableStringFieldUpdateOperationsInput | string | null
    pastureName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EarTagHistoryCreateInput = {
    id?: string
    earTagNumber: string
    placementDate: Date | string
    removalDate?: Date | string | null
    reason?: string | null
    farmId: string
    createdAt?: Date | string
    animal: AnimalCreateNestedOneWithoutEarTagHistoryInput
  }

  export type EarTagHistoryUncheckedCreateInput = {
    id?: string
    earTagNumber: string
    animalId: string
    placementDate: Date | string
    removalDate?: Date | string | null
    reason?: string | null
    farmId: string
    createdAt?: Date | string
  }

  export type EarTagHistoryUpdateInput = {
    earTagNumber?: StringFieldUpdateOperationsInput | string
    placementDate?: DateTimeFieldUpdateOperationsInput | Date | string
    removalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    animal?: AnimalUpdateOneRequiredWithoutEarTagHistoryNestedInput
  }

  export type EarTagHistoryUncheckedUpdateInput = {
    earTagNumber?: StringFieldUpdateOperationsInput | string
    animalId?: StringFieldUpdateOperationsInput | string
    placementDate?: DateTimeFieldUpdateOperationsInput | Date | string
    removalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EarTagHistoryCreateManyInput = {
    id?: string
    earTagNumber: string
    animalId: string
    placementDate: Date | string
    removalDate?: Date | string | null
    reason?: string | null
    farmId: string
    createdAt?: Date | string
  }

  export type EarTagHistoryUpdateManyMutationInput = {
    earTagNumber?: StringFieldUpdateOperationsInput | string
    placementDate?: DateTimeFieldUpdateOperationsInput | Date | string
    removalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EarTagHistoryUncheckedUpdateManyInput = {
    earTagNumber?: StringFieldUpdateOperationsInput | string
    animalId?: StringFieldUpdateOperationsInput | string
    placementDate?: DateTimeFieldUpdateOperationsInput | Date | string
    removalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PastureCreateInput = {
    id?: string
    name: string
    hectares: number
    type: string
    animalCapacity: number
    currentAnimals?: number
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    farm: FarmCreateNestedOneWithoutPasturesInput
  }

  export type PastureUncheckedCreateInput = {
    id?: string
    name: string
    hectares: number
    type: string
    animalCapacity: number
    currentAnimals?: number
    active?: boolean
    farmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PastureUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    hectares?: FloatFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    animalCapacity?: IntFieldUpdateOperationsInput | number
    currentAnimals?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutPasturesNestedInput
  }

  export type PastureUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    hectares?: FloatFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    animalCapacity?: IntFieldUpdateOperationsInput | number
    currentAnimals?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PastureCreateManyInput = {
    id?: string
    name: string
    hectares: number
    type: string
    animalCapacity: number
    currentAnimals?: number
    active?: boolean
    farmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PastureUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    hectares?: FloatFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    animalCapacity?: IntFieldUpdateOperationsInput | number
    currentAnimals?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PastureUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    hectares?: FloatFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    animalCapacity?: IntFieldUpdateOperationsInput | number
    currentAnimals?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EstrusCreateInput = {
    id?: string
    animalId: string
    date: Date | string
    intensity: string
    detectedBy: string
    nextEstrus: Date | string
    farmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EstrusUncheckedCreateInput = {
    id?: string
    animalId: string
    date: Date | string
    intensity: string
    detectedBy: string
    nextEstrus: Date | string
    farmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EstrusUpdateInput = {
    animalId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    intensity?: StringFieldUpdateOperationsInput | string
    detectedBy?: StringFieldUpdateOperationsInput | string
    nextEstrus?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EstrusUncheckedUpdateInput = {
    animalId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    intensity?: StringFieldUpdateOperationsInput | string
    detectedBy?: StringFieldUpdateOperationsInput | string
    nextEstrus?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EstrusCreateManyInput = {
    id?: string
    animalId: string
    date: Date | string
    intensity: string
    detectedBy: string
    nextEstrus: Date | string
    farmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EstrusUpdateManyMutationInput = {
    animalId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    intensity?: StringFieldUpdateOperationsInput | string
    detectedBy?: StringFieldUpdateOperationsInput | string
    nextEstrus?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EstrusUncheckedUpdateManyInput = {
    animalId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    intensity?: StringFieldUpdateOperationsInput | string
    detectedBy?: StringFieldUpdateOperationsInput | string
    nextEstrus?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PregnancyCreateInput = {
    id?: string
    animalId: string
    currentStatus?: string
    currentStatusDate?: Date | string
    farmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    attempts?: AttemptCreateNestedManyWithoutPregnancyInput
  }

  export type PregnancyUncheckedCreateInput = {
    id?: string
    animalId: string
    currentStatus?: string
    currentStatusDate?: Date | string
    farmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    attempts?: AttemptUncheckedCreateNestedManyWithoutPregnancyInput
  }

  export type PregnancyUpdateInput = {
    animalId?: StringFieldUpdateOperationsInput | string
    currentStatus?: StringFieldUpdateOperationsInput | string
    currentStatusDate?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: AttemptUpdateManyWithoutPregnancyNestedInput
  }

  export type PregnancyUncheckedUpdateInput = {
    animalId?: StringFieldUpdateOperationsInput | string
    currentStatus?: StringFieldUpdateOperationsInput | string
    currentStatusDate?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempts?: AttemptUncheckedUpdateManyWithoutPregnancyNestedInput
  }

  export type PregnancyCreateManyInput = {
    id?: string
    animalId: string
    currentStatus?: string
    currentStatusDate?: Date | string
    farmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PregnancyUpdateManyMutationInput = {
    animalId?: StringFieldUpdateOperationsInput | string
    currentStatus?: StringFieldUpdateOperationsInput | string
    currentStatusDate?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PregnancyUncheckedUpdateManyInput = {
    animalId?: StringFieldUpdateOperationsInput | string
    currentStatus?: StringFieldUpdateOperationsInput | string
    currentStatusDate?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttemptCreateInput = {
    id?: string
    number: number
    matingDate: Date | string
    matingType: string
    bullId?: string | null
    semenName?: string | null
    technician?: string | null
    estimatedBirthDate: Date | string
    birthId?: string | null
    attemptStatus?: string
    notes?: string | null
    createdAt?: Date | string
    pregnancy: PregnancyCreateNestedOneWithoutAttemptsInput
    ultrasounds?: UltrasoundCreateNestedManyWithoutAttemptInput
  }

  export type AttemptUncheckedCreateInput = {
    id?: string
    number: number
    pregnancyId: string
    matingDate: Date | string
    matingType: string
    bullId?: string | null
    semenName?: string | null
    technician?: string | null
    estimatedBirthDate: Date | string
    birthId?: string | null
    attemptStatus?: string
    notes?: string | null
    createdAt?: Date | string
    ultrasounds?: UltrasoundUncheckedCreateNestedManyWithoutAttemptInput
  }

  export type AttemptUpdateInput = {
    number?: IntFieldUpdateOperationsInput | number
    matingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    matingType?: StringFieldUpdateOperationsInput | string
    bullId?: NullableStringFieldUpdateOperationsInput | string | null
    semenName?: NullableStringFieldUpdateOperationsInput | string | null
    technician?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedBirthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    birthId?: NullableStringFieldUpdateOperationsInput | string | null
    attemptStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pregnancy?: PregnancyUpdateOneRequiredWithoutAttemptsNestedInput
    ultrasounds?: UltrasoundUpdateManyWithoutAttemptNestedInput
  }

  export type AttemptUncheckedUpdateInput = {
    number?: IntFieldUpdateOperationsInput | number
    pregnancyId?: StringFieldUpdateOperationsInput | string
    matingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    matingType?: StringFieldUpdateOperationsInput | string
    bullId?: NullableStringFieldUpdateOperationsInput | string | null
    semenName?: NullableStringFieldUpdateOperationsInput | string | null
    technician?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedBirthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    birthId?: NullableStringFieldUpdateOperationsInput | string | null
    attemptStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ultrasounds?: UltrasoundUncheckedUpdateManyWithoutAttemptNestedInput
  }

  export type AttemptCreateManyInput = {
    id?: string
    number: number
    pregnancyId: string
    matingDate: Date | string
    matingType: string
    bullId?: string | null
    semenName?: string | null
    technician?: string | null
    estimatedBirthDate: Date | string
    birthId?: string | null
    attemptStatus?: string
    notes?: string | null
    createdAt?: Date | string
  }

  export type AttemptUpdateManyMutationInput = {
    number?: IntFieldUpdateOperationsInput | number
    matingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    matingType?: StringFieldUpdateOperationsInput | string
    bullId?: NullableStringFieldUpdateOperationsInput | string | null
    semenName?: NullableStringFieldUpdateOperationsInput | string | null
    technician?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedBirthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    birthId?: NullableStringFieldUpdateOperationsInput | string | null
    attemptStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttemptUncheckedUpdateManyInput = {
    number?: IntFieldUpdateOperationsInput | number
    pregnancyId?: StringFieldUpdateOperationsInput | string
    matingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    matingType?: StringFieldUpdateOperationsInput | string
    bullId?: NullableStringFieldUpdateOperationsInput | string | null
    semenName?: NullableStringFieldUpdateOperationsInput | string | null
    technician?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedBirthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    birthId?: NullableStringFieldUpdateOperationsInput | string | null
    attemptStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UltrasoundCreateInput = {
    id?: string
    days: number
    result: string
    notes?: string | null
    veterinarianId?: string | null
    ultrasoundDate?: Date | string
    attempt: AttemptCreateNestedOneWithoutUltrasoundsInput
  }

  export type UltrasoundUncheckedCreateInput = {
    id?: string
    attemptId: string
    days: number
    result: string
    notes?: string | null
    veterinarianId?: string | null
    ultrasoundDate?: Date | string
  }

  export type UltrasoundUpdateInput = {
    days?: IntFieldUpdateOperationsInput | number
    result?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    veterinarianId?: NullableStringFieldUpdateOperationsInput | string | null
    ultrasoundDate?: DateTimeFieldUpdateOperationsInput | Date | string
    attempt?: AttemptUpdateOneRequiredWithoutUltrasoundsNestedInput
  }

  export type UltrasoundUncheckedUpdateInput = {
    attemptId?: StringFieldUpdateOperationsInput | string
    days?: IntFieldUpdateOperationsInput | number
    result?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    veterinarianId?: NullableStringFieldUpdateOperationsInput | string | null
    ultrasoundDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UltrasoundCreateManyInput = {
    id?: string
    attemptId: string
    days: number
    result: string
    notes?: string | null
    veterinarianId?: string | null
    ultrasoundDate?: Date | string
  }

  export type UltrasoundUpdateManyMutationInput = {
    days?: IntFieldUpdateOperationsInput | number
    result?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    veterinarianId?: NullableStringFieldUpdateOperationsInput | string | null
    ultrasoundDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UltrasoundUncheckedUpdateManyInput = {
    attemptId?: StringFieldUpdateOperationsInput | string
    days?: IntFieldUpdateOperationsInput | number
    result?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    veterinarianId?: NullableStringFieldUpdateOperationsInput | string | null
    ultrasoundDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BirthCreateInput = {
    id?: string
    damId: string
    pregnancyId?: string | null
    birthDate: Date | string
    birthTime?: string | null
    birthType: string
    veterinarianId?: string | null
    veterinarianName?: string | null
    veterinarianCrv?: string | null
    calfGender?: string | null
    calfWeight?: number | null
    calfEarTag?: string | null
    calfChip?: string | null
    calfStatus?: string
    situation?: string
    deathReason?: string | null
    notes?: string | null
    farmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BirthUncheckedCreateInput = {
    id?: string
    damId: string
    pregnancyId?: string | null
    birthDate: Date | string
    birthTime?: string | null
    birthType: string
    veterinarianId?: string | null
    veterinarianName?: string | null
    veterinarianCrv?: string | null
    calfGender?: string | null
    calfWeight?: number | null
    calfEarTag?: string | null
    calfChip?: string | null
    calfStatus?: string
    situation?: string
    deathReason?: string | null
    notes?: string | null
    farmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BirthUpdateInput = {
    damId?: StringFieldUpdateOperationsInput | string
    pregnancyId?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    birthTime?: NullableStringFieldUpdateOperationsInput | string | null
    birthType?: StringFieldUpdateOperationsInput | string
    veterinarianId?: NullableStringFieldUpdateOperationsInput | string | null
    veterinarianName?: NullableStringFieldUpdateOperationsInput | string | null
    veterinarianCrv?: NullableStringFieldUpdateOperationsInput | string | null
    calfGender?: NullableStringFieldUpdateOperationsInput | string | null
    calfWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    calfEarTag?: NullableStringFieldUpdateOperationsInput | string | null
    calfChip?: NullableStringFieldUpdateOperationsInput | string | null
    calfStatus?: StringFieldUpdateOperationsInput | string
    situation?: StringFieldUpdateOperationsInput | string
    deathReason?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BirthUncheckedUpdateInput = {
    damId?: StringFieldUpdateOperationsInput | string
    pregnancyId?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    birthTime?: NullableStringFieldUpdateOperationsInput | string | null
    birthType?: StringFieldUpdateOperationsInput | string
    veterinarianId?: NullableStringFieldUpdateOperationsInput | string | null
    veterinarianName?: NullableStringFieldUpdateOperationsInput | string | null
    veterinarianCrv?: NullableStringFieldUpdateOperationsInput | string | null
    calfGender?: NullableStringFieldUpdateOperationsInput | string | null
    calfWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    calfEarTag?: NullableStringFieldUpdateOperationsInput | string | null
    calfChip?: NullableStringFieldUpdateOperationsInput | string | null
    calfStatus?: StringFieldUpdateOperationsInput | string
    situation?: StringFieldUpdateOperationsInput | string
    deathReason?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BirthCreateManyInput = {
    id?: string
    damId: string
    pregnancyId?: string | null
    birthDate: Date | string
    birthTime?: string | null
    birthType: string
    veterinarianId?: string | null
    veterinarianName?: string | null
    veterinarianCrv?: string | null
    calfGender?: string | null
    calfWeight?: number | null
    calfEarTag?: string | null
    calfChip?: string | null
    calfStatus?: string
    situation?: string
    deathReason?: string | null
    notes?: string | null
    farmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BirthUpdateManyMutationInput = {
    damId?: StringFieldUpdateOperationsInput | string
    pregnancyId?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    birthTime?: NullableStringFieldUpdateOperationsInput | string | null
    birthType?: StringFieldUpdateOperationsInput | string
    veterinarianId?: NullableStringFieldUpdateOperationsInput | string | null
    veterinarianName?: NullableStringFieldUpdateOperationsInput | string | null
    veterinarianCrv?: NullableStringFieldUpdateOperationsInput | string | null
    calfGender?: NullableStringFieldUpdateOperationsInput | string | null
    calfWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    calfEarTag?: NullableStringFieldUpdateOperationsInput | string | null
    calfChip?: NullableStringFieldUpdateOperationsInput | string | null
    calfStatus?: StringFieldUpdateOperationsInput | string
    situation?: StringFieldUpdateOperationsInput | string
    deathReason?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BirthUncheckedUpdateManyInput = {
    damId?: StringFieldUpdateOperationsInput | string
    pregnancyId?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    birthTime?: NullableStringFieldUpdateOperationsInput | string | null
    birthType?: StringFieldUpdateOperationsInput | string
    veterinarianId?: NullableStringFieldUpdateOperationsInput | string | null
    veterinarianName?: NullableStringFieldUpdateOperationsInput | string | null
    veterinarianCrv?: NullableStringFieldUpdateOperationsInput | string | null
    calfGender?: NullableStringFieldUpdateOperationsInput | string | null
    calfWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    calfEarTag?: NullableStringFieldUpdateOperationsInput | string | null
    calfChip?: NullableStringFieldUpdateOperationsInput | string | null
    calfStatus?: StringFieldUpdateOperationsInput | string
    situation?: StringFieldUpdateOperationsInput | string
    deathReason?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VaccinationCreateInput = {
    id?: string
    animalId: string
    vaccineType: string
    brand: string
    batch: string
    vaccinationDate: Date | string
    expirationDate: Date | string
    nextDoseDate?: Date | string | null
    photoUrl?: string | null
    reaction?: string | null
    veterinarianId?: string | null
    farmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VaccinationUncheckedCreateInput = {
    id?: string
    animalId: string
    vaccineType: string
    brand: string
    batch: string
    vaccinationDate: Date | string
    expirationDate: Date | string
    nextDoseDate?: Date | string | null
    photoUrl?: string | null
    reaction?: string | null
    veterinarianId?: string | null
    farmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VaccinationUpdateInput = {
    animalId?: StringFieldUpdateOperationsInput | string
    vaccineType?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    batch?: StringFieldUpdateOperationsInput | string
    vaccinationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDoseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    reaction?: NullableStringFieldUpdateOperationsInput | string | null
    veterinarianId?: NullableStringFieldUpdateOperationsInput | string | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VaccinationUncheckedUpdateInput = {
    animalId?: StringFieldUpdateOperationsInput | string
    vaccineType?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    batch?: StringFieldUpdateOperationsInput | string
    vaccinationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDoseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    reaction?: NullableStringFieldUpdateOperationsInput | string | null
    veterinarianId?: NullableStringFieldUpdateOperationsInput | string | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VaccinationCreateManyInput = {
    id?: string
    animalId: string
    vaccineType: string
    brand: string
    batch: string
    vaccinationDate: Date | string
    expirationDate: Date | string
    nextDoseDate?: Date | string | null
    photoUrl?: string | null
    reaction?: string | null
    veterinarianId?: string | null
    farmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VaccinationUpdateManyMutationInput = {
    animalId?: StringFieldUpdateOperationsInput | string
    vaccineType?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    batch?: StringFieldUpdateOperationsInput | string
    vaccinationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDoseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    reaction?: NullableStringFieldUpdateOperationsInput | string | null
    veterinarianId?: NullableStringFieldUpdateOperationsInput | string | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VaccinationUncheckedUpdateManyInput = {
    animalId?: StringFieldUpdateOperationsInput | string
    vaccineType?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    batch?: StringFieldUpdateOperationsInput | string
    vaccinationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextDoseDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    reaction?: NullableStringFieldUpdateOperationsInput | string | null
    veterinarianId?: NullableStringFieldUpdateOperationsInput | string | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManagementCreateInput = {
    id?: string
    animalId: string
    originPasture: string
    destinationPasture: string
    movementDate: Date | string
    reason: string
    employee: string
    batchId?: string | null
    batchTotal?: number | null
    farmId: string
    createdAt?: Date | string
  }

  export type ManagementUncheckedCreateInput = {
    id?: string
    animalId: string
    originPasture: string
    destinationPasture: string
    movementDate: Date | string
    reason: string
    employee: string
    batchId?: string | null
    batchTotal?: number | null
    farmId: string
    createdAt?: Date | string
  }

  export type ManagementUpdateInput = {
    animalId?: StringFieldUpdateOperationsInput | string
    originPasture?: StringFieldUpdateOperationsInput | string
    destinationPasture?: StringFieldUpdateOperationsInput | string
    movementDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    employee?: StringFieldUpdateOperationsInput | string
    batchId?: NullableStringFieldUpdateOperationsInput | string | null
    batchTotal?: NullableIntFieldUpdateOperationsInput | number | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManagementUncheckedUpdateInput = {
    animalId?: StringFieldUpdateOperationsInput | string
    originPasture?: StringFieldUpdateOperationsInput | string
    destinationPasture?: StringFieldUpdateOperationsInput | string
    movementDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    employee?: StringFieldUpdateOperationsInput | string
    batchId?: NullableStringFieldUpdateOperationsInput | string | null
    batchTotal?: NullableIntFieldUpdateOperationsInput | number | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManagementCreateManyInput = {
    id?: string
    animalId: string
    originPasture: string
    destinationPasture: string
    movementDate: Date | string
    reason: string
    employee: string
    batchId?: string | null
    batchTotal?: number | null
    farmId: string
    createdAt?: Date | string
  }

  export type ManagementUpdateManyMutationInput = {
    animalId?: StringFieldUpdateOperationsInput | string
    originPasture?: StringFieldUpdateOperationsInput | string
    destinationPasture?: StringFieldUpdateOperationsInput | string
    movementDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    employee?: StringFieldUpdateOperationsInput | string
    batchId?: NullableStringFieldUpdateOperationsInput | string | null
    batchTotal?: NullableIntFieldUpdateOperationsInput | number | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManagementUncheckedUpdateManyInput = {
    animalId?: StringFieldUpdateOperationsInput | string
    originPasture?: StringFieldUpdateOperationsInput | string
    destinationPasture?: StringFieldUpdateOperationsInput | string
    movementDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    employee?: StringFieldUpdateOperationsInput | string
    batchId?: NullableStringFieldUpdateOperationsInput | string | null
    batchTotal?: NullableIntFieldUpdateOperationsInput | number | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MortalityCreateInput = {
    id?: string
    animalId: string
    deathDate: Date | string
    deathTime?: string | null
    deathLocation: string
    causeOfDeath: string
    severity?: string | null
    necropsy?: boolean
    disposal?: string | null
    photos?: MortalityCreatephotosInput | string[]
    origin?: string | null
    birthId?: string | null
    notes?: string | null
    farmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MortalityUncheckedCreateInput = {
    id?: string
    animalId: string
    deathDate: Date | string
    deathTime?: string | null
    deathLocation: string
    causeOfDeath: string
    severity?: string | null
    necropsy?: boolean
    disposal?: string | null
    photos?: MortalityCreatephotosInput | string[]
    origin?: string | null
    birthId?: string | null
    notes?: string | null
    farmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MortalityUpdateInput = {
    animalId?: StringFieldUpdateOperationsInput | string
    deathDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deathTime?: NullableStringFieldUpdateOperationsInput | string | null
    deathLocation?: StringFieldUpdateOperationsInput | string
    causeOfDeath?: StringFieldUpdateOperationsInput | string
    severity?: NullableStringFieldUpdateOperationsInput | string | null
    necropsy?: BoolFieldUpdateOperationsInput | boolean
    disposal?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: MortalityUpdatephotosInput | string[]
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    birthId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MortalityUncheckedUpdateInput = {
    animalId?: StringFieldUpdateOperationsInput | string
    deathDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deathTime?: NullableStringFieldUpdateOperationsInput | string | null
    deathLocation?: StringFieldUpdateOperationsInput | string
    causeOfDeath?: StringFieldUpdateOperationsInput | string
    severity?: NullableStringFieldUpdateOperationsInput | string | null
    necropsy?: BoolFieldUpdateOperationsInput | boolean
    disposal?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: MortalityUpdatephotosInput | string[]
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    birthId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MortalityCreateManyInput = {
    id?: string
    animalId: string
    deathDate: Date | string
    deathTime?: string | null
    deathLocation: string
    causeOfDeath: string
    severity?: string | null
    necropsy?: boolean
    disposal?: string | null
    photos?: MortalityCreatephotosInput | string[]
    origin?: string | null
    birthId?: string | null
    notes?: string | null
    farmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MortalityUpdateManyMutationInput = {
    animalId?: StringFieldUpdateOperationsInput | string
    deathDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deathTime?: NullableStringFieldUpdateOperationsInput | string | null
    deathLocation?: StringFieldUpdateOperationsInput | string
    causeOfDeath?: StringFieldUpdateOperationsInput | string
    severity?: NullableStringFieldUpdateOperationsInput | string | null
    necropsy?: BoolFieldUpdateOperationsInput | boolean
    disposal?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: MortalityUpdatephotosInput | string[]
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    birthId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MortalityUncheckedUpdateManyInput = {
    animalId?: StringFieldUpdateOperationsInput | string
    deathDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deathTime?: NullableStringFieldUpdateOperationsInput | string | null
    deathLocation?: StringFieldUpdateOperationsInput | string
    causeOfDeath?: StringFieldUpdateOperationsInput | string
    severity?: NullableStringFieldUpdateOperationsInput | string | null
    necropsy?: BoolFieldUpdateOperationsInput | boolean
    disposal?: NullableStringFieldUpdateOperationsInput | string | null
    photos?: MortalityUpdatephotosInput | string[]
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    birthId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenCreateInput = {
    id?: string
    userId: string
    code: string
    expiresAt: Date | string
    used?: boolean
    farmId: string
    createdAt?: Date | string
  }

  export type PasswordResetTokenUncheckedCreateInput = {
    id?: string
    userId: string
    code: string
    expiresAt: Date | string
    used?: boolean
    farmId: string
    createdAt?: Date | string
  }

  export type PasswordResetTokenUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenCreateManyInput = {
    id?: string
    userId: string
    code: string
    expiresAt: Date | string
    used?: boolean
    farmId: string
    createdAt?: Date | string
  }

  export type PasswordResetTokenUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type AnimalListRelationFilter = {
    every?: AnimalWhereInput
    some?: AnimalWhereInput
    none?: AnimalWhereInput
  }

  export type PastureListRelationFilter = {
    every?: PastureWhereInput
    some?: PastureWhereInput
    none?: PastureWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnimalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PastureOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FarmCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    cnpj?: SortOrder
    logoUrl?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FarmMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    cnpj?: SortOrder
    logoUrl?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FarmMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    cnpj?: SortOrder
    logoUrl?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumPermissionFilter<$PrismaModel = never> = {
    equals?: $Enums.Permission | EnumPermissionFieldRefInput<$PrismaModel>
    in?: $Enums.Permission[] | ListEnumPermissionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Permission[] | ListEnumPermissionFieldRefInput<$PrismaModel>
    not?: NestedEnumPermissionFilter<$PrismaModel> | $Enums.Permission
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type FarmScalarRelationFilter = {
    is?: FarmWhereInput
    isNot?: FarmWhereInput
  }

  export type UserFarmIdEmailCompoundUniqueInput = {
    farmId: string
    email: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    active?: SortOrder
    crv?: SortOrder
    crmv?: SortOrder
    graduationDate?: SortOrder
    specialties?: SortOrder
    resetPasswordToken?: SortOrder
    resetPasswordExpires?: SortOrder
    farmId?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    active?: SortOrder
    crv?: SortOrder
    crmv?: SortOrder
    graduationDate?: SortOrder
    resetPasswordToken?: SortOrder
    resetPasswordExpires?: SortOrder
    farmId?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    active?: SortOrder
    crv?: SortOrder
    crmv?: SortOrder
    graduationDate?: SortOrder
    resetPasswordToken?: SortOrder
    resetPasswordExpires?: SortOrder
    farmId?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumPermissionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Permission | EnumPermissionFieldRefInput<$PrismaModel>
    in?: $Enums.Permission[] | ListEnumPermissionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Permission[] | ListEnumPermissionFieldRefInput<$PrismaModel>
    not?: NestedEnumPermissionWithAggregatesFilter<$PrismaModel> | $Enums.Permission
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPermissionFilter<$PrismaModel>
    _max?: NestedEnumPermissionFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type EarTagHistoryListRelationFilter = {
    every?: EarTagHistoryWhereInput
    some?: EarTagHistoryWhereInput
    none?: EarTagHistoryWhereInput
  }

  export type EarTagHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnimalFarmIdChipIdCompoundUniqueInput = {
    farmId: string
    chipId: string
  }

  export type AnimalCountOrderByAggregateInput = {
    id?: SortOrder
    chipId?: SortOrder
    currentEarTag?: SortOrder
    name?: SortOrder
    breed?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    sireId?: SortOrder
    damId?: SortOrder
    pastureId?: SortOrder
    pastureName?: SortOrder
    status?: SortOrder
    deathDate?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnimalMaxOrderByAggregateInput = {
    id?: SortOrder
    chipId?: SortOrder
    currentEarTag?: SortOrder
    name?: SortOrder
    breed?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    sireId?: SortOrder
    damId?: SortOrder
    pastureId?: SortOrder
    pastureName?: SortOrder
    status?: SortOrder
    deathDate?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnimalMinOrderByAggregateInput = {
    id?: SortOrder
    chipId?: SortOrder
    currentEarTag?: SortOrder
    name?: SortOrder
    breed?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    sireId?: SortOrder
    damId?: SortOrder
    pastureId?: SortOrder
    pastureName?: SortOrder
    status?: SortOrder
    deathDate?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnimalScalarRelationFilter = {
    is?: AnimalWhereInput
    isNot?: AnimalWhereInput
  }

  export type EarTagHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    earTagNumber?: SortOrder
    animalId?: SortOrder
    placementDate?: SortOrder
    removalDate?: SortOrder
    reason?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
  }

  export type EarTagHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    earTagNumber?: SortOrder
    animalId?: SortOrder
    placementDate?: SortOrder
    removalDate?: SortOrder
    reason?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
  }

  export type EarTagHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    earTagNumber?: SortOrder
    animalId?: SortOrder
    placementDate?: SortOrder
    removalDate?: SortOrder
    reason?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type PastureFarmIdNameCompoundUniqueInput = {
    farmId: string
    name: string
  }

  export type PastureCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    hectares?: SortOrder
    type?: SortOrder
    animalCapacity?: SortOrder
    currentAnimals?: SortOrder
    active?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PastureAvgOrderByAggregateInput = {
    hectares?: SortOrder
    animalCapacity?: SortOrder
    currentAnimals?: SortOrder
  }

  export type PastureMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    hectares?: SortOrder
    type?: SortOrder
    animalCapacity?: SortOrder
    currentAnimals?: SortOrder
    active?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PastureMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    hectares?: SortOrder
    type?: SortOrder
    animalCapacity?: SortOrder
    currentAnimals?: SortOrder
    active?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PastureSumOrderByAggregateInput = {
    hectares?: SortOrder
    animalCapacity?: SortOrder
    currentAnimals?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EstrusCountOrderByAggregateInput = {
    id?: SortOrder
    animalId?: SortOrder
    date?: SortOrder
    intensity?: SortOrder
    detectedBy?: SortOrder
    nextEstrus?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EstrusMaxOrderByAggregateInput = {
    id?: SortOrder
    animalId?: SortOrder
    date?: SortOrder
    intensity?: SortOrder
    detectedBy?: SortOrder
    nextEstrus?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EstrusMinOrderByAggregateInput = {
    id?: SortOrder
    animalId?: SortOrder
    date?: SortOrder
    intensity?: SortOrder
    detectedBy?: SortOrder
    nextEstrus?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AttemptListRelationFilter = {
    every?: AttemptWhereInput
    some?: AttemptWhereInput
    none?: AttemptWhereInput
  }

  export type AttemptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PregnancyCountOrderByAggregateInput = {
    id?: SortOrder
    animalId?: SortOrder
    currentStatus?: SortOrder
    currentStatusDate?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PregnancyMaxOrderByAggregateInput = {
    id?: SortOrder
    animalId?: SortOrder
    currentStatus?: SortOrder
    currentStatusDate?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PregnancyMinOrderByAggregateInput = {
    id?: SortOrder
    animalId?: SortOrder
    currentStatus?: SortOrder
    currentStatusDate?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PregnancyScalarRelationFilter = {
    is?: PregnancyWhereInput
    isNot?: PregnancyWhereInput
  }

  export type UltrasoundListRelationFilter = {
    every?: UltrasoundWhereInput
    some?: UltrasoundWhereInput
    none?: UltrasoundWhereInput
  }

  export type UltrasoundOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AttemptCountOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    pregnancyId?: SortOrder
    matingDate?: SortOrder
    matingType?: SortOrder
    bullId?: SortOrder
    semenName?: SortOrder
    technician?: SortOrder
    estimatedBirthDate?: SortOrder
    birthId?: SortOrder
    attemptStatus?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type AttemptAvgOrderByAggregateInput = {
    number?: SortOrder
  }

  export type AttemptMaxOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    pregnancyId?: SortOrder
    matingDate?: SortOrder
    matingType?: SortOrder
    bullId?: SortOrder
    semenName?: SortOrder
    technician?: SortOrder
    estimatedBirthDate?: SortOrder
    birthId?: SortOrder
    attemptStatus?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type AttemptMinOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    pregnancyId?: SortOrder
    matingDate?: SortOrder
    matingType?: SortOrder
    bullId?: SortOrder
    semenName?: SortOrder
    technician?: SortOrder
    estimatedBirthDate?: SortOrder
    birthId?: SortOrder
    attemptStatus?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type AttemptSumOrderByAggregateInput = {
    number?: SortOrder
  }

  export type AttemptScalarRelationFilter = {
    is?: AttemptWhereInput
    isNot?: AttemptWhereInput
  }

  export type UltrasoundCountOrderByAggregateInput = {
    id?: SortOrder
    attemptId?: SortOrder
    days?: SortOrder
    result?: SortOrder
    notes?: SortOrder
    veterinarianId?: SortOrder
    ultrasoundDate?: SortOrder
  }

  export type UltrasoundAvgOrderByAggregateInput = {
    days?: SortOrder
  }

  export type UltrasoundMaxOrderByAggregateInput = {
    id?: SortOrder
    attemptId?: SortOrder
    days?: SortOrder
    result?: SortOrder
    notes?: SortOrder
    veterinarianId?: SortOrder
    ultrasoundDate?: SortOrder
  }

  export type UltrasoundMinOrderByAggregateInput = {
    id?: SortOrder
    attemptId?: SortOrder
    days?: SortOrder
    result?: SortOrder
    notes?: SortOrder
    veterinarianId?: SortOrder
    ultrasoundDate?: SortOrder
  }

  export type UltrasoundSumOrderByAggregateInput = {
    days?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type BirthCountOrderByAggregateInput = {
    id?: SortOrder
    damId?: SortOrder
    pregnancyId?: SortOrder
    birthDate?: SortOrder
    birthTime?: SortOrder
    birthType?: SortOrder
    veterinarianId?: SortOrder
    veterinarianName?: SortOrder
    veterinarianCrv?: SortOrder
    calfGender?: SortOrder
    calfWeight?: SortOrder
    calfEarTag?: SortOrder
    calfChip?: SortOrder
    calfStatus?: SortOrder
    situation?: SortOrder
    deathReason?: SortOrder
    notes?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BirthAvgOrderByAggregateInput = {
    calfWeight?: SortOrder
  }

  export type BirthMaxOrderByAggregateInput = {
    id?: SortOrder
    damId?: SortOrder
    pregnancyId?: SortOrder
    birthDate?: SortOrder
    birthTime?: SortOrder
    birthType?: SortOrder
    veterinarianId?: SortOrder
    veterinarianName?: SortOrder
    veterinarianCrv?: SortOrder
    calfGender?: SortOrder
    calfWeight?: SortOrder
    calfEarTag?: SortOrder
    calfChip?: SortOrder
    calfStatus?: SortOrder
    situation?: SortOrder
    deathReason?: SortOrder
    notes?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BirthMinOrderByAggregateInput = {
    id?: SortOrder
    damId?: SortOrder
    pregnancyId?: SortOrder
    birthDate?: SortOrder
    birthTime?: SortOrder
    birthType?: SortOrder
    veterinarianId?: SortOrder
    veterinarianName?: SortOrder
    veterinarianCrv?: SortOrder
    calfGender?: SortOrder
    calfWeight?: SortOrder
    calfEarTag?: SortOrder
    calfChip?: SortOrder
    calfStatus?: SortOrder
    situation?: SortOrder
    deathReason?: SortOrder
    notes?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BirthSumOrderByAggregateInput = {
    calfWeight?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type VaccinationCountOrderByAggregateInput = {
    id?: SortOrder
    animalId?: SortOrder
    vaccineType?: SortOrder
    brand?: SortOrder
    batch?: SortOrder
    vaccinationDate?: SortOrder
    expirationDate?: SortOrder
    nextDoseDate?: SortOrder
    photoUrl?: SortOrder
    reaction?: SortOrder
    veterinarianId?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VaccinationMaxOrderByAggregateInput = {
    id?: SortOrder
    animalId?: SortOrder
    vaccineType?: SortOrder
    brand?: SortOrder
    batch?: SortOrder
    vaccinationDate?: SortOrder
    expirationDate?: SortOrder
    nextDoseDate?: SortOrder
    photoUrl?: SortOrder
    reaction?: SortOrder
    veterinarianId?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VaccinationMinOrderByAggregateInput = {
    id?: SortOrder
    animalId?: SortOrder
    vaccineType?: SortOrder
    brand?: SortOrder
    batch?: SortOrder
    vaccinationDate?: SortOrder
    expirationDate?: SortOrder
    nextDoseDate?: SortOrder
    photoUrl?: SortOrder
    reaction?: SortOrder
    veterinarianId?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type ManagementCountOrderByAggregateInput = {
    id?: SortOrder
    animalId?: SortOrder
    originPasture?: SortOrder
    destinationPasture?: SortOrder
    movementDate?: SortOrder
    reason?: SortOrder
    employee?: SortOrder
    batchId?: SortOrder
    batchTotal?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
  }

  export type ManagementAvgOrderByAggregateInput = {
    batchTotal?: SortOrder
  }

  export type ManagementMaxOrderByAggregateInput = {
    id?: SortOrder
    animalId?: SortOrder
    originPasture?: SortOrder
    destinationPasture?: SortOrder
    movementDate?: SortOrder
    reason?: SortOrder
    employee?: SortOrder
    batchId?: SortOrder
    batchTotal?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
  }

  export type ManagementMinOrderByAggregateInput = {
    id?: SortOrder
    animalId?: SortOrder
    originPasture?: SortOrder
    destinationPasture?: SortOrder
    movementDate?: SortOrder
    reason?: SortOrder
    employee?: SortOrder
    batchId?: SortOrder
    batchTotal?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
  }

  export type ManagementSumOrderByAggregateInput = {
    batchTotal?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type MortalityCountOrderByAggregateInput = {
    id?: SortOrder
    animalId?: SortOrder
    deathDate?: SortOrder
    deathTime?: SortOrder
    deathLocation?: SortOrder
    causeOfDeath?: SortOrder
    severity?: SortOrder
    necropsy?: SortOrder
    disposal?: SortOrder
    photos?: SortOrder
    origin?: SortOrder
    birthId?: SortOrder
    notes?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MortalityMaxOrderByAggregateInput = {
    id?: SortOrder
    animalId?: SortOrder
    deathDate?: SortOrder
    deathTime?: SortOrder
    deathLocation?: SortOrder
    causeOfDeath?: SortOrder
    severity?: SortOrder
    necropsy?: SortOrder
    disposal?: SortOrder
    origin?: SortOrder
    birthId?: SortOrder
    notes?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MortalityMinOrderByAggregateInput = {
    id?: SortOrder
    animalId?: SortOrder
    deathDate?: SortOrder
    deathTime?: SortOrder
    deathLocation?: SortOrder
    causeOfDeath?: SortOrder
    severity?: SortOrder
    necropsy?: SortOrder
    disposal?: SortOrder
    origin?: SortOrder
    birthId?: SortOrder
    notes?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PasswordResetTokenCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetTokenMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    code?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    farmId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserCreateNestedManyWithoutFarmInput = {
    create?: XOR<UserCreateWithoutFarmInput, UserUncheckedCreateWithoutFarmInput> | UserCreateWithoutFarmInput[] | UserUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFarmInput | UserCreateOrConnectWithoutFarmInput[]
    createMany?: UserCreateManyFarmInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type AnimalCreateNestedManyWithoutFarmInput = {
    create?: XOR<AnimalCreateWithoutFarmInput, AnimalUncheckedCreateWithoutFarmInput> | AnimalCreateWithoutFarmInput[] | AnimalUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutFarmInput | AnimalCreateOrConnectWithoutFarmInput[]
    createMany?: AnimalCreateManyFarmInputEnvelope
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
  }

  export type PastureCreateNestedManyWithoutFarmInput = {
    create?: XOR<PastureCreateWithoutFarmInput, PastureUncheckedCreateWithoutFarmInput> | PastureCreateWithoutFarmInput[] | PastureUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: PastureCreateOrConnectWithoutFarmInput | PastureCreateOrConnectWithoutFarmInput[]
    createMany?: PastureCreateManyFarmInputEnvelope
    connect?: PastureWhereUniqueInput | PastureWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutFarmInput = {
    create?: XOR<UserCreateWithoutFarmInput, UserUncheckedCreateWithoutFarmInput> | UserCreateWithoutFarmInput[] | UserUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFarmInput | UserCreateOrConnectWithoutFarmInput[]
    createMany?: UserCreateManyFarmInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type AnimalUncheckedCreateNestedManyWithoutFarmInput = {
    create?: XOR<AnimalCreateWithoutFarmInput, AnimalUncheckedCreateWithoutFarmInput> | AnimalCreateWithoutFarmInput[] | AnimalUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutFarmInput | AnimalCreateOrConnectWithoutFarmInput[]
    createMany?: AnimalCreateManyFarmInputEnvelope
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
  }

  export type PastureUncheckedCreateNestedManyWithoutFarmInput = {
    create?: XOR<PastureCreateWithoutFarmInput, PastureUncheckedCreateWithoutFarmInput> | PastureCreateWithoutFarmInput[] | PastureUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: PastureCreateOrConnectWithoutFarmInput | PastureCreateOrConnectWithoutFarmInput[]
    createMany?: PastureCreateManyFarmInputEnvelope
    connect?: PastureWhereUniqueInput | PastureWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateManyWithoutFarmNestedInput = {
    create?: XOR<UserCreateWithoutFarmInput, UserUncheckedCreateWithoutFarmInput> | UserCreateWithoutFarmInput[] | UserUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFarmInput | UserCreateOrConnectWithoutFarmInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFarmInput | UserUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: UserCreateManyFarmInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFarmInput | UserUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFarmInput | UserUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type AnimalUpdateManyWithoutFarmNestedInput = {
    create?: XOR<AnimalCreateWithoutFarmInput, AnimalUncheckedCreateWithoutFarmInput> | AnimalCreateWithoutFarmInput[] | AnimalUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutFarmInput | AnimalCreateOrConnectWithoutFarmInput[]
    upsert?: AnimalUpsertWithWhereUniqueWithoutFarmInput | AnimalUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: AnimalCreateManyFarmInputEnvelope
    set?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    disconnect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    delete?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    update?: AnimalUpdateWithWhereUniqueWithoutFarmInput | AnimalUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: AnimalUpdateManyWithWhereWithoutFarmInput | AnimalUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: AnimalScalarWhereInput | AnimalScalarWhereInput[]
  }

  export type PastureUpdateManyWithoutFarmNestedInput = {
    create?: XOR<PastureCreateWithoutFarmInput, PastureUncheckedCreateWithoutFarmInput> | PastureCreateWithoutFarmInput[] | PastureUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: PastureCreateOrConnectWithoutFarmInput | PastureCreateOrConnectWithoutFarmInput[]
    upsert?: PastureUpsertWithWhereUniqueWithoutFarmInput | PastureUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: PastureCreateManyFarmInputEnvelope
    set?: PastureWhereUniqueInput | PastureWhereUniqueInput[]
    disconnect?: PastureWhereUniqueInput | PastureWhereUniqueInput[]
    delete?: PastureWhereUniqueInput | PastureWhereUniqueInput[]
    connect?: PastureWhereUniqueInput | PastureWhereUniqueInput[]
    update?: PastureUpdateWithWhereUniqueWithoutFarmInput | PastureUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: PastureUpdateManyWithWhereWithoutFarmInput | PastureUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: PastureScalarWhereInput | PastureScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutFarmNestedInput = {
    create?: XOR<UserCreateWithoutFarmInput, UserUncheckedCreateWithoutFarmInput> | UserCreateWithoutFarmInput[] | UserUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFarmInput | UserCreateOrConnectWithoutFarmInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFarmInput | UserUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: UserCreateManyFarmInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFarmInput | UserUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFarmInput | UserUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type AnimalUncheckedUpdateManyWithoutFarmNestedInput = {
    create?: XOR<AnimalCreateWithoutFarmInput, AnimalUncheckedCreateWithoutFarmInput> | AnimalCreateWithoutFarmInput[] | AnimalUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: AnimalCreateOrConnectWithoutFarmInput | AnimalCreateOrConnectWithoutFarmInput[]
    upsert?: AnimalUpsertWithWhereUniqueWithoutFarmInput | AnimalUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: AnimalCreateManyFarmInputEnvelope
    set?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    disconnect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    delete?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    connect?: AnimalWhereUniqueInput | AnimalWhereUniqueInput[]
    update?: AnimalUpdateWithWhereUniqueWithoutFarmInput | AnimalUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: AnimalUpdateManyWithWhereWithoutFarmInput | AnimalUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: AnimalScalarWhereInput | AnimalScalarWhereInput[]
  }

  export type PastureUncheckedUpdateManyWithoutFarmNestedInput = {
    create?: XOR<PastureCreateWithoutFarmInput, PastureUncheckedCreateWithoutFarmInput> | PastureCreateWithoutFarmInput[] | PastureUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: PastureCreateOrConnectWithoutFarmInput | PastureCreateOrConnectWithoutFarmInput[]
    upsert?: PastureUpsertWithWhereUniqueWithoutFarmInput | PastureUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: PastureCreateManyFarmInputEnvelope
    set?: PastureWhereUniqueInput | PastureWhereUniqueInput[]
    disconnect?: PastureWhereUniqueInput | PastureWhereUniqueInput[]
    delete?: PastureWhereUniqueInput | PastureWhereUniqueInput[]
    connect?: PastureWhereUniqueInput | PastureWhereUniqueInput[]
    update?: PastureUpdateWithWhereUniqueWithoutFarmInput | PastureUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: PastureUpdateManyWithWhereWithoutFarmInput | PastureUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: PastureScalarWhereInput | PastureScalarWhereInput[]
  }

  export type UserCreatespecialtiesInput = {
    set: string[]
  }

  export type FarmCreateNestedOneWithoutUsersInput = {
    create?: XOR<FarmCreateWithoutUsersInput, FarmUncheckedCreateWithoutUsersInput>
    connectOrCreate?: FarmCreateOrConnectWithoutUsersInput
    connect?: FarmWhereUniqueInput
  }

  export type EnumPermissionFieldUpdateOperationsInput = {
    set?: $Enums.Permission
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type UserUpdatespecialtiesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type FarmUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<FarmCreateWithoutUsersInput, FarmUncheckedCreateWithoutUsersInput>
    connectOrCreate?: FarmCreateOrConnectWithoutUsersInput
    upsert?: FarmUpsertWithoutUsersInput
    connect?: FarmWhereUniqueInput
    update?: XOR<XOR<FarmUpdateToOneWithWhereWithoutUsersInput, FarmUpdateWithoutUsersInput>, FarmUncheckedUpdateWithoutUsersInput>
  }

  export type EarTagHistoryCreateNestedManyWithoutAnimalInput = {
    create?: XOR<EarTagHistoryCreateWithoutAnimalInput, EarTagHistoryUncheckedCreateWithoutAnimalInput> | EarTagHistoryCreateWithoutAnimalInput[] | EarTagHistoryUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: EarTagHistoryCreateOrConnectWithoutAnimalInput | EarTagHistoryCreateOrConnectWithoutAnimalInput[]
    createMany?: EarTagHistoryCreateManyAnimalInputEnvelope
    connect?: EarTagHistoryWhereUniqueInput | EarTagHistoryWhereUniqueInput[]
  }

  export type FarmCreateNestedOneWithoutAnimalsInput = {
    create?: XOR<FarmCreateWithoutAnimalsInput, FarmUncheckedCreateWithoutAnimalsInput>
    connectOrCreate?: FarmCreateOrConnectWithoutAnimalsInput
    connect?: FarmWhereUniqueInput
  }

  export type EarTagHistoryUncheckedCreateNestedManyWithoutAnimalInput = {
    create?: XOR<EarTagHistoryCreateWithoutAnimalInput, EarTagHistoryUncheckedCreateWithoutAnimalInput> | EarTagHistoryCreateWithoutAnimalInput[] | EarTagHistoryUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: EarTagHistoryCreateOrConnectWithoutAnimalInput | EarTagHistoryCreateOrConnectWithoutAnimalInput[]
    createMany?: EarTagHistoryCreateManyAnimalInputEnvelope
    connect?: EarTagHistoryWhereUniqueInput | EarTagHistoryWhereUniqueInput[]
  }

  export type EarTagHistoryUpdateManyWithoutAnimalNestedInput = {
    create?: XOR<EarTagHistoryCreateWithoutAnimalInput, EarTagHistoryUncheckedCreateWithoutAnimalInput> | EarTagHistoryCreateWithoutAnimalInput[] | EarTagHistoryUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: EarTagHistoryCreateOrConnectWithoutAnimalInput | EarTagHistoryCreateOrConnectWithoutAnimalInput[]
    upsert?: EarTagHistoryUpsertWithWhereUniqueWithoutAnimalInput | EarTagHistoryUpsertWithWhereUniqueWithoutAnimalInput[]
    createMany?: EarTagHistoryCreateManyAnimalInputEnvelope
    set?: EarTagHistoryWhereUniqueInput | EarTagHistoryWhereUniqueInput[]
    disconnect?: EarTagHistoryWhereUniqueInput | EarTagHistoryWhereUniqueInput[]
    delete?: EarTagHistoryWhereUniqueInput | EarTagHistoryWhereUniqueInput[]
    connect?: EarTagHistoryWhereUniqueInput | EarTagHistoryWhereUniqueInput[]
    update?: EarTagHistoryUpdateWithWhereUniqueWithoutAnimalInput | EarTagHistoryUpdateWithWhereUniqueWithoutAnimalInput[]
    updateMany?: EarTagHistoryUpdateManyWithWhereWithoutAnimalInput | EarTagHistoryUpdateManyWithWhereWithoutAnimalInput[]
    deleteMany?: EarTagHistoryScalarWhereInput | EarTagHistoryScalarWhereInput[]
  }

  export type FarmUpdateOneRequiredWithoutAnimalsNestedInput = {
    create?: XOR<FarmCreateWithoutAnimalsInput, FarmUncheckedCreateWithoutAnimalsInput>
    connectOrCreate?: FarmCreateOrConnectWithoutAnimalsInput
    upsert?: FarmUpsertWithoutAnimalsInput
    connect?: FarmWhereUniqueInput
    update?: XOR<XOR<FarmUpdateToOneWithWhereWithoutAnimalsInput, FarmUpdateWithoutAnimalsInput>, FarmUncheckedUpdateWithoutAnimalsInput>
  }

  export type EarTagHistoryUncheckedUpdateManyWithoutAnimalNestedInput = {
    create?: XOR<EarTagHistoryCreateWithoutAnimalInput, EarTagHistoryUncheckedCreateWithoutAnimalInput> | EarTagHistoryCreateWithoutAnimalInput[] | EarTagHistoryUncheckedCreateWithoutAnimalInput[]
    connectOrCreate?: EarTagHistoryCreateOrConnectWithoutAnimalInput | EarTagHistoryCreateOrConnectWithoutAnimalInput[]
    upsert?: EarTagHistoryUpsertWithWhereUniqueWithoutAnimalInput | EarTagHistoryUpsertWithWhereUniqueWithoutAnimalInput[]
    createMany?: EarTagHistoryCreateManyAnimalInputEnvelope
    set?: EarTagHistoryWhereUniqueInput | EarTagHistoryWhereUniqueInput[]
    disconnect?: EarTagHistoryWhereUniqueInput | EarTagHistoryWhereUniqueInput[]
    delete?: EarTagHistoryWhereUniqueInput | EarTagHistoryWhereUniqueInput[]
    connect?: EarTagHistoryWhereUniqueInput | EarTagHistoryWhereUniqueInput[]
    update?: EarTagHistoryUpdateWithWhereUniqueWithoutAnimalInput | EarTagHistoryUpdateWithWhereUniqueWithoutAnimalInput[]
    updateMany?: EarTagHistoryUpdateManyWithWhereWithoutAnimalInput | EarTagHistoryUpdateManyWithWhereWithoutAnimalInput[]
    deleteMany?: EarTagHistoryScalarWhereInput | EarTagHistoryScalarWhereInput[]
  }

  export type AnimalCreateNestedOneWithoutEarTagHistoryInput = {
    create?: XOR<AnimalCreateWithoutEarTagHistoryInput, AnimalUncheckedCreateWithoutEarTagHistoryInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutEarTagHistoryInput
    connect?: AnimalWhereUniqueInput
  }

  export type AnimalUpdateOneRequiredWithoutEarTagHistoryNestedInput = {
    create?: XOR<AnimalCreateWithoutEarTagHistoryInput, AnimalUncheckedCreateWithoutEarTagHistoryInput>
    connectOrCreate?: AnimalCreateOrConnectWithoutEarTagHistoryInput
    upsert?: AnimalUpsertWithoutEarTagHistoryInput
    connect?: AnimalWhereUniqueInput
    update?: XOR<XOR<AnimalUpdateToOneWithWhereWithoutEarTagHistoryInput, AnimalUpdateWithoutEarTagHistoryInput>, AnimalUncheckedUpdateWithoutEarTagHistoryInput>
  }

  export type FarmCreateNestedOneWithoutPasturesInput = {
    create?: XOR<FarmCreateWithoutPasturesInput, FarmUncheckedCreateWithoutPasturesInput>
    connectOrCreate?: FarmCreateOrConnectWithoutPasturesInput
    connect?: FarmWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FarmUpdateOneRequiredWithoutPasturesNestedInput = {
    create?: XOR<FarmCreateWithoutPasturesInput, FarmUncheckedCreateWithoutPasturesInput>
    connectOrCreate?: FarmCreateOrConnectWithoutPasturesInput
    upsert?: FarmUpsertWithoutPasturesInput
    connect?: FarmWhereUniqueInput
    update?: XOR<XOR<FarmUpdateToOneWithWhereWithoutPasturesInput, FarmUpdateWithoutPasturesInput>, FarmUncheckedUpdateWithoutPasturesInput>
  }

  export type AttemptCreateNestedManyWithoutPregnancyInput = {
    create?: XOR<AttemptCreateWithoutPregnancyInput, AttemptUncheckedCreateWithoutPregnancyInput> | AttemptCreateWithoutPregnancyInput[] | AttemptUncheckedCreateWithoutPregnancyInput[]
    connectOrCreate?: AttemptCreateOrConnectWithoutPregnancyInput | AttemptCreateOrConnectWithoutPregnancyInput[]
    createMany?: AttemptCreateManyPregnancyInputEnvelope
    connect?: AttemptWhereUniqueInput | AttemptWhereUniqueInput[]
  }

  export type AttemptUncheckedCreateNestedManyWithoutPregnancyInput = {
    create?: XOR<AttemptCreateWithoutPregnancyInput, AttemptUncheckedCreateWithoutPregnancyInput> | AttemptCreateWithoutPregnancyInput[] | AttemptUncheckedCreateWithoutPregnancyInput[]
    connectOrCreate?: AttemptCreateOrConnectWithoutPregnancyInput | AttemptCreateOrConnectWithoutPregnancyInput[]
    createMany?: AttemptCreateManyPregnancyInputEnvelope
    connect?: AttemptWhereUniqueInput | AttemptWhereUniqueInput[]
  }

  export type AttemptUpdateManyWithoutPregnancyNestedInput = {
    create?: XOR<AttemptCreateWithoutPregnancyInput, AttemptUncheckedCreateWithoutPregnancyInput> | AttemptCreateWithoutPregnancyInput[] | AttemptUncheckedCreateWithoutPregnancyInput[]
    connectOrCreate?: AttemptCreateOrConnectWithoutPregnancyInput | AttemptCreateOrConnectWithoutPregnancyInput[]
    upsert?: AttemptUpsertWithWhereUniqueWithoutPregnancyInput | AttemptUpsertWithWhereUniqueWithoutPregnancyInput[]
    createMany?: AttemptCreateManyPregnancyInputEnvelope
    set?: AttemptWhereUniqueInput | AttemptWhereUniqueInput[]
    disconnect?: AttemptWhereUniqueInput | AttemptWhereUniqueInput[]
    delete?: AttemptWhereUniqueInput | AttemptWhereUniqueInput[]
    connect?: AttemptWhereUniqueInput | AttemptWhereUniqueInput[]
    update?: AttemptUpdateWithWhereUniqueWithoutPregnancyInput | AttemptUpdateWithWhereUniqueWithoutPregnancyInput[]
    updateMany?: AttemptUpdateManyWithWhereWithoutPregnancyInput | AttemptUpdateManyWithWhereWithoutPregnancyInput[]
    deleteMany?: AttemptScalarWhereInput | AttemptScalarWhereInput[]
  }

  export type AttemptUncheckedUpdateManyWithoutPregnancyNestedInput = {
    create?: XOR<AttemptCreateWithoutPregnancyInput, AttemptUncheckedCreateWithoutPregnancyInput> | AttemptCreateWithoutPregnancyInput[] | AttemptUncheckedCreateWithoutPregnancyInput[]
    connectOrCreate?: AttemptCreateOrConnectWithoutPregnancyInput | AttemptCreateOrConnectWithoutPregnancyInput[]
    upsert?: AttemptUpsertWithWhereUniqueWithoutPregnancyInput | AttemptUpsertWithWhereUniqueWithoutPregnancyInput[]
    createMany?: AttemptCreateManyPregnancyInputEnvelope
    set?: AttemptWhereUniqueInput | AttemptWhereUniqueInput[]
    disconnect?: AttemptWhereUniqueInput | AttemptWhereUniqueInput[]
    delete?: AttemptWhereUniqueInput | AttemptWhereUniqueInput[]
    connect?: AttemptWhereUniqueInput | AttemptWhereUniqueInput[]
    update?: AttemptUpdateWithWhereUniqueWithoutPregnancyInput | AttemptUpdateWithWhereUniqueWithoutPregnancyInput[]
    updateMany?: AttemptUpdateManyWithWhereWithoutPregnancyInput | AttemptUpdateManyWithWhereWithoutPregnancyInput[]
    deleteMany?: AttemptScalarWhereInput | AttemptScalarWhereInput[]
  }

  export type PregnancyCreateNestedOneWithoutAttemptsInput = {
    create?: XOR<PregnancyCreateWithoutAttemptsInput, PregnancyUncheckedCreateWithoutAttemptsInput>
    connectOrCreate?: PregnancyCreateOrConnectWithoutAttemptsInput
    connect?: PregnancyWhereUniqueInput
  }

  export type UltrasoundCreateNestedManyWithoutAttemptInput = {
    create?: XOR<UltrasoundCreateWithoutAttemptInput, UltrasoundUncheckedCreateWithoutAttemptInput> | UltrasoundCreateWithoutAttemptInput[] | UltrasoundUncheckedCreateWithoutAttemptInput[]
    connectOrCreate?: UltrasoundCreateOrConnectWithoutAttemptInput | UltrasoundCreateOrConnectWithoutAttemptInput[]
    createMany?: UltrasoundCreateManyAttemptInputEnvelope
    connect?: UltrasoundWhereUniqueInput | UltrasoundWhereUniqueInput[]
  }

  export type UltrasoundUncheckedCreateNestedManyWithoutAttemptInput = {
    create?: XOR<UltrasoundCreateWithoutAttemptInput, UltrasoundUncheckedCreateWithoutAttemptInput> | UltrasoundCreateWithoutAttemptInput[] | UltrasoundUncheckedCreateWithoutAttemptInput[]
    connectOrCreate?: UltrasoundCreateOrConnectWithoutAttemptInput | UltrasoundCreateOrConnectWithoutAttemptInput[]
    createMany?: UltrasoundCreateManyAttemptInputEnvelope
    connect?: UltrasoundWhereUniqueInput | UltrasoundWhereUniqueInput[]
  }

  export type PregnancyUpdateOneRequiredWithoutAttemptsNestedInput = {
    create?: XOR<PregnancyCreateWithoutAttemptsInput, PregnancyUncheckedCreateWithoutAttemptsInput>
    connectOrCreate?: PregnancyCreateOrConnectWithoutAttemptsInput
    upsert?: PregnancyUpsertWithoutAttemptsInput
    connect?: PregnancyWhereUniqueInput
    update?: XOR<XOR<PregnancyUpdateToOneWithWhereWithoutAttemptsInput, PregnancyUpdateWithoutAttemptsInput>, PregnancyUncheckedUpdateWithoutAttemptsInput>
  }

  export type UltrasoundUpdateManyWithoutAttemptNestedInput = {
    create?: XOR<UltrasoundCreateWithoutAttemptInput, UltrasoundUncheckedCreateWithoutAttemptInput> | UltrasoundCreateWithoutAttemptInput[] | UltrasoundUncheckedCreateWithoutAttemptInput[]
    connectOrCreate?: UltrasoundCreateOrConnectWithoutAttemptInput | UltrasoundCreateOrConnectWithoutAttemptInput[]
    upsert?: UltrasoundUpsertWithWhereUniqueWithoutAttemptInput | UltrasoundUpsertWithWhereUniqueWithoutAttemptInput[]
    createMany?: UltrasoundCreateManyAttemptInputEnvelope
    set?: UltrasoundWhereUniqueInput | UltrasoundWhereUniqueInput[]
    disconnect?: UltrasoundWhereUniqueInput | UltrasoundWhereUniqueInput[]
    delete?: UltrasoundWhereUniqueInput | UltrasoundWhereUniqueInput[]
    connect?: UltrasoundWhereUniqueInput | UltrasoundWhereUniqueInput[]
    update?: UltrasoundUpdateWithWhereUniqueWithoutAttemptInput | UltrasoundUpdateWithWhereUniqueWithoutAttemptInput[]
    updateMany?: UltrasoundUpdateManyWithWhereWithoutAttemptInput | UltrasoundUpdateManyWithWhereWithoutAttemptInput[]
    deleteMany?: UltrasoundScalarWhereInput | UltrasoundScalarWhereInput[]
  }

  export type UltrasoundUncheckedUpdateManyWithoutAttemptNestedInput = {
    create?: XOR<UltrasoundCreateWithoutAttemptInput, UltrasoundUncheckedCreateWithoutAttemptInput> | UltrasoundCreateWithoutAttemptInput[] | UltrasoundUncheckedCreateWithoutAttemptInput[]
    connectOrCreate?: UltrasoundCreateOrConnectWithoutAttemptInput | UltrasoundCreateOrConnectWithoutAttemptInput[]
    upsert?: UltrasoundUpsertWithWhereUniqueWithoutAttemptInput | UltrasoundUpsertWithWhereUniqueWithoutAttemptInput[]
    createMany?: UltrasoundCreateManyAttemptInputEnvelope
    set?: UltrasoundWhereUniqueInput | UltrasoundWhereUniqueInput[]
    disconnect?: UltrasoundWhereUniqueInput | UltrasoundWhereUniqueInput[]
    delete?: UltrasoundWhereUniqueInput | UltrasoundWhereUniqueInput[]
    connect?: UltrasoundWhereUniqueInput | UltrasoundWhereUniqueInput[]
    update?: UltrasoundUpdateWithWhereUniqueWithoutAttemptInput | UltrasoundUpdateWithWhereUniqueWithoutAttemptInput[]
    updateMany?: UltrasoundUpdateManyWithWhereWithoutAttemptInput | UltrasoundUpdateManyWithWhereWithoutAttemptInput[]
    deleteMany?: UltrasoundScalarWhereInput | UltrasoundScalarWhereInput[]
  }

  export type AttemptCreateNestedOneWithoutUltrasoundsInput = {
    create?: XOR<AttemptCreateWithoutUltrasoundsInput, AttemptUncheckedCreateWithoutUltrasoundsInput>
    connectOrCreate?: AttemptCreateOrConnectWithoutUltrasoundsInput
    connect?: AttemptWhereUniqueInput
  }

  export type AttemptUpdateOneRequiredWithoutUltrasoundsNestedInput = {
    create?: XOR<AttemptCreateWithoutUltrasoundsInput, AttemptUncheckedCreateWithoutUltrasoundsInput>
    connectOrCreate?: AttemptCreateOrConnectWithoutUltrasoundsInput
    upsert?: AttemptUpsertWithoutUltrasoundsInput
    connect?: AttemptWhereUniqueInput
    update?: XOR<XOR<AttemptUpdateToOneWithWhereWithoutUltrasoundsInput, AttemptUpdateWithoutUltrasoundsInput>, AttemptUncheckedUpdateWithoutUltrasoundsInput>
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type MortalityCreatephotosInput = {
    set: string[]
  }

  export type MortalityUpdatephotosInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumPermissionFilter<$PrismaModel = never> = {
    equals?: $Enums.Permission | EnumPermissionFieldRefInput<$PrismaModel>
    in?: $Enums.Permission[] | ListEnumPermissionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Permission[] | ListEnumPermissionFieldRefInput<$PrismaModel>
    not?: NestedEnumPermissionFilter<$PrismaModel> | $Enums.Permission
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type NestedEnumPermissionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Permission | EnumPermissionFieldRefInput<$PrismaModel>
    in?: $Enums.Permission[] | ListEnumPermissionFieldRefInput<$PrismaModel>
    notIn?: $Enums.Permission[] | ListEnumPermissionFieldRefInput<$PrismaModel>
    not?: NestedEnumPermissionWithAggregatesFilter<$PrismaModel> | $Enums.Permission
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPermissionFilter<$PrismaModel>
    _max?: NestedEnumPermissionFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type UserCreateWithoutFarmInput = {
    id?: string
    fullName: string
    email: string
    phone?: string | null
    password: string
    role?: $Enums.Permission
    active?: boolean
    crv?: string | null
    crmv?: string | null
    graduationDate?: Date | string | null
    specialties?: UserCreatespecialtiesInput | string[]
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutFarmInput = {
    id?: string
    fullName: string
    email: string
    phone?: string | null
    password: string
    role?: $Enums.Permission
    active?: boolean
    crv?: string | null
    crmv?: string | null
    graduationDate?: Date | string | null
    specialties?: UserCreatespecialtiesInput | string[]
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutFarmInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFarmInput, UserUncheckedCreateWithoutFarmInput>
  }

  export type UserCreateManyFarmInputEnvelope = {
    data: UserCreateManyFarmInput | UserCreateManyFarmInput[]
  }

  export type AnimalCreateWithoutFarmInput = {
    id?: string
    chipId: string
    currentEarTag?: string | null
    name: string
    breed: string
    gender: string
    birthDate: Date | string
    sireId?: string | null
    damId?: string | null
    pastureId?: string | null
    pastureName?: string | null
    status?: string
    deathDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    earTagHistory?: EarTagHistoryCreateNestedManyWithoutAnimalInput
  }

  export type AnimalUncheckedCreateWithoutFarmInput = {
    id?: string
    chipId: string
    currentEarTag?: string | null
    name: string
    breed: string
    gender: string
    birthDate: Date | string
    sireId?: string | null
    damId?: string | null
    pastureId?: string | null
    pastureName?: string | null
    status?: string
    deathDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    earTagHistory?: EarTagHistoryUncheckedCreateNestedManyWithoutAnimalInput
  }

  export type AnimalCreateOrConnectWithoutFarmInput = {
    where: AnimalWhereUniqueInput
    create: XOR<AnimalCreateWithoutFarmInput, AnimalUncheckedCreateWithoutFarmInput>
  }

  export type AnimalCreateManyFarmInputEnvelope = {
    data: AnimalCreateManyFarmInput | AnimalCreateManyFarmInput[]
  }

  export type PastureCreateWithoutFarmInput = {
    id?: string
    name: string
    hectares: number
    type: string
    animalCapacity: number
    currentAnimals?: number
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PastureUncheckedCreateWithoutFarmInput = {
    id?: string
    name: string
    hectares: number
    type: string
    animalCapacity: number
    currentAnimals?: number
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PastureCreateOrConnectWithoutFarmInput = {
    where: PastureWhereUniqueInput
    create: XOR<PastureCreateWithoutFarmInput, PastureUncheckedCreateWithoutFarmInput>
  }

  export type PastureCreateManyFarmInputEnvelope = {
    data: PastureCreateManyFarmInput | PastureCreateManyFarmInput[]
  }

  export type UserUpsertWithWhereUniqueWithoutFarmInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutFarmInput, UserUncheckedUpdateWithoutFarmInput>
    create: XOR<UserCreateWithoutFarmInput, UserUncheckedCreateWithoutFarmInput>
  }

  export type UserUpdateWithWhereUniqueWithoutFarmInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutFarmInput, UserUncheckedUpdateWithoutFarmInput>
  }

  export type UserUpdateManyWithWhereWithoutFarmInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutFarmInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    role?: EnumPermissionFilter<"User"> | $Enums.Permission
    active?: BoolFilter<"User"> | boolean
    crv?: StringNullableFilter<"User"> | string | null
    crmv?: StringNullableFilter<"User"> | string | null
    graduationDate?: DateTimeNullableFilter<"User"> | Date | string | null
    specialties?: StringNullableListFilter<"User">
    resetPasswordToken?: StringNullableFilter<"User"> | string | null
    resetPasswordExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    farmId?: StringFilter<"User"> | string
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type AnimalUpsertWithWhereUniqueWithoutFarmInput = {
    where: AnimalWhereUniqueInput
    update: XOR<AnimalUpdateWithoutFarmInput, AnimalUncheckedUpdateWithoutFarmInput>
    create: XOR<AnimalCreateWithoutFarmInput, AnimalUncheckedCreateWithoutFarmInput>
  }

  export type AnimalUpdateWithWhereUniqueWithoutFarmInput = {
    where: AnimalWhereUniqueInput
    data: XOR<AnimalUpdateWithoutFarmInput, AnimalUncheckedUpdateWithoutFarmInput>
  }

  export type AnimalUpdateManyWithWhereWithoutFarmInput = {
    where: AnimalScalarWhereInput
    data: XOR<AnimalUpdateManyMutationInput, AnimalUncheckedUpdateManyWithoutFarmInput>
  }

  export type AnimalScalarWhereInput = {
    AND?: AnimalScalarWhereInput | AnimalScalarWhereInput[]
    OR?: AnimalScalarWhereInput[]
    NOT?: AnimalScalarWhereInput | AnimalScalarWhereInput[]
    id?: StringFilter<"Animal"> | string
    chipId?: StringFilter<"Animal"> | string
    currentEarTag?: StringNullableFilter<"Animal"> | string | null
    name?: StringFilter<"Animal"> | string
    breed?: StringFilter<"Animal"> | string
    gender?: StringFilter<"Animal"> | string
    birthDate?: DateTimeFilter<"Animal"> | Date | string
    sireId?: StringNullableFilter<"Animal"> | string | null
    damId?: StringNullableFilter<"Animal"> | string | null
    pastureId?: StringNullableFilter<"Animal"> | string | null
    pastureName?: StringNullableFilter<"Animal"> | string | null
    status?: StringFilter<"Animal"> | string
    deathDate?: DateTimeNullableFilter<"Animal"> | Date | string | null
    farmId?: StringFilter<"Animal"> | string
    createdAt?: DateTimeFilter<"Animal"> | Date | string
    updatedAt?: DateTimeFilter<"Animal"> | Date | string
  }

  export type PastureUpsertWithWhereUniqueWithoutFarmInput = {
    where: PastureWhereUniqueInput
    update: XOR<PastureUpdateWithoutFarmInput, PastureUncheckedUpdateWithoutFarmInput>
    create: XOR<PastureCreateWithoutFarmInput, PastureUncheckedCreateWithoutFarmInput>
  }

  export type PastureUpdateWithWhereUniqueWithoutFarmInput = {
    where: PastureWhereUniqueInput
    data: XOR<PastureUpdateWithoutFarmInput, PastureUncheckedUpdateWithoutFarmInput>
  }

  export type PastureUpdateManyWithWhereWithoutFarmInput = {
    where: PastureScalarWhereInput
    data: XOR<PastureUpdateManyMutationInput, PastureUncheckedUpdateManyWithoutFarmInput>
  }

  export type PastureScalarWhereInput = {
    AND?: PastureScalarWhereInput | PastureScalarWhereInput[]
    OR?: PastureScalarWhereInput[]
    NOT?: PastureScalarWhereInput | PastureScalarWhereInput[]
    id?: StringFilter<"Pasture"> | string
    name?: StringFilter<"Pasture"> | string
    hectares?: FloatFilter<"Pasture"> | number
    type?: StringFilter<"Pasture"> | string
    animalCapacity?: IntFilter<"Pasture"> | number
    currentAnimals?: IntFilter<"Pasture"> | number
    active?: BoolFilter<"Pasture"> | boolean
    farmId?: StringFilter<"Pasture"> | string
    createdAt?: DateTimeFilter<"Pasture"> | Date | string
    updatedAt?: DateTimeFilter<"Pasture"> | Date | string
  }

  export type FarmCreateWithoutUsersInput = {
    id?: string
    name: string
    location: string
    cnpj?: string | null
    logoUrl?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    animals?: AnimalCreateNestedManyWithoutFarmInput
    pastures?: PastureCreateNestedManyWithoutFarmInput
  }

  export type FarmUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    location: string
    cnpj?: string | null
    logoUrl?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    animals?: AnimalUncheckedCreateNestedManyWithoutFarmInput
    pastures?: PastureUncheckedCreateNestedManyWithoutFarmInput
  }

  export type FarmCreateOrConnectWithoutUsersInput = {
    where: FarmWhereUniqueInput
    create: XOR<FarmCreateWithoutUsersInput, FarmUncheckedCreateWithoutUsersInput>
  }

  export type FarmUpsertWithoutUsersInput = {
    update: XOR<FarmUpdateWithoutUsersInput, FarmUncheckedUpdateWithoutUsersInput>
    create: XOR<FarmCreateWithoutUsersInput, FarmUncheckedCreateWithoutUsersInput>
    where?: FarmWhereInput
  }

  export type FarmUpdateToOneWithWhereWithoutUsersInput = {
    where?: FarmWhereInput
    data: XOR<FarmUpdateWithoutUsersInput, FarmUncheckedUpdateWithoutUsersInput>
  }

  export type FarmUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    animals?: AnimalUpdateManyWithoutFarmNestedInput
    pastures?: PastureUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    animals?: AnimalUncheckedUpdateManyWithoutFarmNestedInput
    pastures?: PastureUncheckedUpdateManyWithoutFarmNestedInput
  }

  export type EarTagHistoryCreateWithoutAnimalInput = {
    id?: string
    earTagNumber: string
    placementDate: Date | string
    removalDate?: Date | string | null
    reason?: string | null
    farmId: string
    createdAt?: Date | string
  }

  export type EarTagHistoryUncheckedCreateWithoutAnimalInput = {
    id?: string
    earTagNumber: string
    placementDate: Date | string
    removalDate?: Date | string | null
    reason?: string | null
    farmId: string
    createdAt?: Date | string
  }

  export type EarTagHistoryCreateOrConnectWithoutAnimalInput = {
    where: EarTagHistoryWhereUniqueInput
    create: XOR<EarTagHistoryCreateWithoutAnimalInput, EarTagHistoryUncheckedCreateWithoutAnimalInput>
  }

  export type EarTagHistoryCreateManyAnimalInputEnvelope = {
    data: EarTagHistoryCreateManyAnimalInput | EarTagHistoryCreateManyAnimalInput[]
  }

  export type FarmCreateWithoutAnimalsInput = {
    id?: string
    name: string
    location: string
    cnpj?: string | null
    logoUrl?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutFarmInput
    pastures?: PastureCreateNestedManyWithoutFarmInput
  }

  export type FarmUncheckedCreateWithoutAnimalsInput = {
    id?: string
    name: string
    location: string
    cnpj?: string | null
    logoUrl?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutFarmInput
    pastures?: PastureUncheckedCreateNestedManyWithoutFarmInput
  }

  export type FarmCreateOrConnectWithoutAnimalsInput = {
    where: FarmWhereUniqueInput
    create: XOR<FarmCreateWithoutAnimalsInput, FarmUncheckedCreateWithoutAnimalsInput>
  }

  export type EarTagHistoryUpsertWithWhereUniqueWithoutAnimalInput = {
    where: EarTagHistoryWhereUniqueInput
    update: XOR<EarTagHistoryUpdateWithoutAnimalInput, EarTagHistoryUncheckedUpdateWithoutAnimalInput>
    create: XOR<EarTagHistoryCreateWithoutAnimalInput, EarTagHistoryUncheckedCreateWithoutAnimalInput>
  }

  export type EarTagHistoryUpdateWithWhereUniqueWithoutAnimalInput = {
    where: EarTagHistoryWhereUniqueInput
    data: XOR<EarTagHistoryUpdateWithoutAnimalInput, EarTagHistoryUncheckedUpdateWithoutAnimalInput>
  }

  export type EarTagHistoryUpdateManyWithWhereWithoutAnimalInput = {
    where: EarTagHistoryScalarWhereInput
    data: XOR<EarTagHistoryUpdateManyMutationInput, EarTagHistoryUncheckedUpdateManyWithoutAnimalInput>
  }

  export type EarTagHistoryScalarWhereInput = {
    AND?: EarTagHistoryScalarWhereInput | EarTagHistoryScalarWhereInput[]
    OR?: EarTagHistoryScalarWhereInput[]
    NOT?: EarTagHistoryScalarWhereInput | EarTagHistoryScalarWhereInput[]
    id?: StringFilter<"EarTagHistory"> | string
    earTagNumber?: StringFilter<"EarTagHistory"> | string
    animalId?: StringFilter<"EarTagHistory"> | string
    placementDate?: DateTimeFilter<"EarTagHistory"> | Date | string
    removalDate?: DateTimeNullableFilter<"EarTagHistory"> | Date | string | null
    reason?: StringNullableFilter<"EarTagHistory"> | string | null
    farmId?: StringFilter<"EarTagHistory"> | string
    createdAt?: DateTimeFilter<"EarTagHistory"> | Date | string
  }

  export type FarmUpsertWithoutAnimalsInput = {
    update: XOR<FarmUpdateWithoutAnimalsInput, FarmUncheckedUpdateWithoutAnimalsInput>
    create: XOR<FarmCreateWithoutAnimalsInput, FarmUncheckedCreateWithoutAnimalsInput>
    where?: FarmWhereInput
  }

  export type FarmUpdateToOneWithWhereWithoutAnimalsInput = {
    where?: FarmWhereInput
    data: XOR<FarmUpdateWithoutAnimalsInput, FarmUncheckedUpdateWithoutAnimalsInput>
  }

  export type FarmUpdateWithoutAnimalsInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutFarmNestedInput
    pastures?: PastureUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateWithoutAnimalsInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutFarmNestedInput
    pastures?: PastureUncheckedUpdateManyWithoutFarmNestedInput
  }

  export type AnimalCreateWithoutEarTagHistoryInput = {
    id?: string
    chipId: string
    currentEarTag?: string | null
    name: string
    breed: string
    gender: string
    birthDate: Date | string
    sireId?: string | null
    damId?: string | null
    pastureId?: string | null
    pastureName?: string | null
    status?: string
    deathDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    farm: FarmCreateNestedOneWithoutAnimalsInput
  }

  export type AnimalUncheckedCreateWithoutEarTagHistoryInput = {
    id?: string
    chipId: string
    currentEarTag?: string | null
    name: string
    breed: string
    gender: string
    birthDate: Date | string
    sireId?: string | null
    damId?: string | null
    pastureId?: string | null
    pastureName?: string | null
    status?: string
    deathDate?: Date | string | null
    farmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnimalCreateOrConnectWithoutEarTagHistoryInput = {
    where: AnimalWhereUniqueInput
    create: XOR<AnimalCreateWithoutEarTagHistoryInput, AnimalUncheckedCreateWithoutEarTagHistoryInput>
  }

  export type AnimalUpsertWithoutEarTagHistoryInput = {
    update: XOR<AnimalUpdateWithoutEarTagHistoryInput, AnimalUncheckedUpdateWithoutEarTagHistoryInput>
    create: XOR<AnimalCreateWithoutEarTagHistoryInput, AnimalUncheckedCreateWithoutEarTagHistoryInput>
    where?: AnimalWhereInput
  }

  export type AnimalUpdateToOneWithWhereWithoutEarTagHistoryInput = {
    where?: AnimalWhereInput
    data: XOR<AnimalUpdateWithoutEarTagHistoryInput, AnimalUncheckedUpdateWithoutEarTagHistoryInput>
  }

  export type AnimalUpdateWithoutEarTagHistoryInput = {
    chipId?: StringFieldUpdateOperationsInput | string
    currentEarTag?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    sireId?: NullableStringFieldUpdateOperationsInput | string | null
    damId?: NullableStringFieldUpdateOperationsInput | string | null
    pastureId?: NullableStringFieldUpdateOperationsInput | string | null
    pastureName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutAnimalsNestedInput
  }

  export type AnimalUncheckedUpdateWithoutEarTagHistoryInput = {
    chipId?: StringFieldUpdateOperationsInput | string
    currentEarTag?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    sireId?: NullableStringFieldUpdateOperationsInput | string | null
    damId?: NullableStringFieldUpdateOperationsInput | string | null
    pastureId?: NullableStringFieldUpdateOperationsInput | string | null
    pastureName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmCreateWithoutPasturesInput = {
    id?: string
    name: string
    location: string
    cnpj?: string | null
    logoUrl?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutFarmInput
    animals?: AnimalCreateNestedManyWithoutFarmInput
  }

  export type FarmUncheckedCreateWithoutPasturesInput = {
    id?: string
    name: string
    location: string
    cnpj?: string | null
    logoUrl?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutFarmInput
    animals?: AnimalUncheckedCreateNestedManyWithoutFarmInput
  }

  export type FarmCreateOrConnectWithoutPasturesInput = {
    where: FarmWhereUniqueInput
    create: XOR<FarmCreateWithoutPasturesInput, FarmUncheckedCreateWithoutPasturesInput>
  }

  export type FarmUpsertWithoutPasturesInput = {
    update: XOR<FarmUpdateWithoutPasturesInput, FarmUncheckedUpdateWithoutPasturesInput>
    create: XOR<FarmCreateWithoutPasturesInput, FarmUncheckedCreateWithoutPasturesInput>
    where?: FarmWhereInput
  }

  export type FarmUpdateToOneWithWhereWithoutPasturesInput = {
    where?: FarmWhereInput
    data: XOR<FarmUpdateWithoutPasturesInput, FarmUncheckedUpdateWithoutPasturesInput>
  }

  export type FarmUpdateWithoutPasturesInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutFarmNestedInput
    animals?: AnimalUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateWithoutPasturesInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutFarmNestedInput
    animals?: AnimalUncheckedUpdateManyWithoutFarmNestedInput
  }

  export type AttemptCreateWithoutPregnancyInput = {
    id?: string
    number: number
    matingDate: Date | string
    matingType: string
    bullId?: string | null
    semenName?: string | null
    technician?: string | null
    estimatedBirthDate: Date | string
    birthId?: string | null
    attemptStatus?: string
    notes?: string | null
    createdAt?: Date | string
    ultrasounds?: UltrasoundCreateNestedManyWithoutAttemptInput
  }

  export type AttemptUncheckedCreateWithoutPregnancyInput = {
    id?: string
    number: number
    matingDate: Date | string
    matingType: string
    bullId?: string | null
    semenName?: string | null
    technician?: string | null
    estimatedBirthDate: Date | string
    birthId?: string | null
    attemptStatus?: string
    notes?: string | null
    createdAt?: Date | string
    ultrasounds?: UltrasoundUncheckedCreateNestedManyWithoutAttemptInput
  }

  export type AttemptCreateOrConnectWithoutPregnancyInput = {
    where: AttemptWhereUniqueInput
    create: XOR<AttemptCreateWithoutPregnancyInput, AttemptUncheckedCreateWithoutPregnancyInput>
  }

  export type AttemptCreateManyPregnancyInputEnvelope = {
    data: AttemptCreateManyPregnancyInput | AttemptCreateManyPregnancyInput[]
  }

  export type AttemptUpsertWithWhereUniqueWithoutPregnancyInput = {
    where: AttemptWhereUniqueInput
    update: XOR<AttemptUpdateWithoutPregnancyInput, AttemptUncheckedUpdateWithoutPregnancyInput>
    create: XOR<AttemptCreateWithoutPregnancyInput, AttemptUncheckedCreateWithoutPregnancyInput>
  }

  export type AttemptUpdateWithWhereUniqueWithoutPregnancyInput = {
    where: AttemptWhereUniqueInput
    data: XOR<AttemptUpdateWithoutPregnancyInput, AttemptUncheckedUpdateWithoutPregnancyInput>
  }

  export type AttemptUpdateManyWithWhereWithoutPregnancyInput = {
    where: AttemptScalarWhereInput
    data: XOR<AttemptUpdateManyMutationInput, AttemptUncheckedUpdateManyWithoutPregnancyInput>
  }

  export type AttemptScalarWhereInput = {
    AND?: AttemptScalarWhereInput | AttemptScalarWhereInput[]
    OR?: AttemptScalarWhereInput[]
    NOT?: AttemptScalarWhereInput | AttemptScalarWhereInput[]
    id?: StringFilter<"Attempt"> | string
    number?: IntFilter<"Attempt"> | number
    pregnancyId?: StringFilter<"Attempt"> | string
    matingDate?: DateTimeFilter<"Attempt"> | Date | string
    matingType?: StringFilter<"Attempt"> | string
    bullId?: StringNullableFilter<"Attempt"> | string | null
    semenName?: StringNullableFilter<"Attempt"> | string | null
    technician?: StringNullableFilter<"Attempt"> | string | null
    estimatedBirthDate?: DateTimeFilter<"Attempt"> | Date | string
    birthId?: StringNullableFilter<"Attempt"> | string | null
    attemptStatus?: StringFilter<"Attempt"> | string
    notes?: StringNullableFilter<"Attempt"> | string | null
    createdAt?: DateTimeFilter<"Attempt"> | Date | string
  }

  export type PregnancyCreateWithoutAttemptsInput = {
    id?: string
    animalId: string
    currentStatus?: string
    currentStatusDate?: Date | string
    farmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PregnancyUncheckedCreateWithoutAttemptsInput = {
    id?: string
    animalId: string
    currentStatus?: string
    currentStatusDate?: Date | string
    farmId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PregnancyCreateOrConnectWithoutAttemptsInput = {
    where: PregnancyWhereUniqueInput
    create: XOR<PregnancyCreateWithoutAttemptsInput, PregnancyUncheckedCreateWithoutAttemptsInput>
  }

  export type UltrasoundCreateWithoutAttemptInput = {
    id?: string
    days: number
    result: string
    notes?: string | null
    veterinarianId?: string | null
    ultrasoundDate?: Date | string
  }

  export type UltrasoundUncheckedCreateWithoutAttemptInput = {
    id?: string
    days: number
    result: string
    notes?: string | null
    veterinarianId?: string | null
    ultrasoundDate?: Date | string
  }

  export type UltrasoundCreateOrConnectWithoutAttemptInput = {
    where: UltrasoundWhereUniqueInput
    create: XOR<UltrasoundCreateWithoutAttemptInput, UltrasoundUncheckedCreateWithoutAttemptInput>
  }

  export type UltrasoundCreateManyAttemptInputEnvelope = {
    data: UltrasoundCreateManyAttemptInput | UltrasoundCreateManyAttemptInput[]
  }

  export type PregnancyUpsertWithoutAttemptsInput = {
    update: XOR<PregnancyUpdateWithoutAttemptsInput, PregnancyUncheckedUpdateWithoutAttemptsInput>
    create: XOR<PregnancyCreateWithoutAttemptsInput, PregnancyUncheckedCreateWithoutAttemptsInput>
    where?: PregnancyWhereInput
  }

  export type PregnancyUpdateToOneWithWhereWithoutAttemptsInput = {
    where?: PregnancyWhereInput
    data: XOR<PregnancyUpdateWithoutAttemptsInput, PregnancyUncheckedUpdateWithoutAttemptsInput>
  }

  export type PregnancyUpdateWithoutAttemptsInput = {
    animalId?: StringFieldUpdateOperationsInput | string
    currentStatus?: StringFieldUpdateOperationsInput | string
    currentStatusDate?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PregnancyUncheckedUpdateWithoutAttemptsInput = {
    animalId?: StringFieldUpdateOperationsInput | string
    currentStatus?: StringFieldUpdateOperationsInput | string
    currentStatusDate?: DateTimeFieldUpdateOperationsInput | Date | string
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UltrasoundUpsertWithWhereUniqueWithoutAttemptInput = {
    where: UltrasoundWhereUniqueInput
    update: XOR<UltrasoundUpdateWithoutAttemptInput, UltrasoundUncheckedUpdateWithoutAttemptInput>
    create: XOR<UltrasoundCreateWithoutAttemptInput, UltrasoundUncheckedCreateWithoutAttemptInput>
  }

  export type UltrasoundUpdateWithWhereUniqueWithoutAttemptInput = {
    where: UltrasoundWhereUniqueInput
    data: XOR<UltrasoundUpdateWithoutAttemptInput, UltrasoundUncheckedUpdateWithoutAttemptInput>
  }

  export type UltrasoundUpdateManyWithWhereWithoutAttemptInput = {
    where: UltrasoundScalarWhereInput
    data: XOR<UltrasoundUpdateManyMutationInput, UltrasoundUncheckedUpdateManyWithoutAttemptInput>
  }

  export type UltrasoundScalarWhereInput = {
    AND?: UltrasoundScalarWhereInput | UltrasoundScalarWhereInput[]
    OR?: UltrasoundScalarWhereInput[]
    NOT?: UltrasoundScalarWhereInput | UltrasoundScalarWhereInput[]
    id?: StringFilter<"Ultrasound"> | string
    attemptId?: StringFilter<"Ultrasound"> | string
    days?: IntFilter<"Ultrasound"> | number
    result?: StringFilter<"Ultrasound"> | string
    notes?: StringNullableFilter<"Ultrasound"> | string | null
    veterinarianId?: StringNullableFilter<"Ultrasound"> | string | null
    ultrasoundDate?: DateTimeFilter<"Ultrasound"> | Date | string
  }

  export type AttemptCreateWithoutUltrasoundsInput = {
    id?: string
    number: number
    matingDate: Date | string
    matingType: string
    bullId?: string | null
    semenName?: string | null
    technician?: string | null
    estimatedBirthDate: Date | string
    birthId?: string | null
    attemptStatus?: string
    notes?: string | null
    createdAt?: Date | string
    pregnancy: PregnancyCreateNestedOneWithoutAttemptsInput
  }

  export type AttemptUncheckedCreateWithoutUltrasoundsInput = {
    id?: string
    number: number
    pregnancyId: string
    matingDate: Date | string
    matingType: string
    bullId?: string | null
    semenName?: string | null
    technician?: string | null
    estimatedBirthDate: Date | string
    birthId?: string | null
    attemptStatus?: string
    notes?: string | null
    createdAt?: Date | string
  }

  export type AttemptCreateOrConnectWithoutUltrasoundsInput = {
    where: AttemptWhereUniqueInput
    create: XOR<AttemptCreateWithoutUltrasoundsInput, AttemptUncheckedCreateWithoutUltrasoundsInput>
  }

  export type AttemptUpsertWithoutUltrasoundsInput = {
    update: XOR<AttemptUpdateWithoutUltrasoundsInput, AttemptUncheckedUpdateWithoutUltrasoundsInput>
    create: XOR<AttemptCreateWithoutUltrasoundsInput, AttemptUncheckedCreateWithoutUltrasoundsInput>
    where?: AttemptWhereInput
  }

  export type AttemptUpdateToOneWithWhereWithoutUltrasoundsInput = {
    where?: AttemptWhereInput
    data: XOR<AttemptUpdateWithoutUltrasoundsInput, AttemptUncheckedUpdateWithoutUltrasoundsInput>
  }

  export type AttemptUpdateWithoutUltrasoundsInput = {
    number?: IntFieldUpdateOperationsInput | number
    matingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    matingType?: StringFieldUpdateOperationsInput | string
    bullId?: NullableStringFieldUpdateOperationsInput | string | null
    semenName?: NullableStringFieldUpdateOperationsInput | string | null
    technician?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedBirthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    birthId?: NullableStringFieldUpdateOperationsInput | string | null
    attemptStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pregnancy?: PregnancyUpdateOneRequiredWithoutAttemptsNestedInput
  }

  export type AttemptUncheckedUpdateWithoutUltrasoundsInput = {
    number?: IntFieldUpdateOperationsInput | number
    pregnancyId?: StringFieldUpdateOperationsInput | string
    matingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    matingType?: StringFieldUpdateOperationsInput | string
    bullId?: NullableStringFieldUpdateOperationsInput | string | null
    semenName?: NullableStringFieldUpdateOperationsInput | string | null
    technician?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedBirthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    birthId?: NullableStringFieldUpdateOperationsInput | string | null
    attemptStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyFarmInput = {
    id?: string
    fullName: string
    email: string
    phone?: string | null
    password: string
    role?: $Enums.Permission
    active?: boolean
    crv?: string | null
    crmv?: string | null
    graduationDate?: Date | string | null
    specialties?: UserCreatespecialtiesInput | string[]
    resetPasswordToken?: string | null
    resetPasswordExpires?: Date | string | null
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnimalCreateManyFarmInput = {
    id?: string
    chipId: string
    currentEarTag?: string | null
    name: string
    breed: string
    gender: string
    birthDate: Date | string
    sireId?: string | null
    damId?: string | null
    pastureId?: string | null
    pastureName?: string | null
    status?: string
    deathDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PastureCreateManyFarmInput = {
    id?: string
    name: string
    hectares: number
    type: string
    animalCapacity: number
    currentAnimals?: number
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutFarmInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumPermissionFieldUpdateOperationsInput | $Enums.Permission
    active?: BoolFieldUpdateOperationsInput | boolean
    crv?: NullableStringFieldUpdateOperationsInput | string | null
    crmv?: NullableStringFieldUpdateOperationsInput | string | null
    graduationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    specialties?: UserUpdatespecialtiesInput | string[]
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutFarmInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumPermissionFieldUpdateOperationsInput | $Enums.Permission
    active?: BoolFieldUpdateOperationsInput | boolean
    crv?: NullableStringFieldUpdateOperationsInput | string | null
    crmv?: NullableStringFieldUpdateOperationsInput | string | null
    graduationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    specialties?: UserUpdatespecialtiesInput | string[]
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyWithoutFarmInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumPermissionFieldUpdateOperationsInput | $Enums.Permission
    active?: BoolFieldUpdateOperationsInput | boolean
    crv?: NullableStringFieldUpdateOperationsInput | string | null
    crmv?: NullableStringFieldUpdateOperationsInput | string | null
    graduationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    specialties?: UserUpdatespecialtiesInput | string[]
    resetPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetPasswordExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnimalUpdateWithoutFarmInput = {
    chipId?: StringFieldUpdateOperationsInput | string
    currentEarTag?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    sireId?: NullableStringFieldUpdateOperationsInput | string | null
    damId?: NullableStringFieldUpdateOperationsInput | string | null
    pastureId?: NullableStringFieldUpdateOperationsInput | string | null
    pastureName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    earTagHistory?: EarTagHistoryUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateWithoutFarmInput = {
    chipId?: StringFieldUpdateOperationsInput | string
    currentEarTag?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    sireId?: NullableStringFieldUpdateOperationsInput | string | null
    damId?: NullableStringFieldUpdateOperationsInput | string | null
    pastureId?: NullableStringFieldUpdateOperationsInput | string | null
    pastureName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    earTagHistory?: EarTagHistoryUncheckedUpdateManyWithoutAnimalNestedInput
  }

  export type AnimalUncheckedUpdateManyWithoutFarmInput = {
    chipId?: StringFieldUpdateOperationsInput | string
    currentEarTag?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    breed?: StringFieldUpdateOperationsInput | string
    gender?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    sireId?: NullableStringFieldUpdateOperationsInput | string | null
    damId?: NullableStringFieldUpdateOperationsInput | string | null
    pastureId?: NullableStringFieldUpdateOperationsInput | string | null
    pastureName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PastureUpdateWithoutFarmInput = {
    name?: StringFieldUpdateOperationsInput | string
    hectares?: FloatFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    animalCapacity?: IntFieldUpdateOperationsInput | number
    currentAnimals?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PastureUncheckedUpdateWithoutFarmInput = {
    name?: StringFieldUpdateOperationsInput | string
    hectares?: FloatFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    animalCapacity?: IntFieldUpdateOperationsInput | number
    currentAnimals?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PastureUncheckedUpdateManyWithoutFarmInput = {
    name?: StringFieldUpdateOperationsInput | string
    hectares?: FloatFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    animalCapacity?: IntFieldUpdateOperationsInput | number
    currentAnimals?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EarTagHistoryCreateManyAnimalInput = {
    id?: string
    earTagNumber: string
    placementDate: Date | string
    removalDate?: Date | string | null
    reason?: string | null
    farmId: string
    createdAt?: Date | string
  }

  export type EarTagHistoryUpdateWithoutAnimalInput = {
    earTagNumber?: StringFieldUpdateOperationsInput | string
    placementDate?: DateTimeFieldUpdateOperationsInput | Date | string
    removalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EarTagHistoryUncheckedUpdateWithoutAnimalInput = {
    earTagNumber?: StringFieldUpdateOperationsInput | string
    placementDate?: DateTimeFieldUpdateOperationsInput | Date | string
    removalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EarTagHistoryUncheckedUpdateManyWithoutAnimalInput = {
    earTagNumber?: StringFieldUpdateOperationsInput | string
    placementDate?: DateTimeFieldUpdateOperationsInput | Date | string
    removalDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    farmId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttemptCreateManyPregnancyInput = {
    id?: string
    number: number
    matingDate: Date | string
    matingType: string
    bullId?: string | null
    semenName?: string | null
    technician?: string | null
    estimatedBirthDate: Date | string
    birthId?: string | null
    attemptStatus?: string
    notes?: string | null
    createdAt?: Date | string
  }

  export type AttemptUpdateWithoutPregnancyInput = {
    number?: IntFieldUpdateOperationsInput | number
    matingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    matingType?: StringFieldUpdateOperationsInput | string
    bullId?: NullableStringFieldUpdateOperationsInput | string | null
    semenName?: NullableStringFieldUpdateOperationsInput | string | null
    technician?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedBirthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    birthId?: NullableStringFieldUpdateOperationsInput | string | null
    attemptStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ultrasounds?: UltrasoundUpdateManyWithoutAttemptNestedInput
  }

  export type AttemptUncheckedUpdateWithoutPregnancyInput = {
    number?: IntFieldUpdateOperationsInput | number
    matingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    matingType?: StringFieldUpdateOperationsInput | string
    bullId?: NullableStringFieldUpdateOperationsInput | string | null
    semenName?: NullableStringFieldUpdateOperationsInput | string | null
    technician?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedBirthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    birthId?: NullableStringFieldUpdateOperationsInput | string | null
    attemptStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ultrasounds?: UltrasoundUncheckedUpdateManyWithoutAttemptNestedInput
  }

  export type AttemptUncheckedUpdateManyWithoutPregnancyInput = {
    number?: IntFieldUpdateOperationsInput | number
    matingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    matingType?: StringFieldUpdateOperationsInput | string
    bullId?: NullableStringFieldUpdateOperationsInput | string | null
    semenName?: NullableStringFieldUpdateOperationsInput | string | null
    technician?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedBirthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    birthId?: NullableStringFieldUpdateOperationsInput | string | null
    attemptStatus?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UltrasoundCreateManyAttemptInput = {
    id?: string
    days: number
    result: string
    notes?: string | null
    veterinarianId?: string | null
    ultrasoundDate?: Date | string
  }

  export type UltrasoundUpdateWithoutAttemptInput = {
    days?: IntFieldUpdateOperationsInput | number
    result?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    veterinarianId?: NullableStringFieldUpdateOperationsInput | string | null
    ultrasoundDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UltrasoundUncheckedUpdateWithoutAttemptInput = {
    days?: IntFieldUpdateOperationsInput | number
    result?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    veterinarianId?: NullableStringFieldUpdateOperationsInput | string | null
    ultrasoundDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UltrasoundUncheckedUpdateManyWithoutAttemptInput = {
    days?: IntFieldUpdateOperationsInput | number
    result?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    veterinarianId?: NullableStringFieldUpdateOperationsInput | string | null
    ultrasoundDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}