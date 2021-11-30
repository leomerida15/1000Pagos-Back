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
import fm_client from './fm_client';

@Entity()
export default class fm_bank_commerce {
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => fm_commerce, (fm_commerce) => fm_commerce.banks)
	@JoinColumn({ name: 'id_commerce' })
	id_commerce!: number;

	@ManyToOne(() => fm_client, (fm_client) => fm_client.banks)
	@JoinColumn({ name: 'id_client' })
	id_client!: number;

	@ManyToOne(() => fm_bank, (fm_bank) => fm_bank.commerces)
	@JoinColumn({ name: 'id_bank' })
	id_bank!: number;

	@Column({ nullable: true })
	bank_account_num!: string;

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
