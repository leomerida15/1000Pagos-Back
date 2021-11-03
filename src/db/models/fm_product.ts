import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	OneToMany,
	JoinColumn,
	ManyToMany,
	JoinTable,
} from 'typeorm';
import fm_photo from './fm_photo';
import fm_dir_pos from './fm_dir_pos';
import fm_request from './fm_request';
import fm_payment_method from './fm_payment_method';

@Entity()
export default class fm_product {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	name!: string;

	@Column()
	description!: string;

	@Column()
	price!: number;

	@ManyToMany(() => fm_photo)
	@JoinTable()
	photos?: fm_photo[];

	@OneToMany(() => fm_dir_pos, (fm_dir_pos) => fm_dir_pos.id_product)
	@JoinColumn({ name: 'dir_pos' })
	dir_pos?: number;

	@OneToMany(() => fm_request, (fm_request) => fm_request.id_commerce)
	@JoinColumn({ name: 'requests' })
	requests?: fm_request[];

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
