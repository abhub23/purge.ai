import { createAuthClient } from 'better-auth/client';

const authClient = createAuthClient({
  //backend url (necessary when frontend and backend are on seperate ports)
  baseURL: 'http://localhost:4000',
  // this dont even have a callback URL property
});

export const GoogleSignIn = async () => {
  await authClient.signIn.social({
    provider: 'google',
    callbackURL: 'http://localhost:3000', //redirects to this URL after successful sign in

  });
};

export const GoogleSignOut = async () => {
  await authClient.signOut();
};
