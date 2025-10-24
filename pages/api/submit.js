// pages/api/submit.js
import getPool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields required' });
  }

  try {
    const pool = getPool();
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
    connection.release();

    res.status(200).json({ success: true, id: result.insertId });
  } catch (error) {
    console.error('DB Error:', error); // This will show in Vercel logs
    res.status(500).json({ message: 'Failed to save data' });
  }
}
