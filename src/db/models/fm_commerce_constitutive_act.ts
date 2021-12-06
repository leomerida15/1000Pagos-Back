import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import fm_commerce from './fm_commerce';
import fm_photo from './fm_photo';

@Entity()
export default class fm_commerce_constitutive_act {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true, default: null })
	@ManyToOne(() => fm_commerce, (fm_commerce) => fm_commerce.rc_constitutive_act)
	@JoinColumn({ name: 'id_commerce' })
	id_commerce!: number | fm_commerce | null;

	@ManyToOne(() => fm_photo, (fm_photo) => fm_photo.rc_constitutive_act)
	@JoinColumn({ name: 'id_photo' })
	id_photo!: number | fm_photo;
}
