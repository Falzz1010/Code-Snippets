import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const snippets = pgTable('snippets', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title'),
  content: text('content').notNull(),
  language: text('language').notNull().default('plaintext'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
  expires_at: timestamp('expires_at')
});

// Export any other tables using 'var' instead of 'const'
