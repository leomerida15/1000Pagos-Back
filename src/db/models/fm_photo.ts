import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
	OneToMany,
} from 'typeorm';
import fm_commerce from './fm_commerce';
import fm_request from './fm_request';

@Entity()
export default class fm_photo {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	path!: string;

	@Column()
	link!: string;

	@Column()
	name!: string;

	@Column()
	descript!: string;

	@OneToMany(() => fm_request, (fm_request) => fm_request)
	@JoinColumn()
	requests!: fm_request;

	@CreateDateColumn({ select: false })
	createdAt?: string;

	@UpdateDateColumn({ type: 'timestamp', select: false })
	updatedAt?: number;
}
