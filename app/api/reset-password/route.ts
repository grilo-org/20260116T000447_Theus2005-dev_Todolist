import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
  );

  const { email, newPassword } = await req.json();

  if (!email || !newPassword) {
    return NextResponse.json(
      { message: "Senha e email obrigatórios." },
      { status: 400 }
    );
  }

  try {
    const { data: user, error: fetchError } = await supabaseAdmin
      .from("auth.users")
      .select("id")
      .eq("email", email)
      .single();

    if (fetchError) throw fetchError;

    if (!user)
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );

    const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
      password: newPassword,
    });

    if (error)
      return NextResponse.json({ message: error.message }, { status: 400 });

    return NextResponse.json(
      { message: "Senha alterada com sucesso." },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
