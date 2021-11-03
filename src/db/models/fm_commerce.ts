import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import fm_activity from './fm_activity';
import fm_Client from './fm_client';
import fm_bank_commerce from './fm_bank_commerce';
import fm_request from './fm_request';
import fm_photo from './fm_photo';
import fm_location from './fm_location';
import fm_aci_commerce from './fm_aci_commerce';
import fm_dir_pos from './fm_dir_pos';
import fm_ident_type from './fm_ident_type';

@Entity()
export default class fm_commerce {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	name!: string;

	@ManyToOne(() => fm_ident_type, (fm_ident_type) => fm_ident_type.clients)
	@JoinColumn({ name: 'id_ident_type' })
	id_ident_type!: number;

	@Column()
	ident_num!: string;

	@Column({ default: 1 })
	special_contributor!: number;

	@ManyToOne(() => fm_activity, (fm_activity) => fm_activity.commerces)
	@JoinColumn({ name: 'id_activity' })
	id_activity!: number;

	@ManyToOne(() => fm_location, (fm_location) => fm_location.commerces)
	@JoinColumn({ name: 'id_location' })
	id_location!: number;

	@OneToMany(() => fm_aci_commerce, (fm_aci_commerce) => fm_aci_commerce.id_commerce)
	@JoinColumn({ name: 'aci' })
	aci?: fm_bank_commerce[];

	@ManyToOne(() => fm_Client, (fm_Client) => fm_Client.commerces)
	@JoinColumn({ name: 'id_client' })
	id_client!: number;

	@OneToMany(() => fm_bank_commerce, (fm_bank_commerce) => fm_bank_commerce.id_commerce)
	@JoinColumn({ name: 'banks' })
	banks?: fm_bank_commerce[];

	@OneToMany(() => fm_dir_pos, (fm_dir_pos) => fm_dir_pos.id_commerce)
	@JoinColumn({ name: 'dir_pos' })
	dir_pos?: number;

	@ManyToMany(() => fm_photo)
	@JoinTable()
	photos?: fm_photo[];

	@OneToMany(() => fm_request, (fm_request) => fm_request.id_commerce)
	@JoinColumn({ name: 'requests' })
	requests!: fm_request[];

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
