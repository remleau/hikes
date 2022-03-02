export default function ({ id }) {
  return (
    <div className="listMountains" id={id}>
      <div className="container">
        <table className="mountains">
          <thead>
            <tr>
              <td>Name</td>
              <td>Location</td>
              <td>Kilometer</td>
              <td>Date</td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Mont Washington</td>
              <td>Vermont</td>
              <td>25km</td>
              <td>02/03/2021</td>
            </tr>
            <tr>
              <td>Mont Washington</td>
              <td>Vermont</td>
              <td>25km</td>
              <td>02/03/2021</td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}