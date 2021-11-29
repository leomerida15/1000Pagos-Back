import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationV5_1638117156818 implements MigrationInterface {
	name = 'migrationV5_1638117156818';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "fm_type_request" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_f39703df7a0782dcf14f1ac3c6f" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_bb8415007faa6f34aa108f5be64" DEFAULT getdate(), CONSTRAINT "PK_809643386399dbbdf1f5025d93d" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_commerce_constitutive_act" ("id" int NOT NULL IDENTITY(1,1), "id_commerce" int, "id_photo" int, CONSTRAINT "PK_11e5e695fdd0292eede6e634ee1" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_photo" ("id" int NOT NULL IDENTITY(1,1), "path" nvarchar(255) NOT NULL, "name" nvarchar(255) NOT NULL, "descript" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_9a7472173012449a35734d65ade" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_a6161f830919c74a58d3c4813eb" DEFAULT getdate(), "rcConstitutiveActId" int, CONSTRAINT "PK_7bb4d32f98922c8d468355ed1c8" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "REL_f2bbbe05ebffdcb768131a549c" ON "fm_photo" ("rcConstitutiveActId") WHERE "rcConstitutiveActId" IS NOT NULL`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_ciudad" ("id" int NOT NULL IDENTITY(1,1), "ciudad" nvarchar(255) NOT NULL, "area_code" nvarchar(255) NOT NULL, "postal_code" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_da62da8d36d6f19e911ebaf9c3a" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_f6627f121e3b26ad9671af9098e" DEFAULT getdate(), "id_estado" int, CONSTRAINT "PK_663e8a8ca7f60889e6920d5c716" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_parroquia" ("id" int NOT NULL IDENTITY(1,1), "parroquia" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_5736c1410b90abd3e860cee0ae4" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_22fcaa57a0bd4d00d1996cd1f2d" DEFAULT getdate(), "id_municipio" int, CONSTRAINT "PK_e33d598975915f210a926a83414" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_municipio" ("id" int NOT NULL IDENTITY(1,1), "municipio" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_b09796cab2d0f8e081b3871314c" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_32a2657a133fe7596a6ba843dee" DEFAULT getdate(), "id_estado" int, CONSTRAINT "PK_87e63f0fe36429d5c71d71dd593" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_estado" ("id" int NOT NULL IDENTITY(1,1), "estado" nvarchar(255) NOT NULL, "iso_3166" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_aa3194b27d8573a8595f114b27e" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_ab1300b2dd07d94beb72f21d151" DEFAULT getdate(), CONSTRAINT "PK_be76dfa8112c92facba26c76484" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_location" ("id" int NOT NULL IDENTITY(1,1), "sector" nvarchar(255) NOT NULL, "calle" nvarchar(255) NOT NULL, "local" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_606e17763afea82bcc8c6842275" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_8f15e5e70d357faad50dafcecd6" DEFAULT getdate(), "id_estado" int, "id_municipio" int, "id_ciudad" int, "id_parroquia" int, CONSTRAINT "PK_0192539649646c28258e50dfd76" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_product" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "description" nvarchar(255) NOT NULL, "price" int NOT NULL, "quota" int NOT NULL CONSTRAINT "DF_08fb1b0c802fc5a6038a7abf4a1" DEFAULT 50, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_1ccb549470e9fee1573b1ea5972" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_defb269b26f4e3ef9cc32b14bc3" DEFAULT getdate(), CONSTRAINT "PK_74b9b940f9653db01b7117cffac" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_dir_pos" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_b0601a571e692b3236fd942a182" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_2ecfc97c4f0ef2ad78f720cda5b" DEFAULT getdate(), "id_location" int, "id_commerce" int, "id_request" int, "id_product" int, CONSTRAINT "PK_cffae6a17418eb3e842642c7864" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_payment_method" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_bbe33904cbd49bf2ba040d5bbbe" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_ed257de8d6fdc6ede2f67e55ba3" DEFAULT getdate(), CONSTRAINT "PK_0bfd5127d1db6985eec810b3bf5" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_request_origin" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, CONSTRAINT "PK_46628188d2a3ec54075667a9d53" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_status_request" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_3e0f814325cfb5d4656eced64f2" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_2aca385c7abd727365e86629264" DEFAULT getdate(), CONSTRAINT "PK_f3dddb343c7adbc615c4cf28df6" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_department" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_88e4e6cd33457fb1d2786f6a632" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_889fc26b13d39fe4ea250bbfa4c" DEFAULT getdate(), CONSTRAINT "PK_eadfe195782d7e0aebd062cccb9" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_status" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_791328ce8e2c24140502a67e8fd" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_499beead1dc8e7b87a5f9445612" DEFAULT getdate(), "id_request" int, "id_department" int, "id_status_request" int, CONSTRAINT "PK_91eb9ad0df74b9d29b53a527599" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_payment_book" ("id" int NOT NULL IDENTITY(1,1), "relative_date" datetime NOT NULL, "absolute_date" datetime NOT NULL, "id_quotas_calculated" int, CONSTRAINT "PK_e68835ad49da9303241569c559c" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_quotas_calculated" ("id" int NOT NULL IDENTITY(1,1), "id_request" int, "initial" int NOT NULL, "quotas_total" int NOT NULL, "quotas_to_pay" int NOT NULL, "quotas_paid" int NOT NULL CONSTRAINT "DF_72907038703bed0e840986e1c09" DEFAULT 0, "id_type_payment" int, CONSTRAINT "PK_1fcb0d27b4a1b6212c8c20d6141" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "REL_47c08889ebe40f2671a747e614" ON "fm_quotas_calculated" ("id_request") WHERE "id_request" IS NOT NULL`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_type_payment" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, CONSTRAINT "PK_a3cfe925bfabad7b00a14912e3c" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_valid_request" ("id" int NOT NULL IDENTITY(1,1), "valid_constitutive_act" nvarchar(255) NOT NULL, "valid_special_contributor" nvarchar(255) NOT NULL, "valid_ref_bank" nvarchar(255) NOT NULL, "valid_comp_dep" nvarchar(255) NOT NULL, "valid_rif" nvarchar(255) NOT NULL, "valid_ident_card" nvarchar(255) NOT NULL, CONSTRAINT "PK_30eecfe0092a93cd8d345586e76" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_request" ("id" int NOT NULL IDENTITY(1,1), "code" nvarchar(255), "number_post" int NOT NULL, "bank_account_num" nvarchar(255) NOT NULL, "ci_referred" nvarchar(255) NOT NULL, "nro_comp_dep" nvarchar(255) NOT NULL, "discount" bit NOT NULL, "pagadero" bit NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_1284c74e7454ad173773d68d2d3" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_25390c098a36ce62d28e42bd768" DEFAULT getdate(), "id_quotas_calculat" int, "id_payment_method" int, "id_type_payment" int, "id_client" int, "id_commerce" int, "id_product" int, "id_type_request" int, "id_request_origin" int, "id_valid_request" int, "rc_comp_dep" int, "rc_ref_bank" int, CONSTRAINT "PK_bdbd90f697fa3fc67ed2207f66c" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "REL_680b2a0d78e2edb2fd85052e89" ON "fm_request" ("id_quotas_calculat") WHERE "id_quotas_calculat" IS NOT NULL`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "REL_82416fb6e19b7157d05f08584f" ON "fm_request" ("id_valid_request") WHERE "id_valid_request" IS NOT NULL`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_roles" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_14894554fc7a0216fe7d3bac62c" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_aad4135a4b113abe218828517a0" DEFAULT getdate(), CONSTRAINT "PK_b0f909dbec9a1d1a8a9b8e10ede" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_company" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_91476e2adc6b8588bc94fecab2e" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_2c4492fe892c73fcd2dcac60c5f" DEFAULT getdate(), "id_commerce" int, CONSTRAINT "PK_fdfa792f651a4844d89c9f9b8ab" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_worker" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "last_name" nvarchar(255) NOT NULL, "password" nvarchar(255) NOT NULL, "ident_num" nvarchar(255) NOT NULL, "email" nvarchar(255) NOT NULL, "block" int NOT NULL CONSTRAINT "DF_fb255af61f5baf90d546e06ad15" DEFAULT 0, "phone" nvarchar(255) NOT NULL, "id_ident_type" int, "id_company" int, "id_department" int, CONSTRAINT "UQ_35eb1f25e7bf89140a2c986b07e" UNIQUE ("email"), CONSTRAINT "PK_bfdfa405d4a55894c0f9f30be3e" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_7a21b1b04b3df8909ad71d8909" ON "fm_worker" ("id_ident_type", "ident_num") `
		);
		await queryRunner.query(
			`CREATE TABLE "fm_ident_type" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_7e2dc1f48265fd4426912f8000d" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_14373de418416ad7bb9f8311784" DEFAULT getdate(), CONSTRAINT "PK_fd14a58b675357f23b15e168ae6" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_phone" ("id" int NOT NULL IDENTITY(1,1), "phone" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_94056d5651696d22a31a4aa6711" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_33339efd6ff91e08418534fc401" DEFAULT getdate(), "id_client" int, CONSTRAINT "PK_daa6754aa4e550e51a993683557" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_client" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "last_name" nvarchar(255) NOT NULL, "id_roles" int NOT NULL CONSTRAINT "DF_e96551b15403a944c714d6bc07f" DEFAULT 1, "password" nvarchar(255) NOT NULL, "id_ident_type" int, "ident_num" nvarchar(255) NOT NULL, "email" nvarchar(255) NOT NULL, "rc_ident_card" int, "ref_person_1" nvarchar(255) NOT NULL, "ref_person_2" nvarchar(255) NOT NULL, "id_location" int, CONSTRAINT "UQ_2b426d3e17a73aa07179aeb223d" UNIQUE ("email"), CONSTRAINT "PK_36e96bfb34ce29232f54023c5b7" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_15f756dc2a9a6aefe1751f731f" ON "fm_client" ("id_ident_type", "ident_num") `
		);
		await queryRunner.query(
			`CREATE TABLE "fm_bank_commerce" ("id" int NOT NULL IDENTITY(1,1), "bank_account_num" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_fd61ce35c4d90076d7d0e6c519c" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_d650ce858cabf47ec060d6dc110" DEFAULT getdate(), "id_commerce" int, "id_client" int, "id_bank" int, CONSTRAINT "PK_f66d33a4c718ef7085f5ab86843" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_bank" ("id" int NOT NULL IDENTITY(1,1), "code" nvarchar(255) NOT NULL, "name" nvarchar(255) NOT NULL, "alias" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_edfee9c4a132e504fbe2d51efbd" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_ced54593549010a9782a6fe7eca" DEFAULT getdate(), CONSTRAINT "PK_2d7545b5741867abd3626fdd215" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_type_person" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, CONSTRAINT "PK_aa6fdbd793e67ed3ab89aa1a002" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_afiliados" ("id" int NOT NULL IDENTITY(1,1), "bank_account_number" nvarchar(255) NOT NULL, "name" nvarchar(255) NOT NULL, "id_type_person" int, "id_bank" int, CONSTRAINT "PK_55acf88ee90f3000ae4f6548978" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_activity" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_f0f2d182af4656a5ab349056461" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_7f721b3c3629fdf2e8b4c43157f" DEFAULT getdate(), "id_afiliado" int, CONSTRAINT "PK_0388a73e1372de300962e6be970" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_commerce" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "ident_num" nvarchar(255) NOT NULL, "special_contributor" int NOT NULL CONSTRAINT "DF_570da368aef9c63671ce1f44e7c" DEFAULT 1, "rc_special_contributor" int, "rc_rif" int, "days" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_7c64c2fcc27eed02cf143287988" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_be25f9975b9c77baffb5ba88b7d" DEFAULT getdate(), "id_ident_type" int, "id_activity" int, "id_location" int, "id_client" int, CONSTRAINT "PK_a2d9f3677becc5e674531be2f03" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_aci_commerce" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_3295e30bfff0befa68b01840924" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_f0cd0ab16bdf15f24b21e22a4d9" DEFAULT getdate(), "id_commerce" int, "id_worker" int, CONSTRAINT "PK_bf1f8c839373d4e9a45daff974a" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "REL_30c2d9c55728a95e712e837362" ON "fm_aci_commerce" ("id_commerce") WHERE "id_commerce" IS NOT NULL`
		);
		await queryRunner.query(
			`CREATE TABLE "fm_product_photos_fm_photo" ("fmProductId" int NOT NULL, "fmPhotoId" int NOT NULL, CONSTRAINT "PK_96e83ac023b9c5c08917b64569b" PRIMARY KEY ("fmProductId", "fmPhotoId"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_aead3451c666d14e82ccc3c48b" ON "fm_product_photos_fm_photo" ("fmProductId") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_5c7a49c7769727f2a7161c16ee" ON "fm_product_photos_fm_photo" ("fmPhotoId") `
		);
		await queryRunner.query(
			`CREATE TABLE "fm_roles_workers_fm_worker" ("fmRolesId" int NOT NULL, "fmWorkerId" int NOT NULL, CONSTRAINT "PK_6e6a3361780a9a845bf1d7cb78a" PRIMARY KEY ("fmRolesId", "fmWorkerId"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_eb99d93c3e30ae5516245708e2" ON "fm_roles_workers_fm_worker" ("fmRolesId") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_f6a7ef607a6be2a971a0c4c8b5" ON "fm_roles_workers_fm_worker" ("fmWorkerId") `
		);
		await queryRunner.query(
			`CREATE TABLE "fm_roles_clients_fm_client" ("fmRolesId" int NOT NULL, "fmClientId" int NOT NULL, CONSTRAINT "PK_0bf386e3b7fd618facbff34cfa9" PRIMARY KEY ("fmRolesId", "fmClientId"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_369e53e8a74897ea77081baf5e" ON "fm_roles_clients_fm_client" ("fmRolesId") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_ea2b0b86e2f06e1b0d251b5d51" ON "fm_roles_clients_fm_client" ("fmClientId") `
		);
		await queryRunner.query(
			`CREATE TABLE "fm_worker_roles_fm_roles" ("fmWorkerId" int NOT NULL, "fmRolesId" int NOT NULL, CONSTRAINT "PK_61253a3374230eea449c4961e7b" PRIMARY KEY ("fmWorkerId", "fmRolesId"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_4bed12461b5ec1b54453861715" ON "fm_worker_roles_fm_roles" ("fmWorkerId") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_309b6bc22137cc95e2efd3f16f" ON "fm_worker_roles_fm_roles" ("fmRolesId") `
		);
		await queryRunner.query(
			`CREATE TABLE "fm_client_id_roles_fm_roles" ("fmClientId" int NOT NULL, "fmRolesId" int NOT NULL, CONSTRAINT "PK_433f7ee2c431efd9c9ed49004ef" PRIMARY KEY ("fmClientId", "fmRolesId"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_867101050576ea82b6410de17e" ON "fm_client_id_roles_fm_roles" ("fmClientId") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_5a9520d79b89237a7fbe8e5762" ON "fm_client_id_roles_fm_roles" ("fmRolesId") `
		);
		await queryRunner.query(
			`CREATE TABLE "fm_client_photos_fm_photo" ("fmClientId" int NOT NULL, "fmPhotoId" int NOT NULL, CONSTRAINT "PK_421451c3eab8a924eed3c54f67c" PRIMARY KEY ("fmClientId", "fmPhotoId"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_f6c435979c0cb0f36c0694741b" ON "fm_client_photos_fm_photo" ("fmClientId") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_9d63958d62d8e50a075685c741" ON "fm_client_photos_fm_photo" ("fmPhotoId") `
		);
		await queryRunner.query(
			`ALTER TABLE "fm_commerce_constitutive_act" ADD CONSTRAINT "FK_6331f365268dbf2df9ff0f9991e" FOREIGN KEY ("id_commerce") REFERENCES "fm_commerce"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_commerce_constitutive_act" ADD CONSTRAINT "FK_44c80483329d8b67210918e9aa3" FOREIGN KEY ("id_photo") REFERENCES "fm_photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_photo" ADD CONSTRAINT "FK_f2bbbe05ebffdcb768131a549ce" FOREIGN KEY ("rcConstitutiveActId") REFERENCES "fm_commerce_constitutive_act"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_ciudad" ADD CONSTRAINT "FK_41e29c427582948e763288142c1" FOREIGN KEY ("id_estado") REFERENCES "fm_estado"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_parroquia" ADD CONSTRAINT "FK_4ac1c804b1f8dcfc3b08363151f" FOREIGN KEY ("id_municipio") REFERENCES "fm_municipio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_municipio" ADD CONSTRAINT "FK_9210306e682154252390bb45859" FOREIGN KEY ("id_estado") REFERENCES "fm_estado"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_location" ADD CONSTRAINT "FK_61ea978348ae6a36894bd39de24" FOREIGN KEY ("id_estado") REFERENCES "fm_estado"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_location" ADD CONSTRAINT "FK_1c57c6523dd537b0ef0a9f5b419" FOREIGN KEY ("id_municipio") REFERENCES "fm_municipio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_location" ADD CONSTRAINT "FK_3e940da713ea86a9367f70618d0" FOREIGN KEY ("id_ciudad") REFERENCES "fm_ciudad"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_location" ADD CONSTRAINT "FK_73174abf588e8edc848e2e3a121" FOREIGN KEY ("id_parroquia") REFERENCES "fm_parroquia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_dir_pos" ADD CONSTRAINT "FK_7a14b7e77f8a819735106b016e5" FOREIGN KEY ("id_location") REFERENCES "fm_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_dir_pos" ADD CONSTRAINT "FK_7ef2c34882b3fb18bc366679aa6" FOREIGN KEY ("id_commerce") REFERENCES "fm_commerce"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_dir_pos" ADD CONSTRAINT "FK_9af2a5b750e303f6a4e5870a443" FOREIGN KEY ("id_request") REFERENCES "fm_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_dir_pos" ADD CONSTRAINT "FK_f4754d81e43ea2411cf4a519bc0" FOREIGN KEY ("id_product") REFERENCES "fm_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_status" ADD CONSTRAINT "FK_fba8ef1cff94c2c7b202d6deb0d" FOREIGN KEY ("id_request") REFERENCES "fm_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_status" ADD CONSTRAINT "FK_65c1dc9c7cb36fda1f2cbf41d71" FOREIGN KEY ("id_department") REFERENCES "fm_department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_status" ADD CONSTRAINT "FK_c8e50e7831f97bb4247b9edd91a" FOREIGN KEY ("id_status_request") REFERENCES "fm_status_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_payment_book" ADD CONSTRAINT "FK_a6616065a97d1234c8cebb2842b" FOREIGN KEY ("id_quotas_calculated") REFERENCES "fm_quotas_calculated"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_quotas_calculated" ADD CONSTRAINT "FK_0673175b200532308fc36fd3185" FOREIGN KEY ("id_type_payment") REFERENCES "fm_type_payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_quotas_calculated" ADD CONSTRAINT "FK_47c08889ebe40f2671a747e6149" FOREIGN KEY ("id_request") REFERENCES "fm_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_request" ADD CONSTRAINT "FK_680b2a0d78e2edb2fd85052e89a" FOREIGN KEY ("id_quotas_calculat") REFERENCES "fm_quotas_calculated"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_request" ADD CONSTRAINT "FK_7af3f0d3b144b7d6a72ceac4073" FOREIGN KEY ("id_payment_method") REFERENCES "fm_payment_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_request" ADD CONSTRAINT "FK_e58a708881405ef2655aef9fd81" FOREIGN KEY ("id_type_payment") REFERENCES "fm_type_payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_request" ADD CONSTRAINT "FK_bd495da93173bc09fe6d62b98b5" FOREIGN KEY ("id_client") REFERENCES "fm_client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_request" ADD CONSTRAINT "FK_96c58e4419abc60056da31ef769" FOREIGN KEY ("id_commerce") REFERENCES "fm_commerce"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_request" ADD CONSTRAINT "FK_88cdbf21a125980f977d82c27b1" FOREIGN KEY ("id_product") REFERENCES "fm_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_request" ADD CONSTRAINT "FK_8e6a76c31cf8fb8ef74f4823e10" FOREIGN KEY ("id_type_request") REFERENCES "fm_type_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_request" ADD CONSTRAINT "FK_f2cb8353f19c168725999701d7d" FOREIGN KEY ("id_request_origin") REFERENCES "fm_request_origin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_request" ADD CONSTRAINT "FK_82416fb6e19b7157d05f08584fe" FOREIGN KEY ("id_valid_request") REFERENCES "fm_valid_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_request" ADD CONSTRAINT "FK_c4efb1cf02f43090740926bb1fc" FOREIGN KEY ("rc_comp_dep") REFERENCES "fm_photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_request" ADD CONSTRAINT "FK_4f207c9a0e9645910383377f86d" FOREIGN KEY ("rc_ref_bank") REFERENCES "fm_photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_company" ADD CONSTRAINT "FK_dbee0c02784ebe3f0c0330014b4" FOREIGN KEY ("id_commerce") REFERENCES "fm_worker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_worker" ADD CONSTRAINT "FK_e018746d22c55fc0477298963ad" FOREIGN KEY ("id_ident_type") REFERENCES "fm_ident_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_worker" ADD CONSTRAINT "FK_93ed0b26dab2997d685e1ea0e56" FOREIGN KEY ("id_company") REFERENCES "fm_company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_worker" ADD CONSTRAINT "FK_b7651b1e49eddd73c4d3a78c0a3" FOREIGN KEY ("id_department") REFERENCES "fm_department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_phone" ADD CONSTRAINT "FK_3796c0f20cddbfce6840776200f" FOREIGN KEY ("id_client") REFERENCES "fm_client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_client" ADD CONSTRAINT "FK_a4d752b12018c7ffc6a64a65307" FOREIGN KEY ("id_ident_type") REFERENCES "fm_ident_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_client" ADD CONSTRAINT "FK_d71b075dc26d880338a4140df10" FOREIGN KEY ("rc_ident_card") REFERENCES "fm_photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_client" ADD CONSTRAINT "FK_2429112946d86e74cfedf59fc6c" FOREIGN KEY ("id_location") REFERENCES "fm_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_bank_commerce" ADD CONSTRAINT "FK_f6a998bb3ed4eb4c244b9baa7f3" FOREIGN KEY ("id_commerce") REFERENCES "fm_commerce"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_bank_commerce" ADD CONSTRAINT "FK_1f3e4561151d389d052b818d1ac" FOREIGN KEY ("id_client") REFERENCES "fm_client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_bank_commerce" ADD CONSTRAINT "FK_ac51278339d6ed7a4bcbb5bda7f" FOREIGN KEY ("id_bank") REFERENCES "fm_bank"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_afiliados" ADD CONSTRAINT "FK_d82f3abdbeb01e63fce48ca1953" FOREIGN KEY ("id_type_person") REFERENCES "fm_type_person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_afiliados" ADD CONSTRAINT "FK_9d80d093a993a82cb4e7a1456ef" FOREIGN KEY ("id_bank") REFERENCES "fm_bank"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_activity" ADD CONSTRAINT "FK_7c7fad9604e8f103f82b763a11d" FOREIGN KEY ("id_afiliado") REFERENCES "fm_afiliados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_commerce" ADD CONSTRAINT "FK_363178079b89e15b47a66e5dbd0" FOREIGN KEY ("id_ident_type") REFERENCES "fm_ident_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_commerce" ADD CONSTRAINT "FK_9d10e9066e2a479adcf4830e65b" FOREIGN KEY ("id_activity") REFERENCES "fm_activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_commerce" ADD CONSTRAINT "FK_e74342f2c030e08992c56df0af9" FOREIGN KEY ("id_location") REFERENCES "fm_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_commerce" ADD CONSTRAINT "FK_ae4a2f524f6c29e5d38f265f7ac" FOREIGN KEY ("id_client") REFERENCES "fm_client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_commerce" ADD CONSTRAINT "FK_fda6f61fd547b39dd9a0f763a72" FOREIGN KEY ("rc_special_contributor") REFERENCES "fm_photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_commerce" ADD CONSTRAINT "FK_b3206a85c5fc305b43202938a17" FOREIGN KEY ("rc_rif") REFERENCES "fm_photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_aci_commerce" ADD CONSTRAINT "FK_30c2d9c55728a95e712e8373627" FOREIGN KEY ("id_commerce") REFERENCES "fm_commerce"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_aci_commerce" ADD CONSTRAINT "FK_fe4db5ac79802a647e0c50e7487" FOREIGN KEY ("id_worker") REFERENCES "fm_worker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_product_photos_fm_photo" ADD CONSTRAINT "FK_aead3451c666d14e82ccc3c48bc" FOREIGN KEY ("fmProductId") REFERENCES "fm_product"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_product_photos_fm_photo" ADD CONSTRAINT "FK_5c7a49c7769727f2a7161c16ee0" FOREIGN KEY ("fmPhotoId") REFERENCES "fm_photo"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_roles_workers_fm_worker" ADD CONSTRAINT "FK_eb99d93c3e30ae5516245708e2e" FOREIGN KEY ("fmRolesId") REFERENCES "fm_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_roles_workers_fm_worker" ADD CONSTRAINT "FK_f6a7ef607a6be2a971a0c4c8b5f" FOREIGN KEY ("fmWorkerId") REFERENCES "fm_worker"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_roles_clients_fm_client" ADD CONSTRAINT "FK_369e53e8a74897ea77081baf5e3" FOREIGN KEY ("fmRolesId") REFERENCES "fm_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_roles_clients_fm_client" ADD CONSTRAINT "FK_ea2b0b86e2f06e1b0d251b5d51a" FOREIGN KEY ("fmClientId") REFERENCES "fm_client"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_worker_roles_fm_roles" ADD CONSTRAINT "FK_4bed12461b5ec1b54453861715e" FOREIGN KEY ("fmWorkerId") REFERENCES "fm_worker"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_worker_roles_fm_roles" ADD CONSTRAINT "FK_309b6bc22137cc95e2efd3f16f0" FOREIGN KEY ("fmRolesId") REFERENCES "fm_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_client_id_roles_fm_roles" ADD CONSTRAINT "FK_867101050576ea82b6410de17ed" FOREIGN KEY ("fmClientId") REFERENCES "fm_client"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_client_id_roles_fm_roles" ADD CONSTRAINT "FK_5a9520d79b89237a7fbe8e5762e" FOREIGN KEY ("fmRolesId") REFERENCES "fm_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_client_photos_fm_photo" ADD CONSTRAINT "FK_f6c435979c0cb0f36c0694741b4" FOREIGN KEY ("fmClientId") REFERENCES "fm_client"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_client_photos_fm_photo" ADD CONSTRAINT "FK_9d63958d62d8e50a075685c7413" FOREIGN KEY ("fmPhotoId") REFERENCES "fm_photo"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "fm_client_photos_fm_photo" DROP CONSTRAINT "FK_9d63958d62d8e50a075685c7413"`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_client_photos_fm_photo" DROP CONSTRAINT "FK_f6c435979c0cb0f36c0694741b4"`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_client_id_roles_fm_roles" DROP CONSTRAINT "FK_5a9520d79b89237a7fbe8e5762e"`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_client_id_roles_fm_roles" DROP CONSTRAINT "FK_867101050576ea82b6410de17ed"`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_worker_roles_fm_roles" DROP CONSTRAINT "FK_309b6bc22137cc95e2efd3f16f0"`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_worker_roles_fm_roles" DROP CONSTRAINT "FK_4bed12461b5ec1b54453861715e"`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_roles_clients_fm_client" DROP CONSTRAINT "FK_ea2b0b86e2f06e1b0d251b5d51a"`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_roles_clients_fm_client" DROP CONSTRAINT "FK_369e53e8a74897ea77081baf5e3"`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_roles_workers_fm_worker" DROP CONSTRAINT "FK_f6a7ef607a6be2a971a0c4c8b5f"`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_roles_workers_fm_worker" DROP CONSTRAINT "FK_eb99d93c3e30ae5516245708e2e"`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_product_photos_fm_photo" DROP CONSTRAINT "FK_5c7a49c7769727f2a7161c16ee0"`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_product_photos_fm_photo" DROP CONSTRAINT "FK_aead3451c666d14e82ccc3c48bc"`
		);
		await queryRunner.query(`ALTER TABLE "fm_aci_commerce" DROP CONSTRAINT "FK_fe4db5ac79802a647e0c50e7487"`);
		await queryRunner.query(`ALTER TABLE "fm_aci_commerce" DROP CONSTRAINT "FK_30c2d9c55728a95e712e8373627"`);
		await queryRunner.query(`ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_b3206a85c5fc305b43202938a17"`);
		await queryRunner.query(`ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_fda6f61fd547b39dd9a0f763a72"`);
		await queryRunner.query(`ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_ae4a2f524f6c29e5d38f265f7ac"`);
		await queryRunner.query(`ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_e74342f2c030e08992c56df0af9"`);
		await queryRunner.query(`ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_9d10e9066e2a479adcf4830e65b"`);
		await queryRunner.query(`ALTER TABLE "fm_commerce" DROP CONSTRAINT "FK_363178079b89e15b47a66e5dbd0"`);
		await queryRunner.query(`ALTER TABLE "fm_activity" DROP CONSTRAINT "FK_7c7fad9604e8f103f82b763a11d"`);
		await queryRunner.query(`ALTER TABLE "fm_afiliados" DROP CONSTRAINT "FK_9d80d093a993a82cb4e7a1456ef"`);
		await queryRunner.query(`ALTER TABLE "fm_afiliados" DROP CONSTRAINT "FK_d82f3abdbeb01e63fce48ca1953"`);
		await queryRunner.query(`ALTER TABLE "fm_bank_commerce" DROP CONSTRAINT "FK_ac51278339d6ed7a4bcbb5bda7f"`);
		await queryRunner.query(`ALTER TABLE "fm_bank_commerce" DROP CONSTRAINT "FK_1f3e4561151d389d052b818d1ac"`);
		await queryRunner.query(`ALTER TABLE "fm_bank_commerce" DROP CONSTRAINT "FK_f6a998bb3ed4eb4c244b9baa7f3"`);
		await queryRunner.query(`ALTER TABLE "fm_client" DROP CONSTRAINT "FK_2429112946d86e74cfedf59fc6c"`);
		await queryRunner.query(`ALTER TABLE "fm_client" DROP CONSTRAINT "FK_d71b075dc26d880338a4140df10"`);
		await queryRunner.query(`ALTER TABLE "fm_client" DROP CONSTRAINT "FK_a4d752b12018c7ffc6a64a65307"`);
		await queryRunner.query(`ALTER TABLE "fm_phone" DROP CONSTRAINT "FK_3796c0f20cddbfce6840776200f"`);
		await queryRunner.query(`ALTER TABLE "fm_worker" DROP CONSTRAINT "FK_b7651b1e49eddd73c4d3a78c0a3"`);
		await queryRunner.query(`ALTER TABLE "fm_worker" DROP CONSTRAINT "FK_93ed0b26dab2997d685e1ea0e56"`);
		await queryRunner.query(`ALTER TABLE "fm_worker" DROP CONSTRAINT "FK_e018746d22c55fc0477298963ad"`);
		await queryRunner.query(`ALTER TABLE "fm_company" DROP CONSTRAINT "FK_dbee0c02784ebe3f0c0330014b4"`);
		await queryRunner.query(`ALTER TABLE "fm_request" DROP CONSTRAINT "FK_4f207c9a0e9645910383377f86d"`);
		await queryRunner.query(`ALTER TABLE "fm_request" DROP CONSTRAINT "FK_c4efb1cf02f43090740926bb1fc"`);
		await queryRunner.query(`ALTER TABLE "fm_request" DROP CONSTRAINT "FK_82416fb6e19b7157d05f08584fe"`);
		await queryRunner.query(`ALTER TABLE "fm_request" DROP CONSTRAINT "FK_f2cb8353f19c168725999701d7d"`);
		await queryRunner.query(`ALTER TABLE "fm_request" DROP CONSTRAINT "FK_8e6a76c31cf8fb8ef74f4823e10"`);
		await queryRunner.query(`ALTER TABLE "fm_request" DROP CONSTRAINT "FK_88cdbf21a125980f977d82c27b1"`);
		await queryRunner.query(`ALTER TABLE "fm_request" DROP CONSTRAINT "FK_96c58e4419abc60056da31ef769"`);
		await queryRunner.query(`ALTER TABLE "fm_request" DROP CONSTRAINT "FK_bd495da93173bc09fe6d62b98b5"`);
		await queryRunner.query(`ALTER TABLE "fm_request" DROP CONSTRAINT "FK_e58a708881405ef2655aef9fd81"`);
		await queryRunner.query(`ALTER TABLE "fm_request" DROP CONSTRAINT "FK_7af3f0d3b144b7d6a72ceac4073"`);
		await queryRunner.query(`ALTER TABLE "fm_request" DROP CONSTRAINT "FK_680b2a0d78e2edb2fd85052e89a"`);
		await queryRunner.query(`ALTER TABLE "fm_quotas_calculated" DROP CONSTRAINT "FK_47c08889ebe40f2671a747e6149"`);
		await queryRunner.query(`ALTER TABLE "fm_quotas_calculated" DROP CONSTRAINT "FK_0673175b200532308fc36fd3185"`);
		await queryRunner.query(`ALTER TABLE "fm_payment_book" DROP CONSTRAINT "FK_a6616065a97d1234c8cebb2842b"`);
		await queryRunner.query(`ALTER TABLE "fm_status" DROP CONSTRAINT "FK_c8e50e7831f97bb4247b9edd91a"`);
		await queryRunner.query(`ALTER TABLE "fm_status" DROP CONSTRAINT "FK_65c1dc9c7cb36fda1f2cbf41d71"`);
		await queryRunner.query(`ALTER TABLE "fm_status" DROP CONSTRAINT "FK_fba8ef1cff94c2c7b202d6deb0d"`);
		await queryRunner.query(`ALTER TABLE "fm_dir_pos" DROP CONSTRAINT "FK_f4754d81e43ea2411cf4a519bc0"`);
		await queryRunner.query(`ALTER TABLE "fm_dir_pos" DROP CONSTRAINT "FK_9af2a5b750e303f6a4e5870a443"`);
		await queryRunner.query(`ALTER TABLE "fm_dir_pos" DROP CONSTRAINT "FK_7ef2c34882b3fb18bc366679aa6"`);
		await queryRunner.query(`ALTER TABLE "fm_dir_pos" DROP CONSTRAINT "FK_7a14b7e77f8a819735106b016e5"`);
		await queryRunner.query(`ALTER TABLE "fm_location" DROP CONSTRAINT "FK_73174abf588e8edc848e2e3a121"`);
		await queryRunner.query(`ALTER TABLE "fm_location" DROP CONSTRAINT "FK_3e940da713ea86a9367f70618d0"`);
		await queryRunner.query(`ALTER TABLE "fm_location" DROP CONSTRAINT "FK_1c57c6523dd537b0ef0a9f5b419"`);
		await queryRunner.query(`ALTER TABLE "fm_location" DROP CONSTRAINT "FK_61ea978348ae6a36894bd39de24"`);
		await queryRunner.query(`ALTER TABLE "fm_municipio" DROP CONSTRAINT "FK_9210306e682154252390bb45859"`);
		await queryRunner.query(`ALTER TABLE "fm_parroquia" DROP CONSTRAINT "FK_4ac1c804b1f8dcfc3b08363151f"`);
		await queryRunner.query(`ALTER TABLE "fm_ciudad" DROP CONSTRAINT "FK_41e29c427582948e763288142c1"`);
		await queryRunner.query(`ALTER TABLE "fm_photo" DROP CONSTRAINT "FK_f2bbbe05ebffdcb768131a549ce"`);
		await queryRunner.query(
			`ALTER TABLE "fm_commerce_constitutive_act" DROP CONSTRAINT "FK_44c80483329d8b67210918e9aa3"`
		);
		await queryRunner.query(
			`ALTER TABLE "fm_commerce_constitutive_act" DROP CONSTRAINT "FK_6331f365268dbf2df9ff0f9991e"`
		);
		await queryRunner.query(`DROP INDEX "IDX_9d63958d62d8e50a075685c741" ON "fm_client_photos_fm_photo"`);
		await queryRunner.query(`DROP INDEX "IDX_f6c435979c0cb0f36c0694741b" ON "fm_client_photos_fm_photo"`);
		await queryRunner.query(`DROP TABLE "fm_client_photos_fm_photo"`);
		await queryRunner.query(`DROP INDEX "IDX_5a9520d79b89237a7fbe8e5762" ON "fm_client_id_roles_fm_roles"`);
		await queryRunner.query(`DROP INDEX "IDX_867101050576ea82b6410de17e" ON "fm_client_id_roles_fm_roles"`);
		await queryRunner.query(`DROP TABLE "fm_client_id_roles_fm_roles"`);
		await queryRunner.query(`DROP INDEX "IDX_309b6bc22137cc95e2efd3f16f" ON "fm_worker_roles_fm_roles"`);
		await queryRunner.query(`DROP INDEX "IDX_4bed12461b5ec1b54453861715" ON "fm_worker_roles_fm_roles"`);
		await queryRunner.query(`DROP TABLE "fm_worker_roles_fm_roles"`);
		await queryRunner.query(`DROP INDEX "IDX_ea2b0b86e2f06e1b0d251b5d51" ON "fm_roles_clients_fm_client"`);
		await queryRunner.query(`DROP INDEX "IDX_369e53e8a74897ea77081baf5e" ON "fm_roles_clients_fm_client"`);
		await queryRunner.query(`DROP TABLE "fm_roles_clients_fm_client"`);
		await queryRunner.query(`DROP INDEX "IDX_f6a7ef607a6be2a971a0c4c8b5" ON "fm_roles_workers_fm_worker"`);
		await queryRunner.query(`DROP INDEX "IDX_eb99d93c3e30ae5516245708e2" ON "fm_roles_workers_fm_worker"`);
		await queryRunner.query(`DROP TABLE "fm_roles_workers_fm_worker"`);
		await queryRunner.query(`DROP INDEX "IDX_5c7a49c7769727f2a7161c16ee" ON "fm_product_photos_fm_photo"`);
		await queryRunner.query(`DROP INDEX "IDX_aead3451c666d14e82ccc3c48b" ON "fm_product_photos_fm_photo"`);
		await queryRunner.query(`DROP TABLE "fm_product_photos_fm_photo"`);
		await queryRunner.query(`DROP INDEX "REL_30c2d9c55728a95e712e837362" ON "fm_aci_commerce"`);
		await queryRunner.query(`DROP TABLE "fm_aci_commerce"`);
		await queryRunner.query(`DROP TABLE "fm_commerce"`);
		await queryRunner.query(`DROP TABLE "fm_activity"`);
		await queryRunner.query(`DROP TABLE "fm_afiliados"`);
		await queryRunner.query(`DROP TABLE "fm_type_person"`);
		await queryRunner.query(`DROP TABLE "fm_bank"`);
		await queryRunner.query(`DROP TABLE "fm_bank_commerce"`);
		await queryRunner.query(`DROP INDEX "IDX_15f756dc2a9a6aefe1751f731f" ON "fm_client"`);
		await queryRunner.query(`DROP TABLE "fm_client"`);
		await queryRunner.query(`DROP TABLE "fm_phone"`);
		await queryRunner.query(`DROP TABLE "fm_ident_type"`);
		await queryRunner.query(`DROP INDEX "IDX_7a21b1b04b3df8909ad71d8909" ON "fm_worker"`);
		await queryRunner.query(`DROP TABLE "fm_worker"`);
		await queryRunner.query(`DROP TABLE "fm_company"`);
		await queryRunner.query(`DROP TABLE "fm_roles"`);
		await queryRunner.query(`DROP INDEX "REL_82416fb6e19b7157d05f08584f" ON "fm_request"`);
		await queryRunner.query(`DROP INDEX "REL_680b2a0d78e2edb2fd85052e89" ON "fm_request"`);
		await queryRunner.query(`DROP TABLE "fm_request"`);
		await queryRunner.query(`DROP TABLE "fm_valid_request"`);
		await queryRunner.query(`DROP TABLE "fm_type_payment"`);
		await queryRunner.query(`DROP INDEX "REL_47c08889ebe40f2671a747e614" ON "fm_quotas_calculated"`);
		await queryRunner.query(`DROP TABLE "fm_quotas_calculated"`);
		await queryRunner.query(`DROP TABLE "fm_payment_book"`);
		await queryRunner.query(`DROP TABLE "fm_status"`);
		await queryRunner.query(`DROP TABLE "fm_department"`);
		await queryRunner.query(`DROP TABLE "fm_status_request"`);
		await queryRunner.query(`DROP TABLE "fm_request_origin"`);
		await queryRunner.query(`DROP TABLE "fm_payment_method"`);
		await queryRunner.query(`DROP TABLE "fm_dir_pos"`);
		await queryRunner.query(`DROP TABLE "fm_product"`);
		await queryRunner.query(`DROP TABLE "fm_location"`);
		await queryRunner.query(`DROP TABLE "fm_estado"`);
		await queryRunner.query(`DROP TABLE "fm_municipio"`);
		await queryRunner.query(`DROP TABLE "fm_parroquia"`);
		await queryRunner.query(`DROP TABLE "fm_ciudad"`);
		await queryRunner.query(`DROP INDEX "REL_f2bbbe05ebffdcb768131a549c" ON "fm_photo"`);
		await queryRunner.query(`DROP TABLE "fm_photo"`);
		await queryRunner.query(`DROP TABLE "fm_commerce_constitutive_act"`);
		await queryRunner.query(`DROP TABLE "fm_type_request"`);
	}
}