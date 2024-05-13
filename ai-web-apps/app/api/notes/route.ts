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
};

export async function PUT(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  console.log(body);
  // const connection = await mysql.createConnection({
  //   host: process.env.DATABASE_HOST,
  //   user: process.env.DATABASE_USER,
  //   password: process.env.DATABASE_PASSWORD,
  //   database: process.env.DATABASE_NAME,
  // });
  // await connection.execute(
  //   "UPDATE notes SET title = ?, content = ? WHERE id = ? AND userid = ?",
  //   [body.title, body.content, body.id, body.userid]
  // );
  return NextResponse.json({ message: "Note Updated" });
}
