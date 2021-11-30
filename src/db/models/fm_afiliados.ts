import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import fm_bank from './fm_bank';
import fm_type_person from './fm_type_person';
import fm_activity from './fm_activity';

@Entity()
export default class fm_afiliados {
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => fm_type_person, (fm_type_person) => fm_type_person.afiliados)
	@JoinColumn({ name: 'id_type_person' })
	id_type_person!: number;

	@ManyToOne(() => fm_bank, (fm_bank) => fm_bank.afiliados)
	@JoinColumn({ name: 'id_bank' })
	id_bank!: number;

	@OneToMany(() => fm_activity, (fm_activity) => fm_activity.id_afiliado)
	@JoinColumn({ name: 'activitys' })
	activitys?: fm_activity[];

	@Column({ nullable: true })
	bank_account_number!: string;

	@Column({ nullable: true })
	name!: string;
}
