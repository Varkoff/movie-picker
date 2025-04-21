/*
  Warnings:

  - You are about to alter the column `movieId` on the `HistoryItem` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `serieId` on the `HistoryItem` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HistoryItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "movieId" INTEGER,
    "serieId" INTEGER,
    CONSTRAINT "HistoryItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_HistoryItem" ("createdAt", "id", "movieId", "serieId", "updatedAt", "userId") SELECT "createdAt", "id", "movieId", "serieId", "updatedAt", "userId" FROM "HistoryItem";
DROP TABLE "HistoryItem";
ALTER TABLE "new_HistoryItem" RENAME TO "HistoryItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
