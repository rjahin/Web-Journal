# WEB-JOURNAL 


Team: Jahin, Jhon, Mahnoor, Mariana, Halimah

- Front End:
Changed the overall design according to our app
Changed the design of the landing page. We chose a sky theme so that the user can have a calm landing page that will be soothing (attempting to psychologically influence their emotions to calm the user)
Changed the design of the other pages (about us, contact us, log-in, register, blog) these pages are designed to have a minimal look since we don’t want to overwhelm our users rather we want to soothe their minds
We also changed the sections our pages are on for example, now the log-in and create account are at the bottom so it can be easier for users rather than having everything on the header like we had before

- Back End: Data Storage (Mostly Worked on this part)
We used MongoDB to successfully and securely store the user’s login information and profile information. 
Using MongoDB our team maintained a secure and privatized outlet for the user information to be saved within our platform. Additionally, this allowed for all databases to be on one application in different collections. This makes everything cohesive in terms of backend and it’s easier to get everything connected.
Our team built a database to store the interactive user input from the goal-setting and emotion-logging features on out website. 
The data storage also was able to save the data from the emotions progress tracker. 


- Back End: API Development (Mostly Worked on this part)
Our group explored multiple API options to connect the data storing, user input and other various moving aspects throughout the website. 
We explored the option for using a Google Cloud Datastore API + Datastore and worked on setting everything up so emotions on the graph could be plotted and stored. This method was troubleshooted and researched fully for three days pretty much nonstop, however could not be implemented because of various issues. For this reason we decided to shift to MongoDB as it was already successful for other sections.
 
We also explored the GitHub API method, which would process requests, create an issue within a specific repository and store data as an issue content. This method was developed but presented issues with accessing where the data would be stored. 
However,  we ultimately decided to use the custom built MongoDB API method because it kept all of our data and linking methods in a central location which made it easier for our group to work with. 
