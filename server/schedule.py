
class Schedule:
    class Assignment:
        def __init__(self, title, estimated_time, youtube_queries, learning_goals) -> None:
            self.title = title;
            self.estimated_time = estimated_time
            self.youtube_queries = youtube_queries
            self.learning_goals = learning_goals
    class Week:
        def __init__(self, week_index, topic, assignments, youtube_queries) -> None:
            self.week_index = week_index
            self.topic = topic;
            self.assignments = [Schedule.Assignment(**assignments[i]) for i in range(len(assignments))]
            self.youtube_queries = youtube_queries
            print(self.assignments[0].estimated_time)

    def __init__(self, weeks) -> None:
        # self.input = weeks
        self.weeks = [self.Week(**weeks[i]) for i in range(len(weeks))]
        print(self.weeks[0].topic)
    