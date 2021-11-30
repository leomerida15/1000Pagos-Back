import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import fm_estado from './fm_estado';
import fm_municipio from './fm_municipio';
import fm_location from './fm_location';

@Entity()
export default class fm_ciudad {
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => fm_estado, (fm_estado) => fm_estado.ciudades)
	@JoinColumn({ name: 'id_estado' })
	id_estado!: number | fm_estado;

	@Column({ nullable: true })
	ciudad!: string;

	@Column({ nullable: true })
	area_code!: string;

	@Column({ nullable: true })
	postal_code!: string;

	@OneToMany(() => fm_location, (fm_location) => fm_location.id_municipio)
	@JoinColumn({ name: 'locations' })
	locations?: fm_location[];

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
