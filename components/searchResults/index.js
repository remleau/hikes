export default function ({ results }) {
  console.log(results);

  return (
    <div className="results">
      {results.map((result, i) => {
        return (
          <div key={i}>{result.name}</div>
        )
      })}
    </div> 
  )
}