declare module 'db' {
  import { Connection } from 'mysql';

  const connection: Connection;
  export default connection;
}