import { Entity, Column } from 'typeorm';
import BaseEntity from './base-entity';

@Entity()
export default class User extends BaseEntity {
    @Column() firstName!: string;
    @Column() lastName!: string;
    @Column() emailAddress!: string;
    @Column() encryptedPassword!: string;
}
