declare module 'db' {
  import { Pool } from 'mysql2/promise';
  const connection: Pool;
  export default connection;
}
