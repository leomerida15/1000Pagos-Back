import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	CreateDateColumn,
	OneToMany,
	JoinColumn,
} from 'typeorm';
import fm_client from './fm_client';
import fm_commerce from './fm_commerce';
import fm_worker from './fm_worker';

@Entity()
export default class fm_ident_type {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@OneToMany(() => fm_client, (fm_client) => fm_client.id_ident_type)
	@JoinColumn({ name: 'clients' })
	clients?: fm_client[];

	@OneToMany(() => fm_commerce, (fm_commerce) => fm_commerce.id_ident_type)
	@JoinColumn({ name: 'commerces' })
	commerces?: fm_commerce[];

	@OneToMany(() => fm_worker, (fm_worker) => fm_worker.id_ident_type)
	@JoinColumn({ name: 'workers' })
	workers?: fm_worker[];

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
