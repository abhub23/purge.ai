
import { createAuthClient } from "better-auth/client"

const authClient =  createAuthClient({
    //backend url is necessary
    baseURL: 'http://localhost:4000',
    callbackURL: 'http://localhost:3000',
})
 
export const GooglesignIn = async () => {
    await authClient.signIn.social({
        provider: "google"
    })
}

export const GooglesignOut = async () => {
  await authClient.signOut();
};