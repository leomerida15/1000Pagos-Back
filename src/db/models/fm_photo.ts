import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
	OneToMany,
	ManyToMany,
	JoinTable,
} from 'typeorm';
import fm_request from './fm_request';
import fm_product from './fm_product';

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
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
