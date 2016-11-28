// Generated by typings
// Source: node_modules/@grayfox/tsmonad/lib/src/either.d.ts
declare module '~@grayfox/tsmonad/either' {
import { Monad, Functor, Eq } from '~@grayfox/tsmonad/monad';
export enum EitherType {
    Left = 0,
    Right = 1,
}
export interface EitherPatterns<L, R, T> {
    left: (l: L) => T;
    right: (r: R) => T;
}
export interface OptionalEitherPatterns<L, R, T> {
    left?: (l: L) => T;
    right?: (r: R) => T;
}
export function either<L, R>(l?: L, r?: R): Either<L, R>;
export class Either<L, R> implements Monad<R>, Functor<R>, Eq<Either<L, R>> {
    private type;
    private l;
    private r;
    constructor(type: EitherType, l?: L, r?: R);
    static left<L, R>(l: L): Either<L, R>;
    static right<L, R>(r: R): Either<L, R>;
    unit<T>(t: T): Either<L, T>;
    bind<T>(f: (r: R) => Either<L, T>): Either<L, T>;
    of: <T>(t: T) => Either<L, T>;
    chain: <T>(f: (r: R) => Either<L, T>) => Either<L, T>;
    fmap<T>(f: (r: R) => T): Either<L, T>;
    lift: <T>(f: (r: R) => T) => Either<L, T>;
    map: <T>(f: (r: R) => T) => Either<L, T>;
    caseOf<T>(pattern: EitherPatterns<L, R, T>): T;
    equals(other: Either<L, R>): any;
    do(patterns?: OptionalEitherPatterns<L, R, void>): Either<L, R>;
}
}
declare module '@grayfox/tsmonad/either' {
export * from '~@grayfox/tsmonad/either';
}

// Generated by typings
// Source: node_modules/@grayfox/tsmonad/lib/src/maybe.d.ts
declare module '~@grayfox/tsmonad/maybe' {
import { Monad, Functor, Eq } from '~@grayfox/tsmonad/monad';
export enum MaybeType {
    Nothing = 0,
    Just = 1,
}
export interface MaybePatterns<T, U> {
    just: (t: T) => U;
    nothing: () => U;
}
export interface OptionalMaybePatterns<T, U> {
    just?: (t: T) => U;
    nothing?: () => U;
}
export function maybe<T>(t: T): Maybe<T>;
export class Maybe<T> implements Monad<T>, Functor<T>, Eq<Maybe<T>> {
    private type;
    private value;
    constructor(type: MaybeType, value?: T);
    static sequence<T>(t: {
        [k: string]: Maybe<T>;
    }): Maybe<{
        [k: string]: T;
    }>;
    static all: (t: {
        [k: string]: Maybe<any>;
    }) => Maybe<{
        [k: string]: any;
    }>;
    static maybe<T>(t: T): Maybe<T>;
    static just<T>(t: T): Maybe<T>;
    static nothing<T>(): Maybe<T>;
    unit<U>(u: U): Maybe<U>;
    bind<U>(f: (t: T) => Maybe<U>): Maybe<U>;
    of: <U>(u: U) => Maybe<U>;
    chain: <U>(f: (t: T) => Maybe<U>) => Maybe<U>;
    fmap<U>(f: (t: T) => U): Maybe<U>;
    lift: <U>(f: (t: T) => U) => Maybe<U>;
    map: <U>(f: (t: T) => U) => Maybe<U>;
    caseOf<U>(patterns: MaybePatterns<T, U>): U;
    defaulting(defaultValue: T): Maybe<T>;
    equals(other: Maybe<T>): any;
    valueOr<U extends T>(defaultValue: U): T | U;
    valueOrCompute<U extends T>(defaultValueFunction: () => U): T | U;
    valueOrThrow(error?: Error): T;
    do(patterns?: OptionalMaybePatterns<T, void>): Maybe<T>;
}
}
declare module '@grayfox/tsmonad/maybe' {
export * from '~@grayfox/tsmonad/maybe';
}

// Generated by typings
// Source: node_modules/@grayfox/tsmonad/lib/src/monad.d.ts
declare module '~@grayfox/tsmonad/monad' {
export function eq(a: any, b: any): any;
export interface Eq<T> {
    equals(t: T): boolean;
}
export interface Monad<T> {
    unit<U>(t: U): Monad<U>;
    bind<U>(f: (t: T) => Monad<U>): Monad<U>;
    of<U>(t: U): Monad<U>;
    chain<U>(f: (t: T) => Monad<U>): Monad<U>;
}
export interface Functor<T> {
    fmap<U>(f: (t: T) => U): Functor<U>;
    lift<U>(f: (t: T) => U): Functor<U>;
    map<U>(f: (t: T) => U): Functor<U>;
}
}
declare module '@grayfox/tsmonad/monad' {
export * from '~@grayfox/tsmonad/monad';
}

// Generated by typings
// Source: node_modules/@grayfox/tsmonad/lib/src/writer.d.ts
declare module '~@grayfox/tsmonad/writer' {
import { Monad, Eq } from '~@grayfox/tsmonad/monad';
export interface WriterPatterns<S, T, U> {
    writer: (story: S[], value: T) => U;
}
export function writer<S, T>(story: S[], value: T): Writer<S, T>;
export class Writer<S, T> implements Monad<T>, Eq<Writer<S, T>> {
    private story;
    private value;
    constructor(story: S[], value: T);
    static writer<S, T>(story: S[], value: T): Writer<S, T>;
    static tell<S>(s: S): Writer<S, number>;
    unit<U>(u: U): Writer<any, U>;
    bind<U>(f: (t: T) => Writer<S, U>): Writer<S, U>;
    of: <U>(u: U) => Writer<any, U>;
    chain: <U>(f: (t: T) => Writer<S, U>) => Writer<S, U>;
    fmap<U>(f: (t: T) => U): Writer<S, U>;
    lift: <U>(f: (t: T) => U) => Writer<S, U>;
    map: <U>(f: (t: T) => U) => Writer<S, U>;
    caseOf<U>(patterns: WriterPatterns<S, T, U>): U;
    equals(other: Writer<S, T>): boolean;
}
}
declare module '@grayfox/tsmonad/writer' {
export * from '~@grayfox/tsmonad/writer';
}

// Generated by typings
// Source: node_modules/@grayfox/tsmonad/lib/src/index.d.ts
declare module '~@grayfox/tsmonad/index' {
export * from '~@grayfox/tsmonad/either';
export * from '~@grayfox/tsmonad/maybe';
export * from '~@grayfox/tsmonad/monad';
export * from '~@grayfox/tsmonad/writer';
}
declare module '@grayfox/tsmonad/index' {
export * from '~@grayfox/tsmonad/index';
}
declare module '@grayfox/tsmonad' {
export * from '~@grayfox/tsmonad/index';
}