import { formatDate } from "../utils/utils";
import { useRouter } from 'next/router';

export default function ({ hikes, id }) {
  const router = useRouter();

  console.log(hikes)

  const setRows = hikes?.map((hike, i) => {
    return (
      <tr key={i} onClick={() => router.push(`/hikes/${hike?.id}`)}>
        <td className="name">{hike?.data?.name}</td>
        <td>Location</td>
        <td>{hike?.data?.kilometers}</td>
        <td className="date">{formatDate(hike?.data?.date?.seconds)}</td>
      </tr>
    )
  })

  return (
    <div className="listMountains" id={id}>
      <div className="container">
        <table className="mountains">
          <thead>
            <tr>
              <td className="name">Name</td>
              <td>Location</td>
              <td>Kilometer</td>
              <td className="date">Date</td>
            </tr>
          </thead>

          <tbody>
            {setRows}
          </tbody>
        </table>
      </div>
    </div>
  )
}