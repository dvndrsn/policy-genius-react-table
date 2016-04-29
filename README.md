# Life Insurance Pricing Table
# Overview

Build an application with React that displays a table of life insurance policies.

For example, a row in the pricing table might look something like this:

| Carrier Name | Monthly Premium | Health Category | Name |
| ------------- |-------------| -----| -----|
| American General Life Insurance Company | $56.40 | Preferred Plus Non-Tobacco | Select-a-Term - 30 Year (Nov 2015) |

You'll be fetching your data from [this API](http://actuary-development.policygenius.com/policies?date_of_birth=1980-01-21&gender=male&health_profile[currently_uses_tobacco]=false&health_profile[height_feet]=5&health_profile[height_inches]=8&health_profile[history_of_tobacco_use]=false&health_profile[weight]=180&policy_profile[coverage_amount]=700000&policy_profile[term_in_years]=30&state_code=TX)

The API returns 2 different kinds of policies, `underwritten_policies` and `instant_issue_policies`. Ignore the latter for this exercise and only display the `underwritten_policies`.

## Implementation
I used the following technologies for this task.

- Python + Flask (proxy for policies endpoint)
- JavaScript ES6 + Babel (front end)
- React + Redux (view & state management)
- jQuery (async request)

Start the server locally:

```
python server.py
```

Send a sample request to the proxy server

```
curl 'http://localhost:3000/api/policies'
```

Access the site locally:

```
http://localhost:3000/
```

## What we are / are not looking for
- Consider this the first feature that you're adding to an application that will be under continuous development after this. Meaning that we understand that this is a toy example, but we want to see how you balance doing just enough to get the job done with also architecting the system enough to allow for extensibility in the future. There's no right answer since you don't know the future priorities for this application, but be ready to talk about the tradeoffs and what the balance is that you've struck.
- There are cross-origin data fetching implications here. There are several different strategies for solving this issue. We're interested in seeing which solution you choose and why.
- How are you going to manage the data-fetching and state management of the application? We recommend that you use Redux for state managment (because we think it's the best tool for the job), but feel free to use vanilla Flux, Alt,js or whatever you are more comfortable with and feel best suits the problem.
- Testing is a bonus. We don't want you spending too much time on this, but if you're particularly jazzed or it helps you in your development workflow, seeing how you would test this application is also interesting
- We're not looking for pixel perfection, responsive CSS or really anything that even looks good. If it's legible enough that we can discern the table rows and columns, that's good enough.
- We're not looking for any exact satisfaction of requirements. If you miss one of the columns from the example above, it's not a big deal. We're more concerned about how you solve the technical problems.
- We're not looking for you to solve this problem in total isolation. You can use this as an opportunity to see what it's like to collaborate with us when we're not pairing. Shoot me an email or multiple emails or arrange a screen sharing if you have any questions or get stuck on a piece of the tech stack.

As stated above, we'd like you to solve this problem using React. All else is up to you. If you don't want to use Redux and you want to serve it from a Java backend, that's fine. However if you don't want to go to the trouble of all that setup, [here](https://github.com/anorudes/redux-easy-boilerplate) is a nice boilerplate that should have everything you need to get started (React, Redux, Express, testing libraries, etc.);

### Bonus points if you found this too easy
- Allow the user to sort the pricing table (by monthly premium for example). 
- Allow the user to change the coverage amount to see quotes at different ranges
  - You can achieve this in the API by change the `policy_profile[coverage_amount]=700000` part of the query string. Valid values are between 100000 (100k) and 10000000 (10M)
  - Feel free to use a slider, text input, select box, whatever
