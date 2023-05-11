import servest from 'servest';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const port = 3000;

const app = servest();

let colors: string[] = [];

app.post('/', async (req: servest.Request, res: servest.Response) => {
  const color = (await req.json())['color'];
  colors.push(color);
  res.redirect('/');
});

app.route('/', async (req: servest.Request, res: servest.Response) => {
  const html = ReactDOMServer.renderToString(
    <html>
      <head>
        <title>Color List</title>
      </head>
      <body style={{ backgroundColor: 'black' }}>
        <form method="post" action="/">
          <label htmlFor="color">Color:</label>
          <input type="text" name="color" id="color" />
          <button type="submit">Add Color</button>
        </form>
        <ul>
          {colors.map((color, index) => (
            <li key={index} style={{ color: color }}>
              {color}
            </li>
          ))}
        </ul>
      </body>
    </html>
  );
  res.html(html);
});

app.listen(port);
console.log(`Server running on http://localhost:${port}`);
