import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  mockId: varchar("mockId", { length: 255 }).notNull(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition", { length: 255 }).notNull(),
  jobDesc: varchar("jobDesc", { length: 255 }).notNull(),
  jobExperience: varchar("jobExperience", { length: 50 }).notNull(),
  createdBy: varchar("createdBy", { length: 255 }).notNull(),
  createdAt: varchar("createdAt", { length: 50 }).notNull(),
});
export const UserAnswer=pgTable('UserAnswer',{
  id:serial('id').primaryKey(),
  mockId:varchar('mockId',).notNull(),
  question:varchar('question',).notNull(),
  correctAns:varchar('correctAns',),
  userAnswer:text('userAnswer',),
  feedback:text('feedback',),
  rating:varchar('rating'),
  userEmail:varchar('userEmail',),
  createdAt:varchar('createdAt',),
})