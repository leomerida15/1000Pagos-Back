import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import fm_product from './fm_product';
import fm_quotas_calculated from './fm_quotas_calculated';

@Entity()
export default class fm_plans {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	name!: string;

	@Column()
	initial!: number;

	@Column()
	total!: number;

	@Column()
	quota!: number;

	@Column()
	discount!: number;

	@ManyToOne(() => fm_product, (fm_product) => fm_product.plans)
	@JoinColumn({ name: 'id_product' })
	id_product!: number | fm_product;

	@OneToMany(() => fm_quotas_calculated, (fm_quotas_calculated) => fm_quotas_calculated.id_plan)
	@JoinColumn({ name: 'quotas_calculated' })
	quotas_calculated?: fm_quotas_calculated[];
}
