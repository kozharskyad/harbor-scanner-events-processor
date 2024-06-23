export class ScannerEvent {
  /** @type {string} */ type
  /** @type {Array<any>} */ resources
  /** @type {string} */ project
  /** @type {string} */ subrepo

  constructor(rawEvent) {
    const type = rawEvent?.type
    if (typeof(type) !== 'string' || type.length < 1) {
      throw new Error('`type` field must be not blank string')
    }

    const eventData = rawEvent?.event_data
    if (typeof(eventData) !== 'object') {
      throw new Error('`event_data` field must be object')
    }

    /** @type {Array<any>} */
    const resources = eventData?.resources
    if (!Array.isArray(resources)) {
      throw new Error('`eventData.resources` field must be array')
    }

    const repository = eventData?.repository
    if (typeof(repository) !== 'object') {
      throw new Error('`eventData.repository` field must be object')
    }

    const project = repository?.namespace
    if (typeof(project) !== 'string' || project.length < 1) {
      throw new Error('`repository.namespace` field must be not blank string')
    }

    const subrepo = repository?.name
    if (typeof(subrepo) !== 'string' || subrepo.length < 1) {
      throw new Error('`repository.name` field must be not blank string')
    }

    this.type = type
    this.resources = resources
    this.project = project
    this.subrepo = subrepo
  }
}
