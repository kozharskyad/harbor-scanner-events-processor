import { ScanResource } from '../scan-resource'
import { severityToClass } from '../utils'

/**
* @param {{resource: ScanResource}} param
*/
export const ResourcesTableRow = ({ resource }) => (
 <tr id={`row${resource.id}`}>
   <td>
     <table>
       <tbody>
         <tr>
           <td className='details'><label>ID</label></td>
           <td className='details'>
             <a href={`#row${resource.id}`} title='Ссылка на прокрутку к текущей записи'>
               {resource.id}
             </a>
           </td>
         </tr>
         <tr>
           <td className='details'><label>Репозиторий</label></td>
           <td className='details'>{resource.subrepo}</td>
         </tr>
         <tr>
           <td className='details'><label>Тег</label></td>
           <td className='details'>
             <a
               href={`details?backid=row${resource.id}&project=${encodeURIComponent(resource.project)}&subrepo=${encodeURIComponent(resource.subrepo)}&tag=${encodeURIComponent(resource.tag)}`}
               title='Ссылка на страницу деталей'
             >
               {resource.tag}
             </a>
           </td>
         </tr>
         <tr>
           <td className='details'><label>Дата отчета (UTC)</label></td>
           <td className='details'>{resource.end_time}</td>
         </tr>
         <tr>
           <td className='details'><label>Рейтинг</label></td>
           <td className='details'>
             <span className={severityToClass(resource.severity)}>
               {resource.severity}
             </span>
           </td>
         </tr>
       </tbody>
     </table>
   </td>
   <td style={{textAlign: 'center'}}>{resource.low}</td>
   <td style={{textAlign: 'center'}}>{resource.medium}</td>
   <td style={{textAlign: 'center'}}>{resource.high}</td>
   <td style={{textAlign: 'center'}}>{resource.critical}</td>
 </tr>
)
