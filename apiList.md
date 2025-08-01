# DevTinder APIs

## authrouter
- post /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequesrRpouter
- POST /request/send/:status/:userId
- POST /request/review/:status/:requestId

## userRouter
- GET /user/connections
- GET /user/requests/
- GET /user/feed - gets you the profile of others users on platform



status : ignore , interested , accepted , rejected