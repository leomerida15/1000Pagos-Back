// create table with id primary key and name string in typeorm
import {
	Entity,
	PrimaryGeneratedColumn,
	JoinColumn,
	ManyToOne,
	OneToOne,
	UpdateDateColumn,
	CreateDateColumn,
} from 'typeorm';

import fm_location from './fm_location';
import fm_commerce from './fm_commerce';
import fm_request from './fm_request';
import fm_product from './fm_product';

@Entity()
export default class fm_dir_pos {
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => fm_location, (fm_location) => fm_location.dir_pos)
	@JoinColumn({ name: 'id_location' })
	id_location!: number;

	@ManyToOne(() => fm_commerce, (fm_Commerce) => fm_Commerce.dir_pos)
	@JoinColumn({ name: 'id_commerce' })
	id_commerce!: number;

	@OneToOne(() => fm_request, (fm_request) => fm_request.dir_pos)
	@JoinColumn({ name: 'id_request' })
	id_request!: number;

	@ManyToOne(() => fm_product, (fm_product) => fm_product.dir_pos)
	@JoinColumn({ name: 'id_product' })
	id_product!: number;

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt!: number;
}
