import flask 
from analyze import query
from testdata import course_examples
from video_finder import youtube_search2
from schedule import Schedule

# take array of text inputs
sched : Schedule = query("Create a 2 week independent self-learning schedule about:" + course_examples["robot"])

for week in sched.weeks:
    print("---")
    print("WEEK: " + str(week.week_index))
    print("TOPIC: " + week.topic)
    for a in week.assignments: 
        print("ASSIGNMENT: " + a.title)
        queries = a.youtube_queries
        for q in queries:
            print("QUERY: " + q)
            hm = {}
            hm['q'] = q
            youtube_search2(hm)
        print()


