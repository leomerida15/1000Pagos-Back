import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import fm_quotas_calculated from './fm_quotas_calculated';
import fm_request from './fm_request';

@Entity()
export default class fm_type_payment {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@OneToMany(() => fm_quotas_calculated, (fm_quotas_calculated) => fm_quotas_calculated.id_type_payment)
	@JoinColumn()
	quotas_calculateds?: fm_quotas_calculated[];

	@OneToMany(() => fm_request, (fm_request) => fm_request.id_request_origin)
	@JoinColumn({ name: 'requests' })
	requests?: fm_request[];
}
