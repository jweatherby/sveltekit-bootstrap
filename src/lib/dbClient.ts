import Prisma from "@prisma/client";

const prisma = new Prisma.PrismaClient({
  log: [
    {
      emit: "stdout",
      level: "error",
    },
    //   {
    //     emit: 'stdout',
    //     level: 'error',
    //   },
    {
      emit: "stdout",
      level: "error",
    },
    //   {
    //     emit: 'stdout',
    //     level: 'warn',
    //   },
  ],
});

prisma.$on("query", (e) => {
  console.log("Query: " + e.query);
  // console.log("Params: " + e.params);
  console.log("Duration: " + e.duration + "ms");
});

export { prisma };