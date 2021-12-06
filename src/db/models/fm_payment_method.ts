import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import fm_request from './fm_request';

@Entity()
export default class fm_payment_method {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@OneToMany(() => fm_request, (fm_request) => fm_request.id_commerce)
	@JoinColumn({ name: 'requests' })
	requests?: fm_request[];

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
