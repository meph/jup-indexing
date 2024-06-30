module.exports = class Data1719742225023 {
    name = 'Data1719742225023'

    async up(db) {
        await db.query(`CREATE TABLE "jup_signatures" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "bucket" integer NOT NULL, "processed" boolean NOT NULL DEFAULT false, "is_trade_extracted" boolean, "error_message" text, CONSTRAINT "PK_d8405dd5a5e381cc7deebdb6252" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "idx_bucket_processed_timestamp" ON "jup_signatures" ("bucket", "processed", "timestamp") `)
        await db.query(`CREATE INDEX "idx_processed_timestamp" ON "jup_signatures" ("processed", "timestamp") `)
        await db.query(`CREATE INDEX "idx_timestamp" ON "jup_signatures" ("timestamp") `)
        await db.query(`CREATE TABLE "sol_trades" ("id" character varying NOT NULL, "bucket" integer NOT NULL, "trader" character varying(50), "mint" character varying(50), "timestamp" TIMESTAMP WITH TIME ZONE, "token_delta" numeric, "sol_delta" numeric, "fee" integer, CONSTRAINT "PK_b64ed7990fc7273480da934580c" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "idx_sol_trades_3" ON "sol_trades" ("mint") `)
        await db.query(`CREATE INDEX "idx_sol_trades_2" ON "sol_trades" ("timestamp") `)
        await db.query(`CREATE INDEX "idx_sol_trades_1" ON "sol_trades" ("mint", "timestamp") `)
        await db.query(`CREATE TABLE "token_trades" ("id" character varying NOT NULL, "signature" character varying(100) NOT NULL, "bucket" integer NOT NULL, "trader" character varying(50), "timestamp" TIMESTAMP, "mint_spent" character varying(50), "amount_spent" double precision, "mint_got" character varying(50), "amount_got" double precision, "fee" integer, CONSTRAINT "PK_a4a8440f4331dbff321ba4ade46" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "idx_token_trades_1" ON "token_trades" ("timestamp") `)
        await db.query(`CREATE TABLE "exchange" ("id" character varying NOT NULL, "slot" integer NOT NULL, "tx" text NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "from_owner" text NOT NULL, "from_token" text NOT NULL, "from_amount" numeric NOT NULL, "to_owner" text NOT NULL, "to_token" text NOT NULL, "to_amount" numeric NOT NULL, CONSTRAINT "PK_cbd4568fcb476b57cebd8239895" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "jup_signatures"`)
        await db.query(`DROP INDEX "public"."idx_bucket_processed_timestamp"`)
        await db.query(`DROP INDEX "public"."idx_processed_timestamp"`)
        await db.query(`DROP INDEX "public"."idx_timestamp"`)
        await db.query(`DROP TABLE "sol_trades"`)
        await db.query(`DROP INDEX "public"."idx_sol_trades_3"`)
        await db.query(`DROP INDEX "public"."idx_sol_trades_2"`)
        await db.query(`DROP INDEX "public"."idx_sol_trades_1"`)
        await db.query(`DROP TABLE "token_trades"`)
        await db.query(`DROP INDEX "public"."idx_token_trades_1"`)
        await db.query(`DROP TABLE "exchange"`)
    }
}
