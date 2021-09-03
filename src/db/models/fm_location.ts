// create table with id primary key and name string in typeorm
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	JoinColumn,
	ManyToOne,
	OneToOne,
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

	@OneToOne(() => fm_estado)
	@JoinColumn({ name: 'id_estado' })
	id_estado!: number;

	@OneToOne(() => fm_municipio)
	@JoinColumn({ name: 'id_municipio' })
	id_municipio!: number;

	@OneToOne(() => fm_ciudad)
	@JoinColumn({ name: 'id_ciudad' })
	id_ciudad!: number;

	@OneToOne(() => fm_parroquia)
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
