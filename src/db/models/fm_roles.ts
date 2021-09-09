import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import fm_worker from './fm_worker';
import fm_client from './fm_client';

@Entity()
export default class fm_roles {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	name!: string;

	@ManyToMany(() => fm_worker)
	workers?: fm_worker[];

	@ManyToMany(() => fm_client)
	fm_clients?: fm_client[];

	@CreateDateColumn()
	createdAt?: string;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt?: number;
}
