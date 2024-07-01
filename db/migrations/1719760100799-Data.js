module.exports = class Data1719760100799 {
    name = 'Data1719760100799'

    async up(db) {
        await db.query(`ALTER TABLE "sol_trades" ADD "created_at" TIMESTAMP WITH TIME ZONE`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "sol_trades" DROP COLUMN "created_at"`)
    }
}
