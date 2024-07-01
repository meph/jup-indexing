import { Client } from 'pg';
import moment from 'moment-timezone';
import * as dotenv from 'dotenv';

dotenv.config();

// Database connection configuration
const client = new Client({
  user: process.env.DB_USER || 'user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'db_name',
  password: process.env.DB_PASS || 'password',
  port: 5432,
});

let isConnected = false;

// Function to connect to the database
export async function connectToDatabase() {
  if (isConnected) {
    return
  }
  try {
    await client.connect();
    console.log('Connected to the database');
    isConnected = true;
  } catch (err: any) {
    console.error('Database connection error:', err.stack);
  }
}

export async function getPreviousSignature(): Promise<string | null> {
  // Returns a signature with timestamp earlier than the latest one
  // This way we can make sure that we have to gaps
  // Some signatures from with the latest timestamp could be checked again, but it is fine
    try {
        // Get the latest timestamp
        const latestTimestampQuery = `
            SELECT MAX(timestamp) as latest_timestamp
            FROM jup_signatures
        `;
        const latestTimestampResult = await client.query(latestTimestampQuery);

        if (latestTimestampResult.rows.length === 0) {
            return null;
        }

        const latestTimestamp = latestTimestampResult.rows[0].latest_timestamp;

        // Get the highest timestamp less than the latest timestamp
        const previousTimestampQuery = `
            SELECT MAX(timestamp) as previous_timestamp
            FROM jup_signatures
            WHERE timestamp < $1
        `;
        const previousTimestampResult = await client.query(previousTimestampQuery, [latestTimestamp]);

        if (previousTimestampResult.rows.length === 0 || !previousTimestampResult.rows[0].previous_timestamp) {
            return null;
        }

        const previousTimestamp = previousTimestampResult.rows[0].previous_timestamp;

        // Get any signature from the previous timestamp
        const signatureQuery = `
            SELECT signature
            FROM jup_signatures
            WHERE timestamp = $1
            ORDER BY signature ASC
            LIMIT 1
        `;
        const signatureResult = await client.query(signatureQuery, [previousTimestamp]);

        if (signatureResult.rows.length > 0) {
            return signatureResult.rows[0].signature;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Database error:', error);
        return null;
    }
}

// Function to insert data into the jup_signatures table
export async function dbSaveSignature(signature: string, localTimestamp: Date, bucket: number, processed: boolean = false,
                                      isTradeExtracted?: boolean, errorMessage?: string) {
  const localTS = moment(localTimestamp);
  const timestamp = localTS.utc();

  const insertQuery = `
    INSERT INTO jup_signatures (signature, timestamp, bucket, processed, is_trade_extracted, error_message)
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT (signature) DO NOTHING;
  `;

  const values = [signature, timestamp, bucket, processed, isTradeExtracted, errorMessage];

  try {
    const res = await client.query(insertQuery, values);
    //console.log('Data inserted:', res.rowCount > 0);
  } catch (err: any) {
    console.error('Error inserting data:', err.stack);
  }
}

export async function dbSaveSolTrade(signature: string, bucket: number, trader: string, mint: string, localTimestamp: Date,
                                     tokenDelta: number, solDelta: number) {
  const localTS = moment(localTimestamp);
  const timestamp = localTS.utc();

  const insertQuery = `
    INSERT INTO sol_trades (signature, bucket, trader, mint, timestamp, token_delta, sol_delta)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (signature) DO NOTHING;
  `;

  const values = [signature, bucket, trader, mint, timestamp, tokenDelta, solDelta];

  try {
    const res = await client.query(insertQuery, values);
    //console.log('Data inserted:', res.rowCount > 0);
  } catch (err :any) {
    console.error('Error inserting data:', err.stack);
  }
}

export async function updateProcessedAndTradeExtracted(signature: string): Promise<void> {
    try {
        const updateQuery = `
            UPDATE jup_signatures
            SET processed = true, is_trade_extracted = true
            WHERE signature = $1
        `;

        await client.query(updateQuery, [signature]);
    } catch (error) {
        console.error('Error updating processed and is_trade_extracted:', error);
    }
}

export async function updateErrorMessage(signature: string, errorMessage: string): Promise<void> {
    try {
        const updateQuery = `
            UPDATE jup_signatures
            SET processed = true, error_message = $1
            WHERE signature = $2
        `;

        await client.query(updateQuery, [errorMessage, signature]);
    } catch (error) {
        console.error('Error updating error_message:', error);
    }
}


export async function dbSaveTokenTrade(signature: string, bucket: number, trader: string, mintSpent: string,
                                       amountSpent: BigInt, mintGot: string, amountGot: BigInt, localTimestamp: Date) {
  const localTS = moment(localTimestamp);
  const timestamp = localTS.utc();
  const insertQuery = `
    INSERT INTO token_trades (signature, bucket, trader, mint_spent, amount_spent, mint_got, amount_got, timestamp)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT (signature) DO NOTHING;
  `;

  const values = [signature, bucket, trader, mintSpent, amountSpent, mintGot, amountGot, timestamp];

  try {
    const res = await client.query(insertQuery, values);
    //console.log('Data inserted:', res.rowCount > 0);
  } catch (err: any) {
    console.error('Error inserting data:', err.stack);
  }
}

// Function to disconnect from the database
export async function disconnectFromDatabase() {
  try {
    await client.end();
    console.log('Disconnected from the database');
  } catch (err: any) {
    console.error('Error disconnecting from the database:', err.stack);
  }
}

// Main function to insert data
// async function main() {
//   await connectToDatabase();
//
//   // Example data to insert
//   const exampleSignature = 'example_signature';
//   const exampleTimestamp = new Date();
//   const exampleBucket = 1;
//   const exampleProcessed = false;
//   const exampleIsTradeExtracted = true;
//   const exampleErrorMessage = null;
//
//   await insertData(exampleSignature, exampleTimestamp, exampleBucket, exampleProcessed, exampleIsTradeExtracted, exampleErrorMessage);
//
//   await disconnectFromDatabase();
// }

// main().catch((err) => console.error(err));

