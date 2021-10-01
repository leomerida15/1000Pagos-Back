import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import fm_worker from './fm_worker';

@Entity()
export default class fm_company {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	name!: string;

	@ManyToOne(() => fm_worker, (fm_worker) => fm_worker.id_company)
	@JoinColumn({ name: 'id_commerce' })
	workers?: fm_worker[];

	@CreateDateColumn({ select: false })
	createdAt?: string;

	@UpdateDateColumn({ type: 'timestamp', select: false })
	updatedAt?: number;
}
