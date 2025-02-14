# Group 23

# Team Members
- Maya Lee - @MayaLee393
- Steven Zheng - @steven.zheng1
- Amy Wu - @amypwu
- Edwin Torres - @EdwinIsSad
- Shawn Tran - @stran7365

# Project

SpeakATX is a website that aims to provide resources to minimal english and non-english speakers in Austin, TX. It will have information on local non-english communities, translation services, and job postings.

# Data Sources

- Yelp API: https://www.yelp.com/search?cflt=translationservices&find_loc=Austin%2C+TX
- Glassdoor API: https://www.glassdoor.com/developer/jobsApiActions.htm
- Google Maps API: https://developers.google.com/maps 

# Models
## Local Translation Services
Instances: 50

Attributes: 
- Name of service
- Rating
- Main language
- Area of Austin
- Pricing

Media: Map location, Link to site

Connections:
## Local Non-English Communities
Instances: 10

Attributes: 
- Name of community
- Number of members
- Main language
- Area of Austin

Media: Community image, Link to site

Connections:
## Local Non-English Friendly Job Postings
Instances: 1000

Attributes: 
- Name of company
- Job title
- Hourly pay
- Main language
- Area of Austin

Media: Company Image, Link to site

Connections:
# Three Questions We Will Answer
- Where can I find an English translator in my area?
- What communities in the area could I relate to?
- Are there any businesses that support non-english hires?

