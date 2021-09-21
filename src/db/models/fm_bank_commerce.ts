// create table with id primary key and name string in typeorm
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
	UpdateDateColumn,
	CreateDateColumn,
} from 'typeorm';
import fm_commerce from './fm_commerce';
import fm_bank from './fm_bank';

@Entity()
export default class fm_bank_commerce {
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => fm_commerce, (fm_commerce) => fm_commerce.banks)
	@JoinColumn({ name: 'id_commerce' })
	id_commerce!: number;

	@ManyToOne(() => fm_bank, (fm_bank) => fm_bank.commerces)
	@JoinColumn({ name: 'id_bank' })
	id_bank!: number;

	@Column({ unique: true })
	bank_account_num!: string;

	@CreateDateColumn()
	createdAt?: string;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt?: number;
}
