import { Entity, JoinColumn, PrimaryGeneratedColumn, ManyToOne, OneToOne, Column, OneToMany } from 'typeorm';
import fm_payment_book from './fm_payment_book';
import fm_request from './fm_request';
import fm_type_payment from './fm_type_payment';

@Entity()
export default class fm_quotas_calculated {
	// relaciones y base de latabla
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => fm_type_payment, (fm_type_payment) => fm_type_payment.quotas_calculateds)
	@JoinColumn({ name: 'id_type_payment' })
	id_type_payment!: number | fm_type_payment;

	@Column({ nullable: true, default: null })
	@OneToOne(() => fm_request, (fm_request) => fm_request.id_quotas_calculat)
	@JoinColumn({ name: 'id_request' })
	id_request!: number | fm_request;

	@Column({ nullable: true })
	initial!: number;

	@Column({ name: 'quotas_total' })
	quotas_total!: number; // =|> (total / quota)

	// cuotas aun no pagas
	@Column({ name: 'quotas_to_pay' })
	quotas_to_pay!: number; // =|> (quotas_total - quotas_paid)

	// cuotas ya pagadas
	@Column({ name: 'quotas_paid', default: 0 })
	quotas_paid!: number; // =|> vienen de front y se inicializa en 0

	@OneToMany(() => fm_payment_book, (fm_payment_book) => fm_payment_book.id_quotas_calculated)
	@JoinColumn({ name: 'payments_book' })
	payments_book?: fm_payment_book[];
}
