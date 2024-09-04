import flask 
from analyze import query
from video_finder import youtube_search
from schedule import Schedule

from testdata import course_examples

def test_util(weeks):
   for week in weeks:
        print("---")
        print("WEEK: " + str(week.week_index))
        print("TOPIC: " + week.topic)
        print(week.youtube_queries)
        for a in week.assignments: 
            print("ASSIGNMENT: " + a.title)
            queries = a.youtube_queries
            for q in queries:
                print("QUERY: " + q)
                hm = {}
                hm['q'] = q
                print(youtube_search(hm))
            print()

def get_schedule(content, level, weeks):
    q = f"Create a {weeks} week independent self-learning schedule for someone at {level} level about:" + content
    sched : Schedule = query(q)
    print(q)
    # test_util(sched.weeks)
    return sched.to_dict()

def get_videos(queries):
    videos = [youtube_search(q) for q in queries]
    print(videos)
    return videos

# get_schedule(course_examples["robot"])
