-- CreateTable
CREATE TABLE "InfoUser" (
    "id" SERIAL NOT NULL,
    "cpf" VARCHAR(255) NOT NULL,
    "bankName" VARCHAR(255) NOT NULL,
    "bankNumber" VARCHAR(255) NOT NULL,
    "agency" VARCHAR(255) NOT NULL,
    "accountNumber" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "InfoUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InfoUser_userId_key" ON "InfoUser"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "InfoUser" ADD CONSTRAINT "InfoUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
