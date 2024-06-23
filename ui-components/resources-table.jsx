import { allResources } from '../db'
import { ResourcesTableRow } from './resources-table-row'

export const ResourcesTable = () => (
  <table>
    <thead>
      <tr>
        <th>Общая информация</th>
        <th>Low</th>
        <th>Medium</th>
        <th>High</th>
        <th>Critical</th>
      </tr>
    </thead>
    <tbody>
      {allResources().map(resource => (
        <ResourcesTableRow key={resource.id} resource={resource} />
      ))}
    </tbody>
  </table>
)
