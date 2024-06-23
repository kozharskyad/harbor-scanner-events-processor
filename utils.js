import { Vulnerability } from './vulnerability'

const SEVERITY_RATINGS = {
  Low: 1,
  Medium: 2,
  High: 3,
  Critical: 4
}

const CLASS_BY_SEVERITY = {
  Critical: 'critical',
  High: 'high',
  Medium: 'medium'
}

/** @type {(severity: string) => number} */
export const getSeverityRating = (
  severity,
  severityRating = SEVERITY_RATINGS[severity]
) => (
  (typeof(severityRating) === 'number')
  ? severityRating
  : 0
)

/** @param {string} url */
export const harborEncodeURL = url => encodeURIComponent(url).replaceAll('%2F', '%252F')

/** @param {Array<Vulnerability>} vulnerabilities */
export const sortVulnerabilities = vulnerabilities =>
  vulnerabilities.sort((a, b) => (
    (getSeverityRating(a.severity) < getSeverityRating(b.severity))
    ? 1
    : -1
  ))

/**
 * @param {string} cveId
 * @returns {string}
 */
export const slugifyCveId = cveId => cveId
  .replaceAll(/[^A-Za-z0-9]/g, '')
  .toLowerCase()

/** @type {(severity: string) => string} */
export const severityToClass = (severity) => (
  CLASS_BY_SEVERITY[severity] ?? ''
)

