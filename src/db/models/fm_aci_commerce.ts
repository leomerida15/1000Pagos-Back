// create table with id primary key and name string in typeorm
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
	UpdateDateColumn,
	CreateDateColumn,
	OneToOne,
} from 'typeorm';
import fm_commerce from './fm_commerce';
import fm_bank from './fm_bank';
import fm_worker from './fm_worker';

@Entity()
export default class fm_aci_commerce {
	@PrimaryGeneratedColumn()
	id?: number;

	@OneToOne(() => fm_commerce)
	@JoinColumn({ name: 'id_commerce' })
	id_commerce!: number;

	@ManyToOne(() => fm_worker, (fm_worker) => fm_worker.commerces)
	@JoinColumn({ name: 'id_worker' })
	id_worker!: number;

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
