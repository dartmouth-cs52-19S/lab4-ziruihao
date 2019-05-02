# Starter-Pack for Zirui Hao
I built a blog with material-ui.
Try it out:
https://blogger-cs52.surge.sh/
https://blogger-error-cs52.surge.sh/ (showcasing error-handling)

![alt text](https://github.com/dartmouth-cs52-19S/lab4-ziruihao/blob/master/img/full.png)
## Features
### Authentication
I connected my project with Firebase to leverage their authentication APIs. I used Google authentication. This feature will be developed more in Lab 5, where I can add a 'users' schema to my database so different users can post different things.

![alt text](https://github.com/dartmouth-cs52-19S/lab4-ziruihao/blob/master/img/auth.png)

### Filter by Tags
You can filter by tags either by clicking the tag nodes:

![alt text](https://github.com/dartmouth-cs52-19S/lab4-ziruihao/blob/master/img/tags.png)

Or you can use the search bar up top (make sure to type tags in the format of '#tag').

![alt text](https://github.com/dartmouth-cs52-19S/lab4-ziruihao/blob/master/img/searchbar.png)

### Redux Error-handling
I handled all errors coming from the connection to the Heroku server by making an `error-reducer.js` and creating error states. To try error handling, go to this link:

![alt text](https://github.com/dartmouth-cs52-19S/lab4-ziruihao/blob/master/img/error.png)

### Input Validation
If you try to make a blank post, my app will automatically fill 'Untitled post' as its default title, so that we can query them.

![alt text](https://github.com/dartmouth-cs52-19S/lab4-ziruihao/blob/master/img/untitled.png)

### Markdown
Support for markdown in post-writing.

![alt text](https://github.com/dartmouth-cs52-19S/lab4-ziruihao/blob/master/img/markdown.png)
