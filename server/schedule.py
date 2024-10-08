class Schedule:
    class Assignment:
        def __init__(self, title, estimated_time, youtube_queries, learning_goals) -> None:
            self.title = title
            self.estimated_time = estimated_time
            self.youtube_queries = youtube_queries
            self.learning_goals = learning_goals
        
        def __repr__(self):
            return (f"Assignment(title={self.title!r}, estimated_time={self.estimated_time!r}, "
                    f"youtube_queries={self.youtube_queries!r}, learning_goals={self.learning_goals!r})\n")
        
        def to_dict(self):
            return {
                'title': self.title,
                'estimated_time': self.estimated_time,
                'youtube_queries': self.youtube_queries,
                'learning_goals': self.learning_goals
            }

    class Week:
        def __init__(self, week_index, topic, topic_overview, assignments, youtube_queries) -> None:
            self.week_index = week_index
            self.topic = topic
            self.topic_overview = topic_overview
            self.assignments = [Schedule.Assignment(**assignment) for assignment in assignments]
            self.youtube_queries = youtube_queries

        def __repr__(self):
            return (f"Week(week_index={self.week_index!r}, topic={self.topic!r}, "
                    f"assignments={self.assignments!r}, youtube_queries={self.youtube_queries!r})\n")

        def to_dict(self):
            return {
                'week_index': self.week_index,
                'topic': self.topic,
                'topic_overview': self.topic_overview,
                'assignments': [assignment.to_dict() for assignment in self.assignments],
                'youtube_queries': self.youtube_queries
            }

    def __init__(self, course_name, course_summary, weeks) -> None:
        self.raw = weeks
        self.course_name = course_name
        self.course_summary = course_summary
        self.weeks = [self.Week(**week) for week in weeks]

    def to_dict(self) :
        return {
            'course_name': self.course_name,
            'course_summary': self.course_summary,
            'weeks': [week.to_dict() for week in self.weeks]
        } 

    def __repr__(self):
        return f"Schedule(weeks={self.weeks!r})"
    