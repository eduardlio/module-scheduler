# module-scheduler

This week's puzzle is one that I made up out of my own procrastination while working through the Azure Developer Cert learning modules. Given limit and n number of entries, calculate how many days it will take to complete all the modules. Each module must be complete the day it was started i.e. they cannot be split over multiple days.
 
Your input takes the following structure:

- limit: the maximum amount of time in minutes you will spend on the learning modules
- n: the number of entries
- times: list of entries

Each entry is a string representing an amount of time a given learning module will take in the format: "H hr M min" or "H hr" or "M min".

## Example 

**Input:**

```
120
8
"30 min"
"1 hr 5 min"
"45 min"
"51 min"
"35 min"
"1 hr 2 min"
"43 min"
"29 min"
```

Result: 4

**Explanation:**

- limit: 120
- n: 8

The following would be invalid:
	
- Day 1: 30 min, 1hr 5 min, 25 min
- Day 2: 20 min, 51 min, 35 min, 14 min
- Day 3: 48 min, 43 min, 29 min

Note the splits of the 45 min and 1 hr 2 min modules between days 1-2 and 2-3 respectively. 

The following would be a valid split. 

- Day 1: 30 min, 1 hr 5 min
- Day 2: 45 min, 51 min
- Day 3: 35 min, 1 hr 2 min
- Day 4: 43 min, 29 min

## Assumptions: 

- `for t in times: 0 <= t (in minutes) <= limit`
- `0 <= n <= 10 * (10 ^ 5)`
