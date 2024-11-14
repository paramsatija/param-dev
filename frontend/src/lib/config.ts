import { config } from 'dotenv'
import path from 'path'

// Load .env.local file
config({ path: path.resolve(process.cwd(), '.env.local') })

export const IS_PRODUCTION = process.env.NODE_ENV === 'production'

