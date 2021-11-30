// create table with id primary key and name string in typeorm
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	JoinColumn,
	OneToOne,
	OneToMany,
	UpdateDateColumn,
	CreateDateColumn,
	ManyToOne,
} from 'typeorm';
import fm_estado from './fm_estado';
import fm_parroquia from './fm_parroquia';
import fm_ciudad from './fm_ciudad';
import fm_location from './fm_location';

@Entity()
export default class fm_municipio {
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => fm_estado, (fm_estado) => fm_estado.municipios)
	@JoinColumn({ name: 'id_estado' })
	id_estado!: number;

	@OneToMany(() => fm_parroquia, (fm_parroquia) => fm_parroquia.id_municipio)
	@JoinColumn({ name: 'parroquias' })
	parroquias?: fm_parroquia[];

	@OneToMany(() => fm_location, (fm_location) => fm_location.id_municipio)
	@JoinColumn({ name: 'locations' })
	locations?: fm_location[];

	@Column({ nullable: true })
	municipio!: string;

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
