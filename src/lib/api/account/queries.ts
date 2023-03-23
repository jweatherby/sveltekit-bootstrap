import { z } from 'zod';
import { publicRoute } from '$lib/trpc/init';
import { sanitizeEmail } from '$lib/utils/sanitizers';
import { prisma } from '$lib/dbClient';
import { generateToken } from './utils/tokenGenerator';

export default {
  checkEmail: publicRoute.input(
    z.object({
      email: z.string().email()
    })
  ).query(async ({ input }) => {
    const email = sanitizeEmail(input.email)

    const user = await prisma.user.findUnique({ where: { email } })

    const emailedKey = generateToken(6, '1234567890')

    await prisma.authToken.upsert({
      where: { email },
      create: { email, emailedKey },
      update: { emailedKey }
    })

    return { userId: user && user.id }
  })
}