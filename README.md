# cowinBot

## update
> this bot is deployed, ping -- @cowin753912Bot

![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiNlMwWlQ3WGVQeEhtQ3pBbEs3MGN6MUdEeFBrek9zemNnZUx2QWFENk5hRS9ib0JZckd0VDZuL2k4M1lkVFJZNThQRFFYcXV2VlZYMkRZT1o3aWJDL1g4PSIsIml2UGFyYW1ldGVyU3BlYyI6IjJ5di9aNEdWNUl2STBldXYiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=main)
## commands implemented
- [x] /genOTP
- [x] /verOTP
- [x] /getPdf
- [x] /subPin
- [x] /delPin


**/genOTP**
- this will take phone number(10 digit without country code) as input
- an OTP will be sent to your phone from the cowin servers

**/verOTP**
- this will take otp from the command and hash it with sha256
- the hashed value is sent to the confirmOTP cowin api and will recieve the jwt token

**/getPdf**
- this take no input
- if the user has already been authenticated, get pdf cowin api will be called
- the response right now is in binary format

**/subPin**
- this takes the 6 digit pincode as input
- will run a cron job every 15 min to check if vaccines are available in the pin location
- if they are, message will be sent to the chat regarding the availability

**/delPin**
- takes no input
- deletes your record from the db and stops the cronJob

> this app doesn't scale well
> bot.ts will poll the telegram for updates instead of using webhooks which give real time update
