import { renderToReadableStream } from 'react-dom/server.browser'
import { Vulnerability } from './vulnerability'
import { Index } from './ui-components/index-page'
import { ResourcesTable } from './ui-components/resources-table'
import { VulnerabilitiesTable } from './ui-components/vulnerabilities-table'

export const renderResourcesPage = () => renderToReadableStream(
  <Index subtitle='Общий список'>
    <ResourcesTable />
  </Index>
)

/**
 * @param {string} backId
 * @param {string} project
 * @param {string} subrepo
 * @param {string} tag
 * @param {Array<Vulnerability>} vulnerabilities
 */
export const renderVulnerabilitiesPage = (backId, project, subrepo, tag, vulnerabilities) =>
  renderToReadableStream(
    <Index subtitle={`Уязвимости ${project}/${subrepo}:${tag}`}>
      <VulnerabilitiesTable backId={backId} vulnerabilities={vulnerabilities} />
    </Index>
  )
