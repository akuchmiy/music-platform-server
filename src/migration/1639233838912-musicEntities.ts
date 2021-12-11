import {MigrationInterface, QueryRunner} from "typeorm";

export class musicEntities1639233838912 implements MigrationInterface {
    name = 'musicEntities1639233838912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "band" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, CONSTRAINT "UQ_5971cd5a77552fe07e869b36cd4" UNIQUE ("name"), CONSTRAINT "PK_e808d7dacf72163737ce93d7b23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "bandId" uuid, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL DEFAULT '0', "text" character varying NOT NULL, "listens" integer NOT NULL, "uploaderId" uuid, "bandId" uuid, "albumId" uuid, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "likes" integer NOT NULL DEFAULT '0', "dislikes" integer NOT NULL DEFAULT '0', "userId" uuid, "trackId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_94f168faad896c0786646fa3d4a"`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "UQ_94f168faad896c0786646fa3d4a" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_253b81334a5f42827a07a6af8d5" FOREIGN KEY ("bandId") REFERENCES "band"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_f2d52e431ade00477512f633f27" FOREIGN KEY ("uploaderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_2ceecca65935d976384d499853d" FOREIGN KEY ("bandId") REFERENCES "band"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_199dfc5d0837739bd0a190062c1" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_94f168faad896c0786646fa3d4a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_94f168faad896c0786646fa3d4a"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_199dfc5d0837739bd0a190062c1"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_2ceecca65935d976384d499853d"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_f2d52e431ade00477512f633f27"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_253b81334a5f42827a07a6af8d5"`);
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "UQ_94f168faad896c0786646fa3d4a"`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_94f168faad896c0786646fa3d4a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "track"`);
        await queryRunner.query(`DROP TABLE "album"`);
        await queryRunner.query(`DROP TABLE "band"`);
    }

}
