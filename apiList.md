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


-pagination

/feed?page=1&limit=10  -  1-10  (.skip(0)&.limit(10))
/feed?page=2&limit=10  -  11-20 (.skip(10)&.limit(10))
/feed?page=3&limit=10  -  21-30 (.skip(20)&.limit(10))


.skip()  ,  .limit()



status : ignore , interested , accepted , rejected