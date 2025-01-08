## ENV
Your .env file should contain the following values:\
REACT_APP_API_BASE_URL\
REACT_APP_API_KEY\
REACT_APP_USER_ID

## Notes
- The homepage uses infinite load, 6 at a time
  - when uploading a new image it's added to the front
  - this pushes a loaded image on to the next page, this has been accounted for as is filtered out to avoid duplicate image loads
- Upvoting is unlimited
  - a user can up/down vote an image as many times as they want
- UserId can be changed for testing purposes you're able to change your id on the user page
  - this should follow the format Wxxxx
- Upload image type is restricted to jpgs

## Deployed code
 Working version can be found:
 http://waracle-cats.clients.littlebigtank.com