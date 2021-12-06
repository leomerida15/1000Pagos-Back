import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	OneToOne,
} from 'typeorm';
import fm_commerce from './fm_commerce';
import fm_type_request from './fm_type_request';
import fm_photo from './fm_photo';
import fm_dir_pos from './fm_dir_pos';
import fm_client from './fm_client';
import fm_payment_method from './fm_payment_method';
import fm_product from './fm_product';
import fm_request_origin from './fm_request_origin';
import fm_status from './fm_status';
import fm_type_payment from './fm_type_payment';
import fm_valid_request from './fm_valid_request';
import fm_quotas_calculat from './fm_quotas_calculated';
import Aliados from './Aliados';

@Entity()
export default class fm_request {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ name: 'code', nullable: true, default: null })
	code!: string;

	@Column({ nullable: true, name: 'number_post' })
	number_post!: number;

	@Column({ nullable: true, name: 'bank_account_num' })
	bank_account_num!: string;

	@Column({ nullable: true, name: 'ci_referred' })
	ci_referred!: string;

	@Column({ nullable: true, name: 'nro_comp_dep' })
	nro_comp_dep!: string;

	@Column({ nullable: true, name: 'discount' })
	discount!: boolean;

	@Column({ nullable: true, name: 'pagadero' })
	pagadero!: boolean; //paga despues

	@Column({ nullable: true })
	@OneToOne(() => fm_quotas_calculat)
	@JoinColumn({ name: 'id_quotas_calculat' })
	id_quotas_calculat!: number | fm_quotas_calculat;

	@Column({ nullable: true })
	@ManyToOne(() => fm_payment_method, (fm_payment_method) => fm_payment_method.requests)
	@JoinColumn({ name: 'id_payment_method' })
	id_payment_method!: number | fm_payment_method;

	@Column({ nullable: true })
	@ManyToOne(() => fm_type_payment, (fm_type_payment) => fm_type_payment.requests)
	@JoinColumn({ name: 'id_type_payment' })
	id_type_payment!: number | fm_type_payment;

	@Column({ nullable: true })
	@ManyToOne(() => fm_client, (fm_client) => fm_client.requests)
	@JoinColumn({ name: 'id_client' })
	id_client!: number | fm_client;

	@Column({ nullable: true })
	@ManyToOne(() => fm_commerce, (fm_commerce) => fm_commerce.requests)
	@JoinColumn({ name: 'id_commerce' })
	id_commerce!: number | fm_commerce;

	@Column({ nullable: true })
	@ManyToOne(() => fm_product, (fm_product) => fm_product.requests)
	@JoinColumn({ name: 'id_product' })
	id_product!: number | fm_product;

	@Column({ nullable: true })
	@ManyToOne(() => fm_type_request, (fm_type_request) => fm_type_request.requests)
	@JoinColumn({ name: 'id_type_request' })
	id_type_request!: number | fm_type_request;

	@Column({ nullable: true })
	@ManyToOne(() => fm_request_origin, (fm_request_origin) => fm_request_origin.requests)
	@JoinColumn({ name: 'id_request_origin' })
	id_request_origin!: number | fm_request_origin;

	@Column({ nullable: true })
	@OneToOne(() => fm_valid_request)
	@JoinColumn({ name: 'id_valid_request' })
	id_valid_request!: number | fm_valid_request;

	@OneToMany(() => fm_dir_pos, (fm_dir_pos) => fm_dir_pos.id_request)
	@JoinColumn({ name: 'dir_pos' })
	dir_pos?: fm_dir_pos[];

	@Column({ nullable: true })
	@ManyToOne(() => fm_photo, (fm_photo) => fm_photo.requests)
	@JoinColumn({ name: 'rc_comp_dep' }) // foto del  numero de cuenta
	rc_comp_dep!: number | fm_photo;

	@Column({ nullable: true })
	@ManyToOne(() => fm_photo, (fm_photo) => fm_photo.requests)
	@JoinColumn({ name: 'rc_ref_bank' }) // ref bancaria
	rc_ref_bank!: number | fm_photo;

	@OneToMany(() => fm_status, (fm_status) => fm_status.id_request)
	@JoinColumn({ name: 'status' })
	status?: fm_status[];

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
