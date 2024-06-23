import { Vulnerability } from '../vulnerability'
import { VulnerabilityTableRow } from './vulnerability-table-row'

/** @param {{backId: string, vulnerabilities: Array<Vulnerability>}} param */
export const VulnerabilitiesTable = ({ backId, vulnerabilities }) => (
  <div>
    <div><a href={`/#${backId}`}>&larr; Назад</a></div>
    <hr />
    <table>
      <tbody>
        <tr>
          <td className='details'><label>Всего</label></td>
          <td className='details'><label>{vulnerabilities.length}</label></td>
        </tr>
        <tr>
          <td className='details'><label>Critical</label></td>
          <td className='details'>
            {vulnerabilities.filter(({ severity }) => (severity === 'Critical')).length}
          </td>
        </tr>
        <tr>
          <td className='details'><label>High</label></td>
          <td className='details'>
            {vulnerabilities.filter(({ severity }) => (severity === 'High')).length}
          </td>
        </tr>
        <tr>
          <td className='details'><label>Medium</label></td>
          <td className='details'>
            {vulnerabilities.filter(({ severity }) => (severity === 'Medium')).length}
          </td>
        </tr>
        <tr>
          <td className='details'><label>Low</label></td>
          <td className='details'>
            {vulnerabilities.filter(({ severity }) => (severity === 'Low')).length}
          </td>
        </tr>
      </tbody>
    </table>
    <hr />
    <table>
      <tbody>
        {vulnerabilities.map(vulnerability => (
          <VulnerabilityTableRow key={vulnerability.id} vulnerability={vulnerability} />
        ))}
      </tbody>
    </table>
  </div>
)
