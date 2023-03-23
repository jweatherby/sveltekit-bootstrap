import { z } from 'zod';
import { privateRoute, publicRoute } from '$lib/trpc/init';
import { sanitizeEmail } from '$lib/utils/sanitizers';
import { prisma } from '$lib/dbClient';
import { TRPCClientError } from '@trpc/client';
import { TRPCError } from '@trpc/server';

export default {
  /**
   * @route account.verify
   */
  verify: publicRoute.input(
    z.object({
      userId: z.number().optional(),
      email: z.string().email(),
      fullName: z.string().optional(),
      emailedKey: z.number(),
    })
  ).mutation(async ({ input }) => {

    const email = sanitizeEmail(input.email)

    const token = await prisma.authToken.findUnique({ where: { email } })
    if (!token) {
      throw new TRPCClientError('Invalid token request, email not found')
    }

    const keySchema = z.object({
      emailedKey: z.number().refine(val => val === parseInt(token.emailedKey as string), { message: 'Invalid code entered' })
    })

    const result = keySchema.safeParse({
      emailedKey: input.emailedKey
    })
    if (!result.success) {
      throw new TRPCError({ message: result.error.message, code: 'BAD_REQUEST' })
    }

    let user
    if (!input.userId) {
      user = await prisma.user.create({ data: { email, fullName: input.fullName } })
    } else {
      user = await prisma.user.findUnique({ where: { id: input.userId } })
    }

    if (!user) {
      throw new TRPCClientError('Bizarre error encountered, no user found')
    }

    await prisma.authToken.delete({ where: { id: token.id } })
    const account = {
      userId: user.id,
      fullName: user.fullName as string,
      email: user.email as string
    }
    return account
  }),

  /**
   * @route account.logout
   */
  logout: privateRoute.mutation(() => {
    console.log('logging out')
  })
}