import { Agency } from "@prisma/client";

export enum RoleEnumType {
    ADMIN = "admin",
    USER = "user",
}

export interface IUserInfo {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface ITestUserWithAgency {
    id: number;
    name: string | null;
    email: string;
    password: string;
    createdAt: Date,
    updatedAt: Date,
    agency?: Agency;
    agencyId: number;
    role: RoleEnumType;
}

export interface ITestUserWithAgencyWithoutName {
    id: number;
    email: string;
    password: string;
    createdAt: Date,
    updatedAt: Date,
    agency?: Agency;
    agencyId: number;
    role: RoleEnumType;
}

export interface IUserWithAgencyOrSuperAdmin {
    id?: number;
    name?: string | null;
    email?: string;
    password?: string;
    agency?: Agency;
    agencyId?: number;
    role?: "admin" | "user" | null;
}


export interface IUserJWT {
    id: number;
    name: string;
    email: string;
    agency: Agency;
    role: RoleEnumType;
}

export interface ICreateUser {
    name: string;
    email: string;
    password: string;
    agencyId: number;
    role?: RoleEnumType;
}

export interface ICreateClient {
    name: string;
    email: string;
    agencyId: number;
}

export interface ICreateAgency {
    name: string;
    image?: string;
    enabled?: boolean;
}

export interface IUpdateUser {
    name?: string;
    password?: string;
}

export interface IUpdateClient {
    name?: string;
    image?: string;
}

export interface IUpdateAgency {
    name?: string;
    image?: string;
    enabled?: boolean;
}