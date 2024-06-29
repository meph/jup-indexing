import {BigIntColumn, DateTimeColumn, Entity, IntColumn, PrimaryColumn, StringColumn, Column, Index, BooleanColumn, FloatColumn} from '@subsquid/typeorm-store'

@Entity('jup_signatures')
@Index('idx_timestamp', ['timestamp'])
@Index('idx_processed_timestamp', ['processed', 'timestamp'])
@Index('idx_bucket_processed_timestamp', ['bucket', 'processed', 'timestamp'])
export class JupSignature {
    constructor(props?: Partial<JupSignature>) {
        Object.assign(this, props)
    }

  @PrimaryColumn()
  id!: string;

  @DateTimeColumn({ nullable: false })
  timestamp!: Date;

  @IntColumn({ nullable: false })
  bucket!: number;

  @BooleanColumn({ default: false, nullable: false })
  processed!: boolean;

  @BooleanColumn({ nullable: true })
  is_trade_extracted!: boolean;

  @StringColumn({ nullable: true })
  error_message!: string;
}