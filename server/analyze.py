#  or merely copy and paste a class description - course description, assignments, learning goals
#  upon parsing other formts, also fill in fields for the user to correct, before sending prompts 
from openai import OpenAI
import json
from schedule import Schedule
from testdata import sample_input
# from nltk.tokenize import sent_tokenize

client = OpenAI()

test_flag = True

def query(content: str) -> Schedule :
  if not test_flag:
    completion = client.chat.completions.create(
      model="gpt-3.5-turbo",
      messages=[
        {"role": "system", "content": "You are a college professor passionate about hands-on learning and education, \
        skilled in designing effective courses. You consider the high level theme and key points of what the student wants to learn, \
        and craft a plan that makes the topic easy to learn and apply. You provide responses in consistent JSON format that can be easily parsed with python json.loads, with \
          weeks: {week_index, topic, assignments (title, estimated_time, youtube_queries, learning_goals), youtube_queries}. Provide at least 3 assignments for each week.\
        Provide the full requested weeks. "},
        {"role": "user", "content": content},
        {"role": "user", "content": "for every single assignment, give three bulleted youtube search queries for finding relevant videos that provide effective practice of skills"}
      ]
    )
    c = completion.choices[0].message.content
  else:
    c = sample_input

  res = json.loads(c)

  weeks = res["weeks"]

  sched = Schedule(**res)

  return sched
