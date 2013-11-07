# BigPipe Example

An app built with [koa](https://github.com/koajs/koa) and [component](https://github.com/component/component) that implements [Facebook's BigPipe](https://www.facebook.com/notes/facebook-engineering/bigpipe-pipelining-web-pages-for-high-performance/389414033919).

Given a subreddit, this app does the following:

- An image grid based on [horizontal-grid-packing](https://github.com/jonathanong/horizontal-grid-packing) of the latest imgur posts.
- Show you the title of the subreddit and the number of subscribers.
- Show you the top 5 posts within the past day, week, month, year, and all time.

In total, that is 7 asynchronous calls with the request to imgur being the slowest.

## Installation and Setup

This example requires node v0.11.3+ for generator support.
Here's an example installation:

```bash
# Install and use node v0.11
nvm install 0.11
nvm use 0.11

# Clone this example
git clone git://github.com/jonathanong/bigpipe-example
cd bigpipe-example

# Install all dependencies and build the assets
npm install

# Start the server. Serves on port 3456 by default
npm start
```

## Strategies

This example implements 3 strategies.
The strategies are listed from slowest to fastest and worst to best.

### Sequential

All asynchronous functions are blocking and are embedded within the template.
This is the easiest way to build a webpage and is more inline with traditional languages like PHP and Python.
This is actually difficult to do in vanilla node.js,
but very easy with koa.

### Parallel

All asynchronous functions are executed before the rendering of the template.
This is similar to traditional Express apps where rendering occurs at `res.render()` (assuming the developer executes the functions in parallel).

### BigPipe

All asynchronous functions are executed after the initial layout is flushed to the client so the client will see a barebone layout immediately.
Each asynchronous function, also called a pagelet, is rendered and pushed independently to the client.
Each pagelet is generally self-contained, meaning it has its own HTML, JS, CSS.

The major downside to BigPipe is that it requires Javascript on the client and HTTP caching is pretty much impossible.
BigPipe should be used only for dynamic content (ie not static pages or pages only visitors see).

## Koa

[Koa](https://github.com/koajs/koa) is a new generator-based framework based on [co](https://github.com/visionmedia/co) and is the spiritual successor to [express](https://github.com/visionmedia/express).
By using generators for control flow, there's no more callback hell or painful error handling.
Look at the source code to see for yourself.

## Component

[Component](https://github.com/component/component) is a CommonJS-based client-side package manager and build system.
Not only does it allow you to easily consume 3rd party components, which are packages of JS, CSS, HTML, images, fonts, etc.,
it also allows you to organize your app as independent components.
No more `/scripts`, `/styles`, `/images`, and `/templates` folders where finding what you need is difficult.
View the [/client](https://github.com/jonathanong/bigpipe-example/tree/master/client) to see how apps _should_ be structured.

## Architecture

- [client/](https://github.com/jonathanong/bigpipe-example/tree/master/client) - all client-side CSS and JS that is not within a `View`.
- [lib/](https://github.com/jonathanong/bigpipe-example/tree/master/client) - utilities used by the rest of the app.
- [routes/](https://github.com/jonathanong/bigpipe-example/tree/master/routes) - all routes.
- [view/](https://github.com/jonathanong/bigpipe-example/tree/master/view) - base constructor which all `View`s inherit from.
- [views/](https://github.com/jonathanong/bigpipe-example/tree/master/views) - all the different views.

## License

The MIT License (MIT)

Copyright (c) 2013 Jonathan Ong me@jongleberry.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.