declare module '../../lib/dbConnection' {
  import { Connection } from 'mysql2';
  const connection: Connection;
  export default connection;
}
