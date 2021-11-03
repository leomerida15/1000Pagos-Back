import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import fm_request from './fm_request';

@Entity()
export default class fm_valid_request {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ name: 'valid_constitutive_act' })
	valid_constitutive_act!: string;

	@Column({ name: 'valid_special_contributor' })
	valid_special_contributor!: string;

	@Column({ name: 'valid_ref_bank' })
	valid_ref_bank!: string;

	@Column({ name: 'valid_comp_dep' })
	valid_comp_dep!: string;

	@Column({ name: 'valid_rif' })
	valid_rif!: string;

	@Column({ name: 'valid_ident_card' })
	valid_ident_card!: string;
}
