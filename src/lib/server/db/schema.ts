import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { user } from './auth.schema';

export const bookmark = pgTable('bookmark', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	url: text('url').notNull(),
	title: text('title').notNull(),
	notes: text('notes'),
	tags: text('tags').notNull().default(''),
	createdAt: timestamp('created_at', { mode: 'date' })
		.notNull()
		.defaultNow()
});

export * from './auth.schema';
