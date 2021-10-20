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
import fm_Client from './fm_client';

@Entity()
export default class fm_phone {
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => fm_Client, (fm_Client) => fm_Client.phones)
	@JoinColumn({ name: 'id_client', referencedColumnName: 'id' })
	id_client!: number;

	@Column({ unique: false })
	phone!: string;

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
