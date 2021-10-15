import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export default class fm_cuotas {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	total!: string;

	@Column()
	cuotas_pendientes!: number;

	@CreateDateColumn()
	createdAt?: string;

	@UpdateDateColumn({ type: 'timestamp', select: false })
	updatedAt?: number;
}
