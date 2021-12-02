import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	JoinColumn,
	OneToMany,
	OneToOne,
} from 'typeorm';
import fm_request from './fm_request';
import fm_commerce_constitutive_act from './fm_commerce_constitutive_act';

@Entity()
export default class fm_photo {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	path!: string;

	@Column({ nullable: true })
	name!: string;

	@Column({ nullable: true })
	descript!: string;

	@OneToMany(() => fm_request, (fm_request) => fm_request)
	@JoinColumn()
	requests?: fm_request;

	@OneToOne(
		() => fm_commerce_constitutive_act,
		(fm_commerce_constitutive_act) => fm_commerce_constitutive_act.id_photo
	)
	@JoinColumn()
	rc_constitutive_act?: fm_commerce_constitutive_act;

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
