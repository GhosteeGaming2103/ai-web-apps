import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    console.log(body);
    const connection = await mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });
    if (body.mode === "get") {
      const userId = body.userid;
      const [rows] = await connection.execute(
        "SELECT * FROM notes WHERE userid = ?",
        [userId]
      );
      console.log("METHOD GET", userId)
      return NextResponse.json({ status: "200", data: rows });
    } else {
      await connection.execute(
        "INSERT INTO notes (title, content, userid) VALUES (?, ?, ?)",
        [body.title, body.content, body.userid]
      );
      return NextResponse.json({ status: "200", message: "Note Created" });
    }

  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: "400", message: "Error" });
  }


};

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    console.log("BODY:", body);
    const connection = await mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });
    await connection.execute(
      "UPDATE notes SET title = ?, content = ? WHERE id = ? AND userid = ?",
      [body.title, body.content, body.noteid, body.userid]
    );
    return NextResponse.json({ status: "200", message: "Note Updated" });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: "400", message: "Error" });
  }

}
