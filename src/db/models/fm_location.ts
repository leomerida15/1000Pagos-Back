// create table with id primary key and name string in typeorm
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	JoinColumn,
	ManyToOne,
	UpdateDateColumn,
	CreateDateColumn,
	OneToMany,
} from 'typeorm';
import fm_estado from './fm_estado';
import fm_municipio from './fm_municipio';
import fm_ciudad from './fm_ciudad';
import fm_parroquia from './fm_parroquia';
import fm_dir_pos from './fm_dir_pos';
import fm_client from './fm_client';
import fm_commerce from './fm_commerce';

@Entity()
export default class fm_location {
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => fm_estado, (fm_estado) => fm_estado.locations)
	@JoinColumn({ name: 'id_estado' })
	id_estado!: number;

	@ManyToOne(() => fm_municipio, (fm_municipio) => fm_municipio.locations)
	@JoinColumn({ name: 'id_municipio' })
	id_municipio!: number;

	@ManyToOne(() => fm_ciudad, (fm_ciudad) => fm_ciudad.locations)
	@JoinColumn({ name: 'id_ciudad' })
	id_ciudad!: number;

	@ManyToOne(() => fm_parroquia, (fm_parroquia) => fm_parroquia.locations)
	@JoinColumn({ name: 'id_parroquia' })
	id_parroquia!: number;

	@OneToMany(() => fm_dir_pos, (fm_dir_pos) => fm_dir_pos.id_location)
	@JoinColumn({ name: 'dir_pos' })
	dir_pos?: fm_dir_pos[];

	@OneToMany(() => fm_commerce, (fm_commerce) => fm_commerce.id_location)
	@JoinColumn({ name: 'commerces' })
	commerces?: fm_commerce[];

	@OneToMany(() => fm_client, (fm_client) => fm_client.id_location)
	@JoinColumn({ name: 'clients' })
	clients?: fm_client[];

	@Column({ nullable: true })
	sector!: string;

	@Column({ nullable: true })
	calle!: string;

	@Column({ nullable: true })
	local!: string;

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
