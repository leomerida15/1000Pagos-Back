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
	rc_constitutive_act!: number; //acta constitutiva

	@OneToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_property_document' }) // documento de propiedad
	rc_property_document!: number;

	@OneToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_service_document' }) // recivo de un servicio publico
	rc_service_document!: number;

	@OneToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_special_contributor' }) // acta de contribullene especial
	rc_special_contributor!: number;

	@OneToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_ref_bank' }) // ref bancaria
	rc_ref_bank!: number;

	@OneToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_ref_perso' }) // ref personal
	rc_ref_perso!: number;

	@OneToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_account_number' }) // foto del  numero de cuenta
	rc_account_number!: number;

	@Column()
	text_account_number!: string;

	@OneToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_rif' })
	rc_rif!: number;

	@OneToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_ident_card' })
	rc_ident_card!: number;

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

	@Column({ default: 0 })
	@OneToOne(() => fm_status_request)
	@JoinColumn({ name: 'fm_status_request' })
	fm_status_request?: number;

	@CreateDateColumn()
	createdAt?: string;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt?: number;
}
