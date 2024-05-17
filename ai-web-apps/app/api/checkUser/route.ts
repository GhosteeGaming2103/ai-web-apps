import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";


export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  console.log(body);
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });
  // Check if the email already exists
  const [rows, fields] = await connection.execute(
    "SELECT * FROM users WHERE email = ?",
    [body.email]
  );
  if (Array.isArray(rows) && rows.length === 0) {
    await connection.execute("INSERT INTO users (email) VALUES (?)", [
      body.email,
    ]);
    const [rows, fields] = await connection.execute("SELECT * FROM users WHERE email = ?", [body.email]);
    return NextResponse.json({ message: "User created", user: rows });
  }
  else {
    return NextResponse.json({ message: "User already exists", user: rows });
  }
}