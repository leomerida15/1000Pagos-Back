// create table with id primary key and name string in typeorm
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	JoinColumn,
	ManyToOne,
	UpdateDateColumn,
	CreateDateColumn,
} from 'typeorm';
import fm_estado from './fm_estado';
import fm_municipio from './fm_municipio';
import fm_ciudad from './fm_ciudad';
import fm_parroquia from './fm_parroquia';

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

	@Column()
	sector!: string;

	@Column()
	calle!: string;

	@Column()
	local!: string;

	@CreateDateColumn()
	createdAt?: string;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt?: number;
}
