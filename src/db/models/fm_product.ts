import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import fm_photo from './fm_photo';

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

	@OneToMany(() => fm_photo, (fm_photo) => fm_photo.id)
	photos?: fm_photo[];

	@CreateDateColumn({ select: false })
	createdAt?: string;

	@UpdateDateColumn({ type: 'timestamp', select: false })
	updatedAt?: number;
}
