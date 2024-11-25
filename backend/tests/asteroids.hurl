# check if NASa API is alive
GET https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY
HTTP 200

# check if the server is alive
GET http://localhost:3000/api/version
HTTP 200

GET http://localhost:3000/api/asteroids
HTTP 200

# asteroids can be searched within 7 days period only
GET http://localhost:3000/api/asteroids?startDate=2019-01-01&endDate=2019-01-20
HTTP 400

GET http://localhost:3000/api/asteroids?startDate=2019-01-01&endDate=2019-01-10
HTTP 400