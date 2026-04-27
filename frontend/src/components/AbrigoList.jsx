import AbrigoCard from './AbrigoCard';

function AbrigosList({ abrigos }) {
  return (
    <section>
      <h2>Abrigos disponíveis</h2>

      {abrigos.length === 0 && <p>Nenhum abrigo cadastrado.</p>}

      <div className="cards-container">
        {abrigos.map((abrigo) => (
          <AbrigoCard key={abrigo.id} abrigo={abrigo} />
        ))}
      </div>
    </section>
  );
}

export default AbrigosList;
