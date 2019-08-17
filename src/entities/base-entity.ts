import {
    PrimaryGeneratedColumn,
    BaseEntity as _BaseEntity,
    Column,
    BeforeUpdate,
    BeforeInsert
} from 'typeorm';

// a overloaded base entity with common properties
export default class BaseEntity extends _BaseEntity {
    @PrimaryGeneratedColumn() id!: number;

    @Column({ name: 'created_at', nullable: false })
    public createdAt!: Date;

    @Column({ name: 'updated_at', nullable: true })
    public updatedAt!: Date;

    @BeforeInsert()
    createTimeStamps() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date();
    }
}
