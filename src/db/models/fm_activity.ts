import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import fm_commerce from './fm_commerce';

@Entity()
export default class fm_activity {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	name!: string;

	@OneToMany(() => fm_commerce, (fm_commerce) => fm_commerce.id_activity)
	@JoinColumn({ name: 'commerces' })
	commerces?: fm_commerce[];

	@CreateDateColumn({ select: false })
	createdAt?: string;

	@UpdateDateColumn({ type: 'timestamp', select: false })
	updatedAt?: number;
}
