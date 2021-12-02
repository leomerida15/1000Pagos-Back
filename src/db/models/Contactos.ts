import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ synchronize: false })
export default class Contactos {
	@PrimaryGeneratedColumn()
	contCode!: number;

	@Column({ nullable: true })
	contCodComer!: number;

	@Column({ nullable: true })
	contCodUsuario!: string;

	@Column({ nullable: true })
	contNombres!: string;

	@Column({ nullable: true })
	contApellidos!: string;

	@Column({ nullable: true })
	contTelefLoc!: string;

	@Column({ nullable: true })
	contTelefMov!: string;

    @Column({ nullable: true })
	contMail!: string;

	@Column({ nullable: true })
	contFreg!: string;

}
