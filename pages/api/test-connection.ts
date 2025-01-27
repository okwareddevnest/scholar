import connection from '../../../lib/dbConnection';

console.log('Attempting to connect to the database...');

connection.query('SELECT 1 + 1 AS solution', (error: any, results: any) => {
  if (error) {
    console.error('Error executing query:', error);
    return;
  }
console.log('The solution is: ', results[0].solution);
  connection.end(); // Close the connection after the query
});
