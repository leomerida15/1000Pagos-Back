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
import fm_photo from './fm_photo';
import fm_commerce from './fm_commerce';
import fm_bank_commerce from './fm_bank_commerce';
import fm_location from './fm_location';

@Entity()
@Index(['id_ident_type', 'ident_num'], { unique: true })
export default class fm_client {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	name!: string;

	@Column()
	last_name!: string;

	@Column({ default: 1 })
	@ManyToMany(() => fm_roles)
	@JoinTable()
	id_roles?: number;

	@Column()
	password!: string;

	@ManyToOne(() => fm_ident_type, (fm_ident_type) => fm_ident_type.clients)
	@JoinColumn({ name: 'id_ident_type' })
	id_ident_type!: number;

	@Column()
	ident_num!: string;

	@Column({ unique: true })
	email!: string;

	@OneToMany(() => fm_phone, (fm_phone) => fm_phone.id_client)
	@JoinColumn({ name: 'phones' })
	phones?: fm_phone[];

	@OneToMany(() => fm_commerce, (fm_commerce) => fm_commerce.id_client)
	@JoinColumn({ name: 'commerces' })
	commerces?: fm_commerce[];

	@OneToMany(() => fm_bank_commerce, (fm_bank_commerce) => fm_bank_commerce.id_client)
	@JoinColumn({ name: 'banks' })
	banks?: fm_bank_commerce[];

	@ManyToMany(() => fm_photo)
	@JoinTable()
	photos?: fm_photo[];

	@OneToMany(() => fm_request, (fm_request) => fm_request.id_client)
	@JoinColumn({ name: 'requests' })
	requests?: fm_request[];

	@ManyToOne(() => fm_location, (fm_location) => fm_location.clients)
	@JoinColumn({ name: 'id_location' })
	id_location?: number;
}
