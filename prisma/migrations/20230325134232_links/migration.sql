-- AlterTable
ALTER TABLE "UsersOnTenants" ADD COLUMN     "linkId" TEXT;

-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "publicName" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "destination" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
