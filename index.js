/**
 * Respond with "Username x has y repos" text
 * @param {Request} request
 */
async function handleRequest(request) {
  try {
    let username = 'harrisgeo88'

    // splits the url from the query string
    const querystring = request.url.split('?')[1]
    
    if (querystring) {
      // we split the query string into an array
      const params = querystring.split('&')
      
      // we search for username
      const userParam = params.find(y => y.includes('username'))
    
      // if username exists then use it. Otherwise use the default
      if (userParam) {
        username = userParam.split('=')[1]
      }
    }

    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers: {
        'User-Agent': 'request'
      }
    })
  
    const allRepos = await response.json()
    const length = allRepos.length
    
    let repos = ''
    if (length > 99) {
      repos = 'more than 100'
    } else if (!length) {
      repos = '0'
    } else {
      repos = `${length}`
    }

    return new Response(`Username ${username} has ${repos} repos`, {
      headers: { 'content-type': 'text/plain' },
    })
  } catch (err) {
    console.log(err)
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})