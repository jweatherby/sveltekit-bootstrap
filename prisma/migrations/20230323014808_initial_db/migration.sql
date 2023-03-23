-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR,
    "full_name" VARCHAR,
    "date_created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthToken" (
    "id" SERIAL NOT NULL,
    "date_created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "date_modified" TIMESTAMP(3),
    "emailed_key" VARCHAR,
    "email" VARCHAR NOT NULL,

    CONSTRAINT "AuthToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ix_user_email" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AuthToken_email_key" ON "AuthToken"("email");
