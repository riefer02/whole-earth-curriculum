import { type CollectionEntry } from 'astro:content';

// "Where are we this week?" — map a calendar date onto a scope's 180-day
// school-year timeline so a teacher can see which lesson a class is on today.

export const SCHOOL_YEAR_DAYS = 180;

type ScopeUnit = NonNullable<CollectionEntry<'scopes'>['data']['units']>[number];

export interface TodayLesson {
  unit: ScopeUnit;
  lesson: CollectionEntry<'lessons'>;
  grade: number;
}

/**
 * First school day (Mon–Fri) on or after September 1 of `year`.
 */
function schoolYearStart(year: number): Date {
  const sep1 = new Date(year, 8, 1); // month is 0-indexed → September
  const dow = sep1.getDay(); // 0 = Sunday … 6 = Saturday
  // Advance to the next weekday: +1 for Sunday, +2 for Saturday.
  const offset = dow === 0 ? 1 : dow === 6 ? 2 : 0;
  return new Date(year, 8, 1 + offset);
}

/**
 * Maps a date to a school-day index in `1..180`.
 *
 * Heuristic (intentionally simple, no holidays):
 *  - The school year begins on the first weekday on/after September 1.
 *  - It runs Mon–Fri (~36 weeks = 180 school days) with no skipped days.
 *  - The active year is anchored to the current calendar year; if `today`
 *    precedes that year's start (i.e. January–August), the previous September
 *    is used, since the school year straddles New Year.
 *  - Results are clamped to `1..180`: before the start → `1`, after → `180`.
 */
export function schoolDayForToday(today: Date): number {
  let start = schoolYearStart(today.getFullYear());
  if (today.getTime() < start.getTime()) {
    start = schoolYearStart(today.getFullYear() - 1);
  }

  // Before the earliest plausible year start (defensive): day 1.
  if (today.getTime() < start.getTime()) return 1;

  let day = 0;
  const cursor = new Date(start);
  while (cursor.getTime() <= today.getTime() && day < SCHOOL_YEAR_DAYS) {
    const dow = cursor.getDay();
    if (dow !== 0 && dow !== 6) day += 1; // count weekdays only
    cursor.setDate(cursor.getDate() + 1);
  }

  return Math.max(1, Math.min(SCHOOL_YEAR_DAYS, day));
}

/**
 * Given a scope (units with `start_day`/`end_day`) and a `lessonsByUnit` map,
 * find the unit whose day range contains `schoolDay`, then pick the lesson at
 * the position that distributes the unit's lessons evenly across that range.
 *
 * Returns `null` when the grade, unit, or lesson data is missing/empty.
 */
export function lessonForSchoolDay(
  scope: CollectionEntry<'scopes'>,
  lessonsByUnit: Map<string, CollectionEntry<'lessons'>[]>,
  schoolDay: number,
): TodayLesson | null {
  const grade = scope.data.grade;
  if (grade === undefined) return null;

  const unit = (scope.data.units ?? []).find(
    (u) =>
      typeof u.start_day === 'number' &&
      typeof u.end_day === 'number' &&
      schoolDay >= u.start_day &&
      schoolDay <= u.end_day,
  );
  if (!unit || !unit.unit_id) return null;

  const lessons = lessonsByUnit.get(unit.unit_id);
  if (!lessons || lessons.length === 0) return null;

  const start = unit.start_day as number;
  const end = unit.end_day as number;
  const daySpan = end - start + 1;
  const index = Math.max(
    0,
    Math.min(lessons.length - 1, Math.floor(((schoolDay - start) / daySpan) * lessons.length)),
  );

  const lesson = lessons[index];
  if (!lesson) return null;

  return { unit, lesson, grade };
}
