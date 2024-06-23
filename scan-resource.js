import { ScannerEvent } from './scanner-event'

export class ScanResource {
  /** @type {number} */ id
  /** @type {string} */ url
  /** @type {string} */ tag
  /** @type {string} */ severity
  /** @type {number} */ low
  /** @type {number} */ medium
  /** @type {number} */ high
  /** @type {number} */ critical
  /** @type {string} */ end_time
  /** @type {string} */ project
  /** @type {string} */ subrepo

  /**
   * @param {ScannerEvent} scannerEvent
   * @param {Object<string, any>} rawResource
   */
  constructor(scannerEvent, rawResource) {
    const url = rawResource?.resource_url
    if (typeof(url) !== 'string' || url.length < 1) {
      throw new Error('`resource_url` field must be not blank string')
    }

    const tag = rawResource?.tag
    if (typeof(tag) !== 'string' || tag.length < 1) {
      throw new Error('`tag` field must be not blank string')
    }

    const overview = rawResource?.scan_overview?.['application/vnd.security.vulnerability.report; version=1.1']
    if (typeof(overview) !== 'object') {
      throw new Error('`scan_overview["application/vnd.security.vulnerability.report; version=1.1"] field must be object`')
    }

    const severity = overview?.severity
    if (typeof(severity) !== 'string' || severity.length < 1) {
      throw new Error('`overview.severity` field must be not blank string')
    }

    const summary = overview?.summary?.summary
    if (typeof(summary) !== 'object') {
      throw new Error('`overview.summary.summary` must be object')
    }

    const endTime = overview?.end_time
    if (typeof(endTime) !== 'string' || endTime.length < 1) {
      throw new Error('`overview.end_time` must be not blank string')
    }

    this.url = url
    this.tag = tag
    this.severity = severity
    this.end_time = endTime
    this.low = summary?.Low ?? 0
    this.medium = summary?.Medium ?? 0
    this.high = summary?.High ?? 0
    this.critical = summary?.Critical ?? 0
    this.project = scannerEvent.project
    this.subrepo = scannerEvent.subrepo
  }
}
