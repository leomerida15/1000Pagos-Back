import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	JoinColumn,
	ManyToMany,
	JoinTable,
	Index,
	ManyToOne,
} from 'typeorm';
import fm_ident_type from './fm_ident_type';
import fm_phone from './fm_phone';
import fm_request from './fm_request';
import fm_roles from './fm_roles';
import fm_company from './fm_company';
import fm_department from './fm_department';

@Entity()
@Index(['id_ident_type', 'ident_num'], { unique: true })
export default class fm_worker {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	name!: string;

	@Column()
	last_name!: string;

	@Column({ default: 2 })
	@ManyToMany(() => fm_roles)
	@JoinTable()
	id_roles?: number;

	@Column()
	password!: string;

	@ManyToOne(() => fm_ident_type)
	@JoinColumn({ name: 'id_ident_type' })
	id_ident_type!: number;

	@ManyToOne(() => fm_company)
	@JoinColumn({ name: 'id_company' })
	id_company!: number;

	@ManyToOne(() => fm_department)
	@JoinColumn({ name: 'id_department' })
	id_department!: number;

	@Column()
	ident_num!: string;

	@Column({ unique: true })
	email!: string;

	@Column()
	phone!: string;

	@OneToMany(() => fm_request, (fm_request) => fm_request.id_client)
	@JoinColumn({ name: 'requests' })
	requests?: fm_request[];
}
