import {BigIntColumn, DateTimeColumn, Entity, IntColumn, PrimaryColumn, StringColumn, Column, Index, BooleanColumn, FloatColumn} from '@subsquid/typeorm-store'

@Entity('token_trades')
@Index('idx_token_trades_1', ['timestamp'])
export class TokenTrade {

    constructor(props?: Partial<TokenTrade>) {
        Object.assign(this, props)
    }

  @PrimaryColumn()
  id!: string;

  @Column('varchar', {nullable: false, length: 100 })
  signature!: string;

  @Column('integer', {nullable: false })
  bucket!: number;

  @Column('varchar', { length: 50, nullable: true })
  trader!: string;

  @Column('timestamp', { nullable: true })
  timestamp!: Date;

  @Column('varchar', { length: 50, nullable: true })
  mint_spent!: string;

  @Column('float', { nullable: true })
  amount_spent!: number;

  @Column('varchar', { length: 50, nullable: true })
  mint_got!: string;

  @Column('float', { nullable: true })
  amount_got!: number;

  @IntColumn({ nullable: true })
  fee!: number;
}