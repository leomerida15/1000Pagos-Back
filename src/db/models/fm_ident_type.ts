import { Column, Entity, PrimaryGeneratedColumn, getRepository } from 'typeorm';

@Entity()
export default class fm_ident_type {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	name!: string;
}