import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import fm_commerce from './fm_commerce';
import fm_type_request from './fm_type_request';
import fm_status_request from './fm_status_request';
import fm_photo from './fm_photo';
import fm_dir_pos from './fm_dir_pos';
import fm_location from './fm_location';
import fm_client from './fm_client';
import fm_payment_method from './fm_payment_method';
import fm_product from './fm_product';
import fm_request_origin from './fm_request_origin';
import { fm_type_payment } from './fm_type_payment';

@Entity()
export default class fm_request {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	number_post!: number;

	@Column()
	bank_account_num!: string;

	@Column({ name: 'ci_referred' })
	ci_referred!: string;

	@Column({ name: 'delivery_POS', default: false })
	POS_received!: boolean;

	@ManyToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_constitutive_act' })
	rc_constitutive_act!: number; //acta constitutiva

	@ManyToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_service_document' }) // recivo de un servicio publico
	rc_service_document!: number;

	@ManyToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_special_contributor' }) // acta de contribullene especial
	rc_special_contributor!: number;

	@ManyToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_ref_bank' }) // ref bancaria
	rc_ref_bank!: number;

	@ManyToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_comp_dep' }) // foto del  numero de cuenta
	rc_comp_dep!: number;

	@ManyToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_rif' })
	rc_rif!: number;

	@ManyToOne(() => fm_photo)
	@JoinColumn({ name: 'rc_ident_card' })
	rc_ident_card!: number;

	@ManyToOne(() => fm_payment_method, (fm_payment_method) => fm_payment_method.requests)
	@JoinColumn({ name: 'id_payment_method' })
	id_payment_method!: number;

	@ManyToOne(() => fm_type_payment, (fm_type_payment) => fm_type_payment.requests)
	@JoinColumn({ name: 'id_type_payment' })
	id_type_payment!: number;

	@ManyToOne(() => fm_client, (fm_client) => fm_client.requests)
	@JoinColumn({ name: 'id_client' })
	id_client!: number;

	@ManyToOne(() => fm_commerce, (fm_commerce) => fm_commerce.requests)
	@JoinColumn({ name: 'id_commerce' })
	id_commerce!: number;

	@ManyToOne(() => fm_product, (fm_product) => fm_product.requests)
	@JoinColumn({ name: 'id_product' })
	id_product!: number;

	@ManyToOne(() => fm_type_request, (fm_type_request) => fm_type_request.requests)
	@JoinColumn({ name: 'id_type_request' })
	id_type_request!: number;

	@Column({ default: 0 })
	@ManyToOne(() => fm_status_request, (fm_status_request) => fm_status_request.requests)
	@JoinColumn({ name: 'id_status_request' })
	id_status_request?: number;

	@ManyToOne(() => fm_request_origin, (fm_request_origin) => fm_request_origin.requests)
	@JoinColumn({ name: 'id_request_origin' })
	id_request_origin!: number;

	@OneToMany(() => fm_dir_pos, (fm_dir_pos) => fm_dir_pos.id_commerce)
	@JoinColumn({ name: 'dir_pos' })
	dir_pos?: fm_dir_pos | fm_location;

	@Column({ name: 'valid_rc_constitutive_act', type: 'json', default: `{ status: true, message: "" }` })
	valid_rc_constitutive_act!: { status: boolean; message: string };

	@Column({ name: 'valid_rc_special_contributor', type: 'json', default: `{ status: true, message: "" }` })
	valid_rc_special_contributor!: { status: boolean; message: string };

	@Column({ name: 'valid_rc_ref_bank', type: 'json', default: `{ status: true, message: "" }` })
	valid_rc_ref_bank!: { status: boolean; message: string };

	@Column({ name: 'valid_rc_comp_dep', type: 'json', default: `{ status: true, message: "" }` })
	valid_rc_comp_dep!: { status: boolean; message: string };

	@Column({ name: 'valid_rc_rif', type: 'json', default: `{ status: true, message: "" }` })
	valid_rc_rif!: { status: boolean; message: string };

	@Column({ name: 'valid_rc_ident_card', type: 'json', default: `{ status: true, message: "" }` })
	valid_rc_ident_card!: { status: boolean; message: string };

	@CreateDateColumn({ select: false })
	createdAt?: string;

	@UpdateDateColumn({ type: 'timestamp', select: false })
	updatedAt?: number;
}
