import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import fm_request from './fm_request';
import fm_quotas_calculated from './fm_quotas_calculated';

@Entity()
export default class fm_payment_book {
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => fm_quotas_calculated, (fm_quotas_calculated) => fm_quotas_calculated.payments_book)
	@JoinColumn({ name: 'id_quotas_calculated' })
	id_quotas_calculated!: number;
}
