import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import bcrypt from 'bcrypt';
import BaseEntity from './base-entity';

@Entity()
export default class User extends BaseEntity {
    @Column({ name: 'first_name' }) firstName!: string;
    @Column({ name: 'last_name' }) lastName!: string;
    @Column({ name: 'email_address' }) emailAddress!: string;
    @Column({ name: 'encrypted_password' }) encryptedPassword!: string;

    @BeforeUpdate()
    private async encryPasswordOnUpdate() {
        const user = await User.findOne({ id: this.id });

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
