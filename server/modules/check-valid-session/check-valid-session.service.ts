import { prisma } from '../../lib/prisma';

export async function validateSession(cookieToken: string) {
  const session = await prisma.session.findUnique({
    where: { token: cookieToken },
    select: {
      user: {
        select: { name: true, image: true },
      },
    },
  });

  if (!session?.user?.name) return null;

  return {
    name: session.user.name.split(' ')[0],
    image: session.user.image ?? null,
  };
}
