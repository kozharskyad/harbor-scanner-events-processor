export const Index = ({ children, subtitle }) => (
  <html lang='en'>
    <head>
      <meta charSet='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <title>{'Реестр уязвимостей' + ((typeof(subtitle) === 'string') ? (' - ' + subtitle) : '')}</title>
      <link rel="stylesheet" href="fonts.css" />
      <link rel="stylesheet" href="style.css" />
    </head>
    <body>
      <h1>Реестр уязвимостей</h1>
      <hr />
      {
        (typeof(subtitle) === 'string')
        ? <div><h2>{subtitle}</h2><hr /></div>
        : <div></div>
      }
      {children}
    </body>
  </html>
)
