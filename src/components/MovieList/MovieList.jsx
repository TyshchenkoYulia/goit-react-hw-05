export default function MovieList({ value }) {
  return (
    <>
      <ul>
        {value.map(({ id, title }) => (
          <li key={id}>
            <p>{title}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
