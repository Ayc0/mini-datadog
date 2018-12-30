# Website availability & performance monitoring

## Overview

- [ ] Create a console program to monitor performance and availability of websites
- [x] Websites and check intervals are user defined
- [x] Users can keep the console app running and monitor the websites

## Stats

- [x] Check the different websites with their corresponding check intervals
  - [x] Compute a few interesting metrics: availability, max/avg response times, response codes count and more...
  - [ ] Over different timeframes: 2 minutes and 10 minutes
- [x] Every 10s, display the stats for the past 10 minutes for each website
- [x] Every minute, displays the stats for the past hour for each website

## Alerting

- [ ] When a website availability is below 80% for the past 2 minutes, add a message saying that "Website {website} is down. availability={availability}, time={time}"
- [ ] When availability resumes for the past 2 minutes, add another message detailing when the alert recovered
- [ ] Make sure all messages showing when alerting thresholds are crossed remain visible on the page for historical reasons

## Tests & question

- [ ] Write a test for the alerting logic
- [ ] Explain how you'd improve on this application design
