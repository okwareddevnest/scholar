import { createConnection } from 'mysql2/promise';

const getConnection = async () => {
    console.log('Attempting to connect to the database with the following parameters:');
    console.log('Host: localhost');
    console.log('User: root');
    console.log('Password: #Airforce1@omwenga');
    console.log('Database: scholar');

    return createConnection({
        host: 'localhost',
        user: 'root',
        password: '#Airforce1@omwenga',
        database: 'scholar', 
    });
};

export default getConnection;