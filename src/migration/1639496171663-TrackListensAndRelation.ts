import {MigrationInterface, QueryRunner} from "typeorm";

export class TrackListensAndRelation1639496171663 implements MigrationInterface {
    name = 'TrackListensAndRelation1639496171663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_2ceecca65935d976384d499853d"`);
        await queryRunner.query(`ALTER TABLE "track" DROP COLUMN "bandId"`);
        await queryRunner.query(`ALTER TABLE "track" ALTER COLUMN "listens" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "track" ALTER COLUMN "listens" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "track" ADD "bandId" uuid`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_2ceecca65935d976384d499853d" FOREIGN KEY ("bandId") REFERENCES "band"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
