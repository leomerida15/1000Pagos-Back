import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import fm_bank_commerce from './fm_bank_commerce';

@Entity()
export default class fm_bank {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	code!: string;

	@Column()
	name!: string;

	@OneToMany(() => fm_bank_commerce, (fm_bank_commerce) => fm_bank_commerce.id_commerce)
	@JoinColumn({ name: 'commerces' })
	commerces?: fm_bank_commerce[];

	@CreateDateColumn({ select: false })
	createdAt?: string;

	@UpdateDateColumn({ type: 'timestamp', select: false })
	updatedAt?: number;
}
