import {MigrationInterface, QueryRunner} from "typeorm";

export class bandChange1639238916307 implements MigrationInterface {
    name = 'bandChange1639238916307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_f2d52e431ade00477512f633f27"`);
        await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "uploaderId"`);
        await queryRunner.query(`ALTER TABLE "band" ADD "description" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "band" ADD "creatorId" uuid`);
        await queryRunner.query(`ALTER TABLE "band" ADD CONSTRAINT "FK_bb4d7fff94804e59ab864ca54e6" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "band" DROP CONSTRAINT "FK_bb4d7fff94804e59ab864ca54e6"`);
        await queryRunner.query(`ALTER TABLE "band" DROP COLUMN "creatorId"`);
        await queryRunner.query(`ALTER TABLE "band" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "track" ADD "uploaderId" uuid`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_f2d52e431ade00477512f633f27" FOREIGN KEY ("uploaderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
