import { Entity, JoinColumn, PrimaryGeneratedColumn, ManyToOne, OneToOne, Column } from 'typeorm';
import fm_plans from './fm_plans';
import fm_request from './fm_request';

@Entity()
export default class fm_quotas_calculated {
	// relaciones y base de latabla
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => fm_plans, (fm_plans) => fm_plans.quotas_calculated)
	@JoinColumn({ name: 'id_plan' })
	id_plan!: number | fm_plans;

	@OneToOne(() => fm_request, (fm_request) => fm_request.id_quotas_calculat)
	@JoinColumn({ name: 'id_request' })
	id_request!: number | fm_request;

	@Column({ name: 'quotas_total' })
	quotas_total!: number; // =|> (total / quota)

	// cuotas aun no pagas
	@Column({ name: 'quotas_to_pay' })
	quotas_to_pay!: number; // =|> (quotas_total - quotas_paid)

	// cuotas ya pagadas
	@Column({ name: 'quotas_paid', default: 0 })
	quotas_paid!: number; // =|> vienen de front y se inicializa en 0
}
