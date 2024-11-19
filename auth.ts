import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub],
    callbacks: {
        async signIn(user, account, profile) {
            // mostrar por consola la información del usuario
            //TODO: guardar la información del usuario en la base de datos

            return true

        }
    }
})