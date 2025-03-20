import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { CourseTable } from "./course";
import { relations } from "drizzle-orm";
import { CourseSectionTable } from "./courseSection";

//
export const lessonStatuses = ["public", "private"] as const;

export type LessonStatus = (typeof lessonStatuses)[number];

export const lessonStatusEnum = pgEnum("lesson_status", lessonStatuses);
//

export const LessonTable = pgTable("lessons", {
  id,
  name: text().notNull(),
  description: text(),
  youtubeVideoId: text().notNull(),
  order: integer().notNull(),
  status: lessonStatusEnum().notNull().default("private"),
  sectionId: uuid()
    .notNull()
    .references(() => CourseTable.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
});

export const LessonRelationships = relations(LessonTable, ({ one }) => ({
  course: one(CourseSectionTable, {
    fields: [LessonTable.sectionId],
    references: [CourseSectionTable.id],
  }),
}));
