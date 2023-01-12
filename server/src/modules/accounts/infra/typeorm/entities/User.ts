
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Account } from "./Account";

@Entity("users")
class User {
    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    accountId: string;

    @OneToOne(() => Account)
    @JoinColumn({ name: "accountId" })
    account: Account;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { User };
