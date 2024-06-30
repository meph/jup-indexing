import {BigIntColumn, DateTimeColumn, Entity, IntColumn, PrimaryColumn, StringColumn, Column, Index, BooleanColumn, FloatColumn} from '@subsquid/typeorm-store'

@Entity('sol_trades')
@Index('idx_sol_trades_1', ['mint', 'timestamp'])
@Index('idx_sol_trades_2', ['timestamp'])
@Index('idx_sol_trades_3', ['mint'])
export class SolTrade {

    constructor(props?: Partial<SolTrade>) {
        Object.assign(this, props)
    }


  @PrimaryColumn()
  id!: string;

  @IntColumn({ nullable: false })
  bucket!: number;

  @Column('varchar',{ length: 50, nullable: true })
  trader!: string;

  @Column('varchar',{ length: 50, nullable: true })
  mint!: string;

  @DateTimeColumn({ nullable: true })
  timestamp!: Date;

  @FloatColumn({ nullable: true })
  token_delta!: number;

  @FloatColumn({ nullable: true })
  sol_delta!: number;
}
