import flask 
from analyze import query
from testdata import course_examples
from video_finder import youtube_search

# take array of text inputs
res = query("Create a 1 week independent self-learning schedule about:" + course_examples["nlp"])

