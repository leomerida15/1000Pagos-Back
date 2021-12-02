import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ synchronize: false })
export default class Comercios {
	@PrimaryGeneratedColumn()
	comerCod!: number;

	@Column({ nullable: true })
	comerDesc!: string;

	@Column({ nullable: true })
	comerTipoPer!: number;

	@Column({ nullable: true })
	comerCodigoBanco!: string;

	@Column({ nullable: true })
	comerCuentaBanco!: string;

	@Column({ nullable: true })
	comerPagaIva!: string;

	@Column({ nullable: true })
	comerCodUsuario!: string;

	@Column({ nullable: true })
	comerCodPadre!: number;

	@Column({ nullable: true })
	comerRif!: string;

	@Column({ nullable: true })
	comerFreg!: string;

	@Column({ nullable: true })
	comerCodTipoCont!: number;

	@Column({ nullable: true })
	comerInicioContrato!: string;

	@Column({ nullable: true })
	comerFinContrato!: string;

	@Column({ nullable: true })
	comerExcluirPago!: number;

	@Column({ nullable: true })
	comerCodCategoria!: number;

	@Column({ nullable: true })
	comerGarantiaFianza!: number;

	@Column({ nullable: true })
	comerModalidadGarantia!: number;

	@Column({ nullable: true })
	comerMontoGarFian!: number;

	@Column({ nullable: true })
	comerModalidadPos!: number;

	@Column({ nullable: true })
	comerTipoPos!: number;

	@Column({ nullable: true })
	comerRecaudos!: string;

	@Column({ nullable: true })
	comerDireccion!: string;

	@Column({ nullable: true })
	comerObservaciones!: string;

	@Column({ nullable: true })
	comerCodAliado!: number;

	@Column({ nullable: true })
	comerEstatus!: number;

	@Column({ nullable: true })
	comerHorario!: string;

	@Column({ nullable: true, type: 'image' })
	comerImagen!: string;

	@Column({ nullable: true })
	comerPuntoAdicional!: number;

	@Column({ nullable: true })
	comerCodigoBanco2!: string;

	@Column({ nullable: true })
	comerCuentaBanco2!: string;

	@Column({ nullable: true })
	comerCodigoBanco3!: string;

	@Column({ nullable: true })
	comerCuentaBanco3!: string;

	@Column({ nullable: true })
	comerDireccionHabitacion!: string;

	@Column({ nullable: true })
	comerDireccionPos!: string;

	@Column({ nullable: true })
	comerDiasOperacion!: string;

	@Column({ nullable: true })
	comerFechaGarFian!: string;
}
