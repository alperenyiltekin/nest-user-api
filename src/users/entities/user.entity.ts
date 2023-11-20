import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    AfterInsert,
    AfterRemove,
    AfterUpdate
}                               from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @AfterInsert()
    logInsert() { console.info("Inserted user with id", this.id) }

    @AfterUpdate()
    logUpdate() { console.info("Updated user with id", this.id) }

    @AfterRemove()
    logRemove() { console.info("Removed user with id ", this.id) }
}