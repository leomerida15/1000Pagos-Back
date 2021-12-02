// create table with id primary key and name string in typeorm
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	JoinColumn,
	UpdateDateColumn,
	CreateDateColumn,
} from 'typeorm';
import fm_ciudad from './fm_ciudad';
import fm_municipio from './fm_municipio';
import fm_location from './fm_location';

@Entity()
export default class fm_estado {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	estado!: string;

	@Column({ nullable: true })
	iso_3166!: string;

	@OneToMany(() => fm_ciudad, (fm_Ciudad) => fm_Ciudad.id_estado)
	@JoinColumn({ name: 'ciudades' })
	ciudades?: fm_ciudad[];

	@OneToMany(() => fm_municipio, (fm_municipio) => fm_municipio.id_estado)
	@JoinColumn({ name: 'municipios' })
	municipios?: fm_municipio[];

	@OneToMany(() => fm_location, (fm_location) => fm_location.id_estado)
	@JoinColumn({ name: 'locations' })
	locations?: fm_location[];

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
