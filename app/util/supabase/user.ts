import { supabase } from "./supabase-client";

export async function InsertUser(userId: string, nome: string, email: string){
    return await supabase.from("Usuario").insert({
        id: userId,
        nome: nome,
        email: email,
      });
}