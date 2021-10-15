import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import fm_request from './fm_request';

@Entity()
export class fm_type_payment {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	name!: string;

	@OneToMany(() => fm_request, (fm_request) => fm_request.id_request_origin)
	@JoinColumn({ name: 'requests' })
	requests?: fm_request[];
}
