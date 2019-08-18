import {
    PrimaryGeneratedColumn,
    BaseEntity as _BaseEntity,
    Column,
    BeforeUpdate,
    BeforeInsert,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

// A base class with common properties for all entities
export default class BaseEntity extends _BaseEntity {
    @PrimaryGeneratedColumn() id!: number;
    @CreateDateColumn({ nullable: true }) public createdAt!: Date;
    @UpdateDateColumn({ nullable: true }) public updatedAt!: Date;
}
