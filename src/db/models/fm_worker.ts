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
import fm_commerce from './fm_commerce';
import fm_aci_commerce from './fm_aci_commerce';

@Entity()
@Index(['id_ident_type', 'ident_num'], { unique: true })
export default class fm_worker {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@Column({ nullable: true })
	last_name!: string;

	@ManyToMany(() => fm_roles)
	@JoinTable()
	roles?: fm_roles[];

	@Column({ nullable: true })
	password!: string;

	@ManyToOne(() => fm_ident_type, (fm_ident_type) => fm_ident_type.workers)
	@JoinColumn({ name: 'id_ident_type' })
	id_ident_type!: number;

	@ManyToOne(() => fm_company)
	@JoinColumn({ name: 'id_company' })
	id_company!: number;

	@ManyToOne(() => fm_department)
	@JoinColumn({ name: 'id_department' })
	id_department!: number;

	@OneToMany(() => fm_aci_commerce, (fm_aci_commerce) => fm_aci_commerce.id_worker)
	@JoinColumn({ name: 'commerces' })
	commerces?: fm_aci_commerce[];

	@Column({ nullable: true })
	ident_num!: string;

	@Column({ unique: true })
	email!: string;

	@Column({ default: 0 })
	block?: number;

	@Column({ nullable: true })
	phone!: string;

	@OneToMany(() => fm_request, (fm_request) => fm_request.id_client)
	@JoinColumn({ name: 'requests' })
	requests?: fm_request[];
}
