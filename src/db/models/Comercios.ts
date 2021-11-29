import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ synchronize: true })
export default class Comercios {
	@PrimaryGeneratedColumn()
	comerCod!: number;

	@Column()
	comerDesc!: string;

	@Column()
	comerTipoPer!: number;

	@Column()
	comerCodigoBanco!: string;

	@Column()
	comerCuentaBanco!: string;

	@Column()
	comerPagaIva!: string;

	@Column({ nullable: true })
	comerCodUsuario!: string;

	@Column()
	comerCodPadre!: number;

	@Column()
	comerRif!: string;

	@Column({ nullable: true })
	comerFreg!: string;

	@Column()
	comerCodTipoCont!: number;

	@Column()
	comerInicioContrato!: string;

	@Column()
	comerFinContrato!: string;

	@Column()
	comerExcluirPago!: number;

	@Column()
	comerCodCategoria!: number;

	@Column()
	comerGarantiaFianza!: number;

	@Column()
	comerModalidadGarantia!: number;

	@Column()
	comerMontoGarFian!: number;

	@Column()
	comerModalidadPos!: number;

	@Column()
	comerTipoPos!: number;

	@Column({ nullable: true })
	comerRecaudos!: string;

	@Column()
	comerDireccion!: string;

	@Column()
	comerObservaciones!: string;

	@Column()
	comerCodAliado!: number;

	@Column()
	comerEstatus!: number;

	@Column({ nullable: true })
	comerHorario!: string;

	@Column({ nullable: true, type: 'image' })
	comerImagen!: string;

	@Column()
	comerPuntoAdicional!: number;

	@Column()
	comerCodigoBanco2!: string;

	@Column()
	comerCuentaBanco2!: string;

	@Column()
	comerCodigoBanco3!: string;

	@Column()
	comerCuentaBanco3!: string;

	@Column()
	comerDireccionHabitacion!: string;

	@Column()
	comerDireccionPos!: string;

	@Column()
	comerDiasOperacion!: string;

	@Column({ nullable: true })
	comerFechaGarFian!: string;
}
