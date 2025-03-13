# Group 23

# Website Link
https://speakatx.me/

# Git SHA
9283e29f058cdd129a7c420b567926d502f6b96a

# API Documentation
https://documenter.getpostman.com/view/42364456/2sAYXFiHS8

# Team Members
- Maya Lee - @MayaLee393
- Steven Zheng - @steven.zheng1
- Amy Wu - @amypwu
- Edwin Torres - @EdwinIsSad
- Shawn Tran - @stran7365

Phase 1:
Estimated work times:
- Maya Lee: 15 hours
- Steven Zheng: 10 hours
- Amy Wu: 10 hours
- Edwin Torres: 16 hours
- Shawn Tran: 15 hours

Actual work times:
- Maya Lee: 15 hours
- Steven Zheng: 15 hours
- Amy Wu: 15 hours
- Edwin Torres: 15 hours
- Shawn Tran: 15 hours

Phase 2:
Estimated work times:
- Maya Lee: 30 hours
- Steven Zheng: 20 hours
- Amy Wu: 30 hours
- Edwin Torres: 25 hours
- Shawn Tran: 25 hours

Actual work times:
- Maya Lee: 18 hours
- Steven Zheng: 18 hours
- Amy Wu: 18 hours
- Edwin Torres: 18 hours
- Shawn Tran: 18 hours

Phase leader responsibilities:
- Ensure everyone shows up to meetings
- Track project progress
- Mediate possible conflicts

Phase leader:

- Phase 1: Maya Lee
- Phase 2: Amy Wu
- Phase 3:
- Phase 4:

# Project

**SpeakATX** is a website that aims to provide resources to minimal english and non-english speakers in Austin, TX. It will have information on local non-english communities, translation services, and job postings.

# Data Sources

- Yelp API: https://www.yelp.com/search?cflt=translationservices&find_loc=Austin%2C+TX
- Glassdoor API: https://www.glassdoor.com/developer/jobsApiActions.htm
- Google Maps API: https://developers.google.com/maps 

# Models
## Local Services
Instances: 50

Attributes: 
- Name of service
- Rating
- Main language
- Area of Austin
- Pricing

Media: 
- Map location
- Link to site

Connections:
- Local Non-English Communities: communities that frequent the specific service location
- Local Non-English Friendly Job Postings: jobs that accommodate the language needs for communities that frequent the specific service location

## Local Non-English Communities
Instances: 10

Attributes: 
- Name of community
- Number of members
- Main language
- Area of Austin
- Type of community

Media: 
- Community image
- Link to site

Connections:
- Local Services: Services for this community
- Local Non-English Friendly Job Postings: jobs that accommodate the language needs for this community

## Local Non-English Friendly Job Postings
Instances: 1000

Attributes: 
- Name of company
- Job title
- Hourly pay
- Main language
- Area of Austin

Media: 
- Company Image
- Link to site

Connections:
- Local Non-English Communities: Community for the language this job is in
- Local Services: Services for people that speak the language this job is in

# Three Questions We Will Answer
- Where can I find a Spanish to English translator in my area?
- What communities in the area could I relate to?
- Are there any businesses that support non-english hires?

