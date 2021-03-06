import { DatabaseTransactionConnectionType, sql } from 'slonik';

export async function up(tx: DatabaseTransactionConnectionType) {
    await tx.query(sql`
        create table "User" (
            id serial primary key,
            name text not null
        );

        create table "TodoList" (
            id serial primary key,
            owner int not null references "User" (id)
        );

        create table "TodoItem" (
            id serial primary key,
            list int not null references "TodoList" (id),
            completed boolean not null,
            content text not null
        );
    `);
}

export async function down(tx: DatabaseTransactionConnectionType) {
    await tx.query(sql`
        drop table "User";
        drop table "TodoList";
        drop table "TodoItem";
    `);
}
