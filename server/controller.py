import flask 
from analyze import query
from video_finder import youtube_search2
from schedule import Schedule

from testdata import course_examples

def get_schedule(content):
    sched : Schedule = query("Create a 3 week independent self-learning schedule about:" + content)

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
    return sched

get_schedule(course_examples["system"])



