import { harborEncodeURL } from "./utils"

const HARBOR_URL = process.env.HARBOR_URL ?? ''
const HARBOR_LOGIN = process.env.HARBOR_LOGIN ?? ''
const HARBOR_PASSW = process.env.HARBOR_PASSW ?? ''

const HARBOR_AUTH = btoa(`${HARBOR_LOGIN}:${HARBOR_PASSW}`)

const harborFetch = url =>
  fetch(
    `${HARBOR_URL}/${url}`,
    {
      headers: { Authorization: 'Basic ' + HARBOR_AUTH },
      tls: { rejectUnauthorized: false }
    }
  )
    .then(res => res.json())

export const harborVulnFetch = (project, subrepo, tag) =>
  harborFetch(`api/v2.0/projects/${harborEncodeURL(project)}/repositories/${harborEncodeURL(subrepo)}/artifacts/${harborEncodeURL(tag)}/additions/vulnerabilities`)
    .then(({
      ['application/vnd.security.vulnerability.report; version=1.1']: {
        vulnerabilities = []
      } = {}
    }) => vulnerabilities)
