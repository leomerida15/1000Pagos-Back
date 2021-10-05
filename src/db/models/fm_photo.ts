import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import fm_commerce from './fm_commerce';

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

	@CreateDateColumn({ select: false })
	createdAt?: string;

	@UpdateDateColumn({ type: 'timestamp', select: false })
	updatedAt?: number;
}
