import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import fm_request from './fm_request';
import fm_status_request from './fm_status_request';
import fm_department from './fm_department';

@Entity()
export default class fm_status {
	@PrimaryGeneratedColumn()
	id?: number;

	//fm
	@ManyToOne(() => fm_request, (fm_request) => fm_request.status)
	@JoinColumn({ name: 'id_request' })
	id_request!: number | fm_request;

	//depart
	@ManyToOne(() => fm_department, (fm_department) => fm_department.status)
	@JoinColumn({ name: 'id_department' })
	id_department!: number;

	//status
	@ManyToOne(() => fm_status_request, (fm_status_request) => fm_status_request.status)
	@JoinColumn({ name: 'id_status_request' })
	id_status_request!: number;

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
