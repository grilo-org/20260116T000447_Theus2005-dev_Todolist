import { supabase } from "./supabase-client";
import { User } from "@/domain/user";
export  async function singUpUser({email, senha, nome}: User){
    return await supabase.auth.signUp({
        email: email,
        password: senha,
        options: {
          data: {
            name: nome,
          },
        },
      });
      
}

export async function UserLogin({email, senha}: User){
  return await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });
}