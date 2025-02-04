import getConnection from '../../../lib/dbConnection'; // Ensure this path is correct

type User = {
  email: string;
  password: string;
  role: string; // Add role to the User type
};

export const addUser = async (email: string, password: string): Promise<void> => {
  const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
  try {
    const connection = await getConnection();
    await connection.execute(query, [email, password]);
    await connection.end();
  } catch (err) {
    console.error('Error adding user:', err);
    throw err;
  }
};

export const findUser = async (email: string, password: string): Promise<User | null> => {
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  try {
    const connection = await getConnection();
    const [results] = await connection.execute(query, [email, password]);
    const users = results as User[];
    await connection.end();
    return users[0] || null;
  } catch (err) {
    console.error('Error finding user:', err);
    throw err;
  }
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const query = 'SELECT * FROM users WHERE email = ?';
  try {
    const connection = await getConnection();
    const [results] = await connection.execute(query, [email]);
    const users = results as User[];
    await connection.end();
    return users[0] || null;
  } catch (err) {
    console.error('Error finding user by email:', err);
    throw err;
  }
};