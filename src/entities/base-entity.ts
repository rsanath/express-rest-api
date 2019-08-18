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

    @CreateDateColumn({ name: 'created_at', nullable: true })
    public createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', nullable: true })
    public updatedAt!: Date;
}
