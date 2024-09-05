// TODO look into pydantic for automated type syncing
export interface Assignment {
  title: string;
  estimated_time: number;
  youtube_queries: string[];
  learning_goals: string[];
}

export interface Week {
  week_index: number;
  topic: string;
  topic_overview: string;
  assignments: Assignment[];
  youtube_queries: string[];
}

export interface CourseSchedule {
  course_name: string;
  course_summary: string;
  weeks: Week[];
}

export interface VideoResult {
  query: string,
  url: string
}
