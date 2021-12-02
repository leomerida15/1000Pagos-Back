import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import fm_afiliados from './fm_afiliados';

@Entity()
export default class fm_type_person {
	@PrimaryGeneratedColumn()
	id?: number;

	@OneToMany(() => fm_afiliados, (fm_afiliados) => fm_afiliados.id_type_person)
	@JoinColumn({ name: 'fm_afiliados' })
	afiliados?: fm_afiliados[];

	@Column({ nullable: true })
	name!: string;
}
