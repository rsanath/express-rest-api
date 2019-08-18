import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import bcrypt from 'bcrypt';
import BaseEntity from './base-entity';

@Entity()
export default class User extends BaseEntity {
    @Column() firstName!: string;
    @Column() lastName!: string;
    @Column() emailAddress!: string;
    @Column() encryptedPassword!: string;

    @BeforeUpdate()
    private async encryPasswordOnUpdate() {
        const user = await User.findOne({ id: this.id });

        console.log(this.encryptedPassword);
        console.log(typeof this.encryptedPassword);

        const shouldEncrypt =
            typeof this.encryptedPassword === 'string' &&
            user &&
            user.encryptedPassword !== this.encryptedPassword;

        if (shouldEncrypt) {
            this.encryptPassword();
        }
    }

    @BeforeInsert()
    private async encryptPassword() {
        this.encryptedPassword = bcrypt.hashSync(this.encryptedPassword, 10);
    }
}
