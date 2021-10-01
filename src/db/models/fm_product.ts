import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	OneToMany,
	JoinColumn,
} from 'typeorm';
import fm_photo from './fm_photo';
import fm_dir_pos from './fm_dir_pos';

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

	@OneToMany(() => fm_dir_pos, (fm_dir_pos) => fm_dir_pos.id_product)
	@JoinColumn({ name: 'dir_pos' })
	dir_pos?: number;

	@CreateDateColumn({ select: false })
	createdAt?: string;

	@UpdateDateColumn({ type: 'timestamp', select: false })
	updatedAt?: number;
}
