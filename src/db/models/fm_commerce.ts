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
import fm_dir_pos from './fm_dir_pos';
import fm_ident_type from './fm_ident_type';
import fm_commerce_constitutive_act from './fm_commerce_constitutive_act';
import Aliados from './Aliados';

@Entity()
export default class fm_commerce {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@ManyToOne(() => fm_ident_type, (fm_ident_type) => fm_ident_type.commerces)
	@JoinColumn({ name: 'id_ident_type' })
	id_ident_type!: number;

	@Column({ nullable: true })
	ident_num!: string;

	@Column({ default: 1 })
	special_contributor!: number;

	@ManyToOne(() => fm_activity, (fm_activity) => fm_activity.commerces)
	@JoinColumn({ name: 'id_activity' })
	id_activity!: number | fm_activity;

	@ManyToOne(() => fm_location, (fm_location) => fm_location.commerces)
	@JoinColumn({ name: 'id_location' })
	id_location!: number | fm_location;

	@ManyToOne(() => Aliados, (Aliados) => Aliados.commerces)
	@JoinColumn({ name: 'id_aci' })
	id_aci!: number | Aliados;

	@ManyToOne(() => fm_Client, (fm_Client) => fm_Client.commerces)
	@JoinColumn({ name: 'id_client' })
	id_client!: number;

	@OneToMany(
		() => fm_commerce_constitutive_act,
		(fm_commerce_constitutive_act) => fm_commerce_constitutive_act.id_commerce
	)
	@JoinColumn({ name: 'rc_constitutive_act' })
	rc_constitutive_act?: fm_commerce_constitutive_act[]; //acta constitutiva

	@Column({ nullable: true, default: null })
	@ManyToOne(() => fm_photo, (fm_photo) => fm_photo.requests)
	@JoinColumn({ name: 'rc_special_contributor' }) // acta de contribullene especial
	rc_special_contributor!: fm_photo | number;

	@Column({ nullable: true, default: null })
	@ManyToOne(() => fm_photo, (fm_photo) => fm_photo.requests)
	@JoinColumn({ name: 'rc_rif' })
	rc_rif!: fm_photo | number;

	@Column({ nullable: true })
	days!: string;

	@OneToMany(() => fm_bank_commerce, (fm_bank_commerce) => fm_bank_commerce.id_commerce)
	@JoinColumn({ name: 'banks' })
	banks?: fm_bank_commerce[];

	@OneToMany(() => fm_dir_pos, (fm_dir_pos) => fm_dir_pos.id_commerce)
	@JoinColumn({ name: 'dir_pos' })
	dir_pos?: number;

	@OneToMany(() => fm_request, (fm_request) => fm_request.id_commerce)
	@JoinColumn({ name: 'requests' })
	requests?: fm_request[];

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
