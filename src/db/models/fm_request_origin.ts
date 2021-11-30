import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import fm_request from './fm_request';

@Entity()
export default class fm_request_origin {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@OneToMany(() => fm_request, (fm_request) => fm_request.id_request_origin)
	@JoinColumn({ name: 'requests' })
	requests?: fm_request[];
}
