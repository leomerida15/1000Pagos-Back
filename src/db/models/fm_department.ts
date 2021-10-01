import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export default class fm_department {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	name!: string;

	@CreateDateColumn({ select: false })
	createdAt?: string;

	@UpdateDateColumn({ type: 'timestamp', select: false })
	updatedAt?: number;
}
