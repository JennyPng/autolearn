from openai import OpenAI
import json
from schedule import Schedule
from testdata import sample_input

client = OpenAI()

# test_flag = True
test_flag = False

def query(content: str) -> Schedule :
  if not test_flag:
    completion = client.chat.completions.create(
      model="gpt-3.5-turbo",
      messages=[
        {"role": "system", "content": "You are a professor passionate about hands-on learning and education, \
        skilled in designing effective courses. You consider the high level theme and key points of what the student wants to learn, \
        and craft a plan that makes the topic easy to learn and apply. Answer consistently in JSON that can be easily parsed with python json.loads, using exactly the following field names: \
          {course_name, course_summary, weeks: {week_index, topic, topic_overview, assignments (title, estimated_time, youtube_queries, learning_goals), youtube_queries}}. Topic_overview is a 3 sentence summary of the week's topic. week.youtube_queries give 3 youtube search queries for providing an overview of the week's topic. Provide at least 3 assignments for each week. For each assignment, give 3 learning goals and 3 youtube search queries for finding relevant videos that provide effective practice of skills.\
          Provide the full requested weeks. "},
        {"role": "user", "content": content},
      ]
    )
    c = completion.choices[0].message.content
  else:
    c = sample_input
  res = json.loads(c)

  # print(res)

  # TODO add retry or fix prompt to enforce json
  sched = Schedule(**res)

  # print(sched)

  return sched
