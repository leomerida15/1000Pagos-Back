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
import fm_afiliados from './fm_afiliados';

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

	@OneToMany(() => fm_afiliados, (fm_afiliados) => fm_afiliados.id_bank)
	@JoinColumn({ name: 'fm_afiliados' })
	afiliados?: fm_afiliados[];

	@CreateDateColumn({ select: false })
	createdAt?: string;

	@UpdateDateColumn({ type: 'timestamp', select: false })
	updatedAt?: number;
}
