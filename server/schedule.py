class Schedule:
    class Assignment:
        def __init__(self, title, estimated_time, youtube_queries, learning_goals) -> None:
            self.title = title
            self.estimated_time = estimated_time
            self.youtube_queries = youtube_queries
            self.learning_goals = learning_goals
        
        def __repr__(self):
            return (f"Assignment(title={self.title!r}, estimated_time={self.estimated_time!r}, "
                    f"youtube_queries={self.youtube_queries!r}, learning_goals={self.learning_goals!r})")

    class Week:
        def __init__(self, week_index, topic, assignments, youtube_queries) -> None:
            self.week_index = week_index
            self.topic = topic
            self.assignments = [Schedule.Assignment(**assignment) for assignment in assignments]
            self.youtube_queries = youtube_queries

        def __repr__(self):
            return (f"Week(week_index={self.week_index!r}, topic={self.topic!r}, "
                    f"assignments={self.assignments!r}, youtube_queries={self.youtube_queries!r})")

    def __init__(self, weeks) -> None:
        self.weeks = [self.Week(**week) for week in weeks]

    def __repr__(self):
        return f"Schedule(weeks={self.weeks!r})"
    