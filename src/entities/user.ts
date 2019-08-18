import { Entity, Column } from 'typeorm';
import { encrypt } from '../utils';
import BaseEntity from './base-entity';

@Entity()
export default class User extends BaseEntity {
    @Column({ name: 'first_name' }) firstName!: string;
    @Column({ name: 'last_name' }) lastName!: string;
    @Column({ name: 'email_address', unique: true }) emailAddress!: string;
    @Column({ name: 'encrypted_password' }) private encryptedPassword!: string;

    get password(): string {
        return this.encryptedPassword;
    }

    set password(plainPassword: string) {
        this.encryptedPassword = encrypt(plainPassword);
    }
}
