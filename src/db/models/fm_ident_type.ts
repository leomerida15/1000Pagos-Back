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

@Entity()
export default class fm_ident_type {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	name!: string;

	@OneToMany(() => fm_client, (fm_client) => fm_client.id_ident_type)
	@JoinColumn({ name: 'clients' })
	clients?: fm_client[];

	@OneToMany(() => fm_commerce, (fm_commerce) => fm_commerce.id_ident_type)
	@JoinColumn({ name: 'commerces' })
	commerces?: fm_commerce[];

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
