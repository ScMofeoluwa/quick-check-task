import { MigrationInterface, QueryRunner } from "typeorm";

export class createItems1663807949937 implements MigrationInterface {
  name = "createItems1663807949937";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hackerId" integer, "title" character varying, "byHackerNews" boolean NOT NULL DEFAULT true, "text" character varying, "url" character varying, "type" "public"."items_type_enum" NOT NULL, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "items"`);
  }
}
