import argparse
import os
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from dotenv import load_dotenv
from testdata import sample_search_result

load_dotenv()

DEVELOPER_KEY = os.getenv('YOUTUBE_API_KEY')
YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION = 'v3' 

test_flag = True
# test_flag = False

# use given parameters
def youtube_search(query, maxResults=3):
  youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,
    developerKey=DEVELOPER_KEY)

  # Call the search.list method to retrieve results matching the specified
  # query term.
  if not test_flag:
    try:
        search_response = youtube.search().list(
            q=query,
            part='id,snippet',
            maxResults=maxResults
        ).execute()
    except HttpError as e:
        print('An HTTP error %d occurred:\n%s' % (e.resp.status, e.content))
        return []
  else:
    search_response =  sample_search_result

  videos = []

  for search_result in search_response.get('items', []):
    if search_result['id']['kind'] == 'youtube#video':
      videos.append({
        "query": query,
        "title": search_result['snippet']['title'],
        "url": "www.youtube.com/watch?v=" + search_result['id']['videoId']
      })

  # print('Videos:\n', '\n'.join(videos), '\n')
  return videos

if __name__ == '__main__':
  parser = argparse.ArgumentParser()
  parser.add_argument('--q', help='Search term', default='Google')
  parser.add_argument('--max-results', help='Max results', default=25)
  args = parser.parse_args()
  print("-_-")
  print(args)

  try:
    youtube_search(args)
  except HttpError as e:
    print('An HTTP error %d occurred:\n%s' % (e.resp.status, e.content))
