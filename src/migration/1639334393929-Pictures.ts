import {MigrationInterface, QueryRunner} from "typeorm";

export class Pictures1639334393929 implements MigrationInterface {
    name = 'Pictures1639334393929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "band" ADD "picture" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "track" ADD "picture" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "track" ADD "audio" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "album" ADD "picture" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" DROP COLUMN "picture"`);
        await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "audio"`);
        await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "picture"`);
        await queryRunner.query(`ALTER TABLE "band" DROP COLUMN "picture"`);
        await queryRunner.query(`ALTER TABLE "track" ADD "duration" integer NOT NULL DEFAULT '0'`);
    }

}
