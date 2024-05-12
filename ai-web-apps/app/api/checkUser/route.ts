import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET(req: NextRequest, res: NextResponse) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Dayton014908",
    database: "test_db",
  });
  console.log("CALLED");
  const [rows, fields] = await connection.execute("SELECT * FROM test_table");
  return NextResponse.json(rows);
}


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
    return NextResponse.json({ message: "User created" });
  }
  else {
    return NextResponse.json({ message: "User already exists", user: rows });
  }
}