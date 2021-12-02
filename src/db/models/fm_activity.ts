import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import fm_commerce from './fm_commerce';
import fm_afiliados from './fm_afiliados';

@Entity()
export default class fm_activity {
	@PrimaryGeneratedColumn()
	id?: string;

	@Column({ nullable: true })
	name!: string;

	@ManyToOne(() => fm_afiliados, (fm_afiliados) => fm_afiliados.activitys)
	@JoinColumn({ name: 'id_afiliado' })
	id_afiliado!: number;

	@OneToMany(() => fm_commerce, (fm_commerce) => fm_commerce.id_activity)
	@JoinColumn({ name: 'commerces' })
	commerces?: fm_commerce[];

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
