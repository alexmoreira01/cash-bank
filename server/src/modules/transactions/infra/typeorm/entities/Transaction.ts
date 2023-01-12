import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Account } from "@modules/accounts/infra/typeorm/entities/Account";

@Entity("transactions")
class Transaction {
    @PrimaryColumn()
    id: string;

    @Column()
    debited_account_id : string;

    @Column()
    credited_account_id : string;

    @Column()
    value: number;

    @ManyToOne(() => Account)
    @JoinColumn({ name: "debited_account_id" })
    userDebited: Account;

    @ManyToOne(() => Account)
    @JoinColumn({ name: "credited_account_id" })
    userCredited: Account;


    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Transaction };
