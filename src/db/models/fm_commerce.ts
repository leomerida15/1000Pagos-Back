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
import fm_worker from './fm_worker';
import fm_Client from './fm_client';
import fm_bank_commerce from './fm_bank_commerce';
import fm_dir_post from './fm_dir_post';
import fm_request from './fm_request';
import fm_photo from './fm_photo';

@Entity()
export default class fm_commerce {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	name!: string;

	@Column()
	id_ident_type!: number;

	@Column()
	nro_ident!: string;

	@Column({ default: 0 })
	special_contributor!: number;

	@OneToOne(() => fm_activity)
	@JoinColumn({ name: 'id_activity' })
	id_activity!: number;

	@Column()
	id_location!: number;

	@Column({ default: 0 })
	@ManyToOne(() => fm_worker, (fm_worker) => fm_worker.id)
	@JoinColumn({ name: 'id_aci' })
	id_aci!: number;

	@OneToOne(() => fm_Client)
	@JoinColumn({ name: 'id_client' })
	id_client!: number;

	@OneToMany(() => fm_bank_commerce, (fm_bank_commerce) => fm_bank_commerce.id_commerce)
	@JoinColumn({ name: 'banks' })
	banks!: fm_bank_commerce[];

	@OneToMany(() => fm_dir_post, (fm_dir_post) => fm_dir_post.id_commerce)
	@JoinColumn({ name: 'dir_posts' })
	dir_posts!: fm_dir_post[];

	@ManyToMany(() => fm_photo)
	@JoinTable()
	photos?: fm_photo[];

	@OneToMany(() => fm_request, (fm_request) => fm_request.id_commerce)
	@JoinColumn({ name: 'requests' })
	requests!: fm_request[];

	@CreateDateColumn()
	createdAt?: string;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt?: number;
}
