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

def youtube_search(options):
  youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,
    developerKey=DEVELOPER_KEY)

  # Call the search.list method to retrieve results matching the specified
  # query term.
  search_response = youtube.search().list(
    q=options.q,
    part='id,snippet',
    maxResults=options.max_results
  ).execute()

  videos = []
  channels = []
  playlists = []

  # Add each result to the appropriate list, and then display the lists of
  # matching videos, channels, and playlists.
  for search_result in search_response.get('items', []):
    if search_result['id']['kind'] == 'youtube#video':
      videos.append('%s (%s)' % (search_result['snippet']['title'],
                                 search_result['id']['videoId']))
    elif search_result['id']['kind'] == 'youtube#channel':
      channels.append('%s (%s)' % (search_result['snippet']['title'],
                                   search_result['id']['channelId']))
    elif search_result['id']['kind'] == 'youtube#playlist':
      playlists.append('%s (%s)' % (search_result['snippet']['title'],
                                    search_result['id']['playlistId']))

  print('Videos:\n', '\n'.join(videos), '\n')
#   print('Channels:\n', '\n'.join(channels), '\n')
#   print('Playlists:\n', '\n'.join(playlists), '\n')

# use given parameters
def youtube_search2(query, maxResults=3):
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

  # Add each result to the appropriate list, and then display the lists of 
  # matching videos, channels, and playlists.
  for search_result in search_response.get('items', []):
    if search_result['id']['kind'] == 'youtube#video':
      url = "www.youtube.com/watch?v=" + search_result['id']['videoId']

      videos.append('%s (%s)' % (search_result['snippet']['title'],
                                 url))

  print('Videos:\n', '\n'.join(videos), '\n')

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
