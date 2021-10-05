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

@Entity()
export default class fm_ident_type {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	name!: string;

	@OneToMany(() => fm_client, (fm_client) => fm_client.id_ident_type)
	@JoinColumn({ name: 'clients' })
	clients?: fm_client[];

	@CreateDateColumn({ select: false })
	createdAt?: string;

	@UpdateDateColumn({ type: 'timestamp', select: false })
	updatedAt?: number;
}
