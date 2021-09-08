import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import fm_Client from './fm_client';
import fm_way_pay from './fm_payment_method';
import fm_commerce from './fm_commerce';
import fm_type_request from './fm_type_request';
import fm_status_request from './fm_status_request';
import fm_photo from './fm_photo';

@Entity()
export default class fm_request {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	number_post!: number;

	@OneToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_constitutive_act' })
	rc_constitutive_act!: string;

	@OneToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_property_document' })
	rc_property_document!: string;

	@OneToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_service_document' })
	rc_service_document!: string;

	@OneToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_special_contributor' })
	rc_special_contributor!: string;

	@OneToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_ref_bank' })
	rc_ref_bank!: string;

	@OneToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_ref_perso' })
	rc_ref_perso!: string;

	@OneToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_account_number' })
	rc_account_number!: string;

	@Column()
	text_account_number!: string;

	@OneToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_front_local' })
	rc_front_local!: string;

	@OneToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_in_local' })
	rc_in_local!: string;

	@OneToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_rif' })
	rc_rif!: string;

	@OneToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_ident_card' })
	rc_ident_card!: string;

	@OneToOne(() => fm_way_pay)
	@JoinColumn({ name: 'id_payment_method' })
	id_payment_method!: number;

	@ManyToOne(() => fm_Client, (fm_Client) => fm_Client.requests)
	@JoinColumn({ name: 'id_client' })
	id_client!: number;

	@ManyToOne(() => fm_commerce, (fm_commerce) => fm_commerce.requests)
	@JoinColumn({ name: 'id_commerce' })
	id_commerce!: number;

	@OneToOne(() => fm_type_request)
	@JoinColumn({ name: 'id_type_request' })
	id_type_request!: number;

	@OneToOne(() => fm_status_request)
	@JoinColumn({ name: 'fm_status_request' })
	fm_status_request!: number;

	@CreateDateColumn()
	createdAt?: string;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt?: number;
}
