import { file, readableStreamToJSON, serve } from 'bun'
import { ScannerEvent } from './scanner-event'
import { ScanResource } from './scan-resource'
import { createResource, deleteResource, isResourceExists } from './db'
import { renderResourcesPage, renderVulnerabilitiesPage } from './ui'
import fontsCssPath from './fonts.css'
import styleCssPath from './style.css'
import { harborVulnFetch } from './harbor'
import { sortVulnerabilities } from './utils'

const fontsCssFile = file(fontsCssPath)
const styleCssFile = file(styleCssPath)

/**
 * @param {ScanResource} resource
 */
const processResource = resource => {
  if (isResourceExists(resource)) {
    deleteResource(resource)
  }

  createResource(resource)
}

/**
 * @param {ScannerEvent} event
 */
const processEvent = event => event.resources
  .map(rawResource => {
    try {
      const resource = new ScanResource(event, rawResource)

      if (resource.severity === 'None') {
        console.log('Skipping resource with severity', resource.severity)

        return null
      }

      return resource
    } catch (err) {
      console.error('Process event resource error:', err)

      return null
    }
  })
  .filter(resource => (resource !== null))
  .forEach(resource => processResource(resource))

const processRawEvent = rawEvent => {
  try {
    const scannerEvent = new ScannerEvent(rawEvent)

    if (scannerEvent.type === 'SCANNING_COMPLETED') {
      processEvent(scannerEvent)
    } else {
      console.log('Skip event with type', scannerEvent.type)
    }
  } catch (err) {
    console.error('Process event error', err)
  }
}

/**
 * @param {Request} req
 * @param {URL} url
 */
const route = req => {
  const url = new URL(req.url)

  if (url.pathname === '/process') {
    if (req.body !== null) {
      return req.json()
        .then(processRawEvent)
        .then(() => new Response())
        .catch(() => new Response())
    } else {
      return new Response()
    }
  } else if (['/', '/index', '/index.html'].indexOf(url.pathname) > -1) {
    return renderResourcesPage().then(stream => new Response(
      stream,
      {
        headers: {
          'Content-Type': 'text/html'
        }
      }
    ))
  } else if (url.pathname === '/style.css') {
    return new Response(
      styleCssFile,
      {
        headers: {
          'Content-Type': 'text/css'
        }
      }
    )
  } else if (url.pathname === '/fonts.css') {
    return new Response(
      fontsCssFile,
      {
        headers: {
          'Content-Type': 'text/css',
          'Cache-Control': 'max-age=86400, public'
        }
      }
    )
  } else if (url.pathname === '/details') {
    const backId = url.searchParams.get('backid') ?? ''
    const project = url.searchParams.get('project') ?? ''
    const subrepo = url.searchParams.get('subrepo') ?? ''
    const tag = url.searchParams.get('tag') ?? ''

    return harborVulnFetch(project, subrepo, tag)
      .then(sortVulnerabilities)
      .then(vulnerabilities => renderVulnerabilitiesPage(backId, project, subrepo, tag, vulnerabilities))
      .then(stream => new Response(
        stream,
        { headers: { 'Content-Type': 'text/html' } }
      ))
  } else {
    return new Response(null, { status: 404 })
  }
}

process.on('SIGINT', () => process.exit())
process.on('SIGTERM', () => process.exit())
process.on('SIGABRT', () => process.exit())

serve({
  port: process.PORT || '8123',
  fetch: req => route(req)
})
