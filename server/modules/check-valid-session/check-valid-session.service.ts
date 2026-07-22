import { prisma } from '../../lib/prisma.js';

export async function validateSession(cookieToken: string) {
  const session = await prisma.session.findUnique({
    where: { token: cookieToken },
    select: {
      user: {
        select: { name: true },
      },
    },
  });

  if (!session?.user?.name) return null;

  return session.user.name.split(' ')[0];
}
